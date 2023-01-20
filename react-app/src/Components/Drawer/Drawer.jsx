import React from 'react'
import styles from './style.module.css';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDisclosure } from '@chakra-ui/react'

import { Input, Button, ChakraProvider, Text, Divider, IconButton } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons'
import ColorBox from '../ColorBox/ColorBox';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'


function DrawerMy({ fon }) {
  console.log("▶ ⇛ fon", fon);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  const boardId = localStorage.getItem('boardId');
  const boardTitle = localStorage.getItem('boardTitle');

  return (
    <ChakraProvider>
      <div
        className={styles.rigt_menu_wrap}
        ref={btnRef} onClick={onOpen}
      >

        <InfoOutlineIcon
          className={styles.rigt_menu_icon}
        >
        </InfoOutlineIcon>
      </div>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader>
            <Text textAlign={'center'}>Проект</Text>
            <Text textAlign={'center'}>{boardTitle}</Text>
            <Divider orientation='horizontal' border='4px' borderColor='#A0AEC0' />
          </DrawerHeader>
          <hr></hr>
          <DrawerBody>
            {/* <Input placeholder='Type here...' /> */}
            <Text textAlign={'center'}>Цвет фона</Text>
            <Divider orientation='horizontal' border='4px' borderColor='#A0AEC0' />
            <ColorBox />
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='green' mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  )
}

export default DrawerMy;