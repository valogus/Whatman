import React, { useState } from 'react'
import { useEffect } from 'react'

import style from './style.module.css'
import Boards from '../Boards/Boards'
import AddBoardModal from '../AddBoardModal/AddBoardModal'
import { useSelector } from 'react-redux'
import { useDisclosure, useToast } from '@chakra-ui/react'
import { ChakraProvider, Button, Box, Text, Divider } from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons'


export default function Home() {

  const [boards, setBoards] = useState([])
  const [partnerBoards, setPartnerBoards] = useState([])
  const userId = useSelector((session) => session.auth.userId)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Получение досок юзера с базы
  const getAllBoards = async () => {
    try {
      const response = await fetch(`/api/board/${userId}`);
      const boardsData = await response.json();
      const [boards, partnerBoards] = boardsData
      setBoards(boards);
      setPartnerBoards(partnerBoards);
    } catch (error) {
      console.log(error, '=============');
    }
  }

  useEffect(() => {
    getAllBoards()
  }, []);

  // Проверка количества досок
  function canAddBoards() {
    if (boards?.length <= 4) {
      onOpen()
      return
    }
    console.log("Превышено макс досок");
    addToast(`На вашем тарифном плане Максимум 5`)
  }

  // всплывающий toast
  const toast = useToast()
  const toastIdRef = React.useRef()

  function addToast(toastText) {
    toastIdRef.current = toast({
      description: 'some text',
      position: 'top',
      duration: 1200,
      render: () => (
        <Box color='white' p={'50px'} bg={'#ED8936'} mt="150px" fontSize={'40px'} textAlign='center'>
          {toastText}
        </Box>
      ),
    })
  }

  return (
    <>
      <ChakraProvider>
        <Box>
          <Text className={style.text_center}> Ваши Проекты</Text>
          <Divider orientation='horizontal' border={'2px solid #6A787E'} w='60%' m='10px auto' />
          {boards.length > 0 ?
            (<>
              <div className={style.main_wrap}>
                {boards.map((board) =>
                  (<Boards board={board} key={board.id} getAllBoards={getAllBoards}></Boards>))
                }
              </div></>
            )
            : (<h2 className={style.text_center}>У вас нет Проектов</h2>)
          }
        </Box>

        <div className={style.add_board}>

          <Button rightIcon={<AddIcon />}
            variant='outline'
            colorScheme='teal'
            fontSize='20px'
            onClick={canAddBoards}
          >
            Добавить проект
          </Button>
        </div>

        <Text className={style.text_center}>Проекты в которых вы учавствуете</Text>
        <Divider orientation='horizontal' border={'2px solid #6A787E'} w='60%' m='10px auto' />
        <Box>
          {partnerBoards.length > 0 ?
            (<>
              <div className={style.main_wrap}>
                {partnerBoards.map((board) =>
                  (<Boards board={board} key={board.id} ></Boards>))
                }
              </div></>
            )
            : (<Text className={style.text_center}>У вас нет Совместных проектов</Text>)
          }
        </Box>

        <AddBoardModal isOpen={isOpen} onClose={onClose} addboard={getAllBoards} />
      </ChakraProvider>

    </>
  )
}
