import React, { useState } from 'react'
import { useEffect } from 'react'

import style from './style.module.css'
import Boards from '../Boards/Boards'
import AddBoardModal from '../AddBoardModal/AddBoardModal'
import { useSelector } from 'react-redux'

import { useDisclosure } from '@chakra-ui/react'
import { ChakraProvider, Button, Box, Text } from '@chakra-ui/react';

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
  }
  return (
    <div style={{height: '100vh'}}>
      <Box>
        <Text className={style.text_center}> Ваши Проекты</Text>

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
        <ChakraProvider>
          <Button rightIcon={<AddIcon />}
            variant='outline'
            colorScheme='teal'
            fontSize='20px'
            onClick={canAddBoards}
          >
            Добавить проект
          </Button>
        </ChakraProvider>
      </div>

      <h2 className={style.text_center}>Проекты в которых вы учавствуете</h2>

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

    </div>
  )
}
