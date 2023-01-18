import React, {useState} from 'react'
import {Button, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

function AddColumn({setBoards, boards}) {
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [column, setColumn] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure();

    function addColumn() {
        const project_id = boards[0].project_id
        const order = boards.length
        fetch('/api/columns/', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ title: column, project_id, order, boards })
         })
          .then(res => res.json())
           .then(column => {
             setColumn('')
             setBoards(prev=>[...prev, column])
            onClose();
           })
      }
    return (
        <div>
        <Button colorScheme='teal' variant='outline' onClick={() => { onOpen(); }}>
        +
      </Button>
      <Modal initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
   
      <ModalOverlay />
      <ModalContent top={'25vh'}>
        <ModalHeader>Добавить колонку</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Название колонки</FormLabel>
            <Input value={column} onChange={event => setColumn(event.target.value)} ref={initialRef} placeholder='Название...' />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => addColumn()}>
            Сохранить
          </Button>
          <Button onClick={onClose}>Отмена</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </div>
    );
  }
  
  export default AddColumn;
  