import React, { useState, useRef } from 'react'

import style from './style.module.css'
import { ChakraProvider, Button, Text, Input } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

import {
  FormControl,
  FormLabel
} from '@chakra-ui/react'

import ColorBox from '../ColorBox/ColorBox';
import { useSelector } from 'react-redux'


export default function AddBoardModal(props) {

  const author = useSelector((session) => session.auth.userId)
  const [title, setTitle] = useState('');
  const [maxTitle, setMaxTitle] = useState(false);
  const [colorFon, setColorFon] = useState(null)
  const [colorImage, setColorImage] = useState(null)
  const [fon, setFon] = useState({})
  const initialRef = useRef(null)

  const sendForm = async () => {
    //! Доделать
    if (title.length < 3) {
      console.log('МИН 3 Символа');
      return
    }
    try {
      const response = await fetch('/api/board', {
        method: 'POST',
        // credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, fon })
      });

      const answerModal = await response.json();
      if (answerModal) {
        boardAdd();
        setTitle('')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const boardAdd = () => {
    props.onClose()
    props.addboard()
  }
  const changeFonColor = (e) => {
    setColorFon(e.target.value)
    if (e.target.value === '#ffffff') { colorHandler({ none: true }); return }
    colorHandler({ color: e.target.value })
  }

  const changeFonImage = (e) => {
    setColorImage(e.target.value)
    colorHandler({ image: e.target.value })
  }

  // Формируем обьект Fon для отправки на сервер
  const colorHandler = (data) => {
    if (data) {
      setFon((obj) => obj = data)
      return
    }
  }
  // Проверка длины названия
  function addTitle(e) {
    if (e.target.value.length <= 50) {
      setTitle(e.target.value)
      setMaxTitle(false)
    } else {
      setMaxTitle(true)
    }
    return
  }

  return (
    <ChakraProvider >
      <Modal
        size={'xl'}
        isOpen={props.isOpen} onClose={props.onClose} isCentered
        initialFocusRef={initialRef}
        motionPreset='slideInBottom'
        className={style.custom_modal}>
        <ModalOverlay />
        <ModalContent maxW="60%">
          <ModalHeader

            style={Boolean(fon.color)
              ? { backgroundColor: `${colorFon}` }
              : (Boolean(fon.image))
                ? { backgroundImage: `url(${colorImage})` }
                : { backgroundImsge: `` }}
          >
            <Text fontSize='3xl'>Новая Доска</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <FormControl>
              <FormLabel><Text fontSize='2xl'>Название</Text>
                <br></br>
                <Input
                  type='text'
                  color='grey.500'
                  fontFamily={'Roboto'}
                  fontSize={'1.5rem'} fontWeight={'500'}
                  size='md'
                  ref={initialRef}
                  value={title}
                  onChange={(e) => addTitle(e)}
                /></FormLabel>
              {maxTitle && <Text className={style.max_title_text}>Максимум 30 символов</Text>}
            </FormControl>
            <br></br>
            <FormLabel><Text fontSize='2xl'>Фон</Text></FormLabel>
            <ColorBox changeFonColor={changeFonColor} changeFonImage={changeFonImage}></ColorBox>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={props.onClose}>
              Закрыть
            </Button>
            <Button colorScheme='teal' onClick={sendForm}>Отправить</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider >



  )
}
