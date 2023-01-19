import React from 'react'
import styles from './style.module.css';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDisclosure } from '@chakra-ui/react'

import { Input, Button, ChakraProvider, Text, Link, IconButton } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'


function DrawerMy() {
  console.log("Render Drawer");

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()


  const boardId = localStorage.getItem('boardId');
  const boardTitle = localStorage.getItem('boardTitle');

  return (
    <>
      <div className={styles.rigt_menu_wrap}>

        <InfoOutlineIcon
          ref={btnRef} onClick={onOpen}
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
          <DrawerHeader><Text textAlign={'center'}>{boardTitle}</Text></DrawerHeader>
          <hr></hr>
          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='green' mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerMy;