import React from 'react'
import { useState } from 'react'
import { ChakraProvider, Button, Text } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons'


export default function DelBoardModal({ isOpen, onClose, delItem, getAllBoards }) {
  const [isDelMessage, setIsDelMessage] = useState(false)
  const [fetchWork, isFetchWork] = useState(false)


  async function delItemFun() {
    isFetchWork(true)
    try {
      const response = await fetch('/api/board', {
        method: 'DELETE',
        // credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ delItem })
      });

      const result = await response.json()
      if (response.status === 200) {
        setIsDelMessage(result.msg)
        const timeOut = setTimeout(() => {
          onClose()
          clearTimeout(timeOut)
          getAllBoards()
        }, 1300)
      }
      if (response.status === 300) {
        setIsDelMessage(result.msg)
        const timeOut = setTimeout(() => {
          onClose()
          clearTimeout(timeOut)
          getAllBoards()
        }, 1300)
      }
    } catch (error) {
      console.log(error, '=============');
    }
  }


  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Удаление проекта</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!isDelMessage &&
              <Text>Вы действительно хотите удалить проект ?</Text>
            }
            {isDelMessage && <>
              <Text fontSize='2xl' textAlign={'center'} fontWeight='500'>{isDelMessage}</Text>
            </>
            }
          </ModalBody>

          <ModalFooter>

            {!fetchWork &&
              <Button colorScheme='teal' mr={3} onClick={onClose} >
                Отмена
              </Button>
            }

            <Button
              isLoading={fetchWork}
              bg='#F56565' variant='solid' color='white' _hover={{ bg: '#9B2C2C' }}
              onClick={() => { delItemFun() }}
            >Да удалить</Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider >
  )
}
