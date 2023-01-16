import React, { useEffect, useState } from 'react';
import styles from './Board.module.css';
import { Button, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react'
import MyModal from '../Modal/MyModal'
import TaskForm from '../TaskFrom/TaskFrom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useParams } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'



export default function Board() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idColumn, setIdColumn] = useState(0);

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [boards, setBoards] = useState([]);
  const { id } = useParams();

  const [flag, setFlag] = useState(false)

  const [modalItem, setModalItem] = useState(null);
  const [task, setTask] = useState('')

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [animation] = useAutoAnimate()


  useEffect(() => {
    const abortController = new AbortController()
    fetch(`/api/columns/${id}`, { signal: abortController.signal })
      .then(res => res.json())
      .then(data => {
        setBoards(data)
      })
      .catch(console.log)

    return () => {
      abortController.abort()
    }
  }, [flag]);

  function dragOverHandler(e) {
    e.preventDefault()
    if (e.target.className === styles.item) {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  // function dropHandler(e, board, item) {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   console.log(board)
  //   console.log(currentBoard)
  //   console.log(item)
  //   const currentIndex = currentBoard.Tasks.indexOf(currentItem)
  //   currentBoard.Tasks.splice(currentIndex, 1)
  //   const dropIndex = board.Tasks.indexOf(item)
  //   board.Tasks.splice(dropIndex + 1, 0, currentItem)
  //   setBoards(boards.map(b => {
  //     if (b.id === board.id) {
  //       return board
  //     }
  //     if (b.id === currentBoard.id) {
  //       return currentBoard
  //     }
  //     return b
  //   }))
  //   e.target.style.boxShadow = 'none'
  //   console.log('AAAAAAAAAAAAA')
  // }

  function dropCardHandler(e, board) {
    board.Tasks.push(currentItem)
    currentItem['column_id'] = board.id
    fetch(`/api/tasks/${currentItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ boardId: board.id })
    })
      .then(res => {
        return res.json()
      })
    const currentIndex = currentBoard.Tasks.indexOf(currentItem)
    currentBoard.Tasks.splice(currentIndex, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    e.target.style.boxShadow = 'none'
  }

  function addTaskToColumn(columnId) {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title: task, column_id: columnId, project_id: id })
    })
      .then(res => res.json())
      .then(task => {
        setTask('')
        setFlag(x => !x)
        onClose();
      })
  }

  return (
    <div ref={animation} className={styles.app}>
      {boards.map(board =>
        <div className={styles.board} onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)} key={board.id}>
          <div className={styles.board__title}>{board.title}</div>
          {board.Tasks?.map(item => item['column_id'] === board.id &&
            <Button key={item.id}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              // onDrop={(e) => dropHandler(e, board, item)}
              draggable={true}
              className={styles.item}
              onClick={() => setModalItem(item)}
            >
              {item.title}
            </Button>
          )}
          {
            modalItem && <MyModal visible={modalItem !== null} setVisible={setModalItem}>
              <TaskForm
                modalItem={modalItem} />
            </MyModal>
          }
          <Button colorScheme='teal' variant='outline' onClick={() => { onOpen(); setIdColumn(board.id) }}>
            +
          </Button>
        </div>

      )}
      <Modal initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent top={'25vh'}>
          <ModalHeader>Добавить задачу</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Задача</FormLabel>
              <Input value={task} onChange={event => setTask(event.target.value)} ref={initialRef} placeholder='Название...' />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => addTaskToColumn(idColumn)}>
              Сохранить
            </Button>
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
