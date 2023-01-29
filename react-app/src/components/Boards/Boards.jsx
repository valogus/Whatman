import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link as ReachLink } from 'react-router-dom';
import { Flex, Center, ChakraProvider, Text, Link, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import DelBoardModal from '../DelBoardModal/DelBoardModal'
import { useDisclosure } from '@chakra-ui/react'

import style from './style.module.css'

export default function Boards({ board, getAllBoards }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [delItem, setDelItem] = useState()
  const fon = JSON.parse(board.fon)
  const userId = useSelector((session) => session.auth.userId)

  function addBoardToStorage(id, title) {
    localStorage.setItem("boardId", id)
    localStorage.setItem("boardTitle", title)
  }

  return (
    <>
      <ChakraProvider>
        <Flex
          className={style.boards_wrap}
        >
          {/* <Spacer /> */}
          <Center
            onClick={() => addBoardToStorage(board.id, board.title)}
            data-item={`${board.id}`}
            className={style.board_block}
            bgColor={fon?.color}
            bgImage={fon?.image}
            onMouseEnter={(e) => {
              setDelItem(e.target.closest('[data-item]').dataset.item)
            }}
          >
            <Link as={ReachLink} to={`/board/${board.id}`}
              w={'100%'}
              h={'100%'}
              textDecoration={'none'}
            >
              <Text fontSize='2xl' textAlign={'center'}>{board.title}</Text>
            </Link>
            {Number(board.author) === Number(userId) &&
              <IconButton
                className={style.trash_button}
                position='absolute'
                display={'none'}
                variant='outline'
                cursor={'pointer'}
                onClick={() => { onOpen() }}
                icon={
                  <DeleteIcon
                    className={style.trash_icon}
                    color="red.500"
                  />} />
            }
          </Center>

        </Flex>
        <DelBoardModal isOpen={isOpen} onClose={onClose} delItem={delItem} getAllBoards={getAllBoards} />
      </ChakraProvider>
    </>

  )
}
