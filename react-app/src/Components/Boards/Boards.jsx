import React from 'react'
import { useSelector } from 'react-redux'
import { Link as ReachLink } from 'react-router-dom';
import { Flex, Center, ChakraProvider, Text, Link } from '@chakra-ui/react';
import style from './style.module.css'

export default function Boards({ board }) {
  const fon = JSON.parse(board.fon)

  return (
    <>
      <ChakraProvider>
        <Flex
          className={style.boards_wrap}
        >
          {/* <Spacer /> */}
          <Center
            className={style.board_block}
            bgColor={fon?.color}
            bgImage={fon?.image}
          >
            <Link as={ReachLink} to={`/board/${board.id}`}
              w={'100%'}
              h={'100%'}
              textDecoration={'none'}
            >
              <Text fontSize='2xl' textAlign={'center'}>{board.title}</Text>
            </Link>
          </Center>
          {/* <Spacer /> */}

        </Flex>
      </ChakraProvider>
    </>

  )
}
