import React, { useEffect, useState } from 'react';
import styles from './Board.module.css';
import pen from './pen.png'
import { Button } from '@chakra-ui/react'
import Modal from '../Modal/Modal'
import TaskForm from '../TaskFrom/TaskFrom'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useParams } from 'react-router-dom';



export default function Board() {
  const [boards, setBoards] = useState([]);
  const { id } = useParams();

  const [modalItem, setModalItem] = useState(null);

  const [comments, setComments] = useState([
    { id: 1, login: 'Андей', comment: 'Привет' },
    { id: 2, login: 'Василий', comment: 'Привет!' },
    { id: 3, login: 'Петрович', comment: 'Не мешайте' },
    { id: 4, login: 'Иваныч', comment: 'Где бутылка, Петрович? ' },
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [animation] = useAutoAnimate()

  useEffect(() => {
    console.log('render')
    const abortController = new AbortController()
    fetch(`/api/columns/${id}`, { signal: abortController.signal })
      .then(res => res.json())
      .then(data => setBoards(data))
      .catch(console.log)

    return () => {
      abortController.abort()
    }
  }, []);

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
    console.log('Зашли')
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
    console.log(board)
  }

  function onCreateComment(comment) {
    const newComment = {
      id: comments.length + 1,
      login: 'Петруля',
      comment,
    }
    setComments([newComment, ...comments]);
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
              <div>
                <img src={pen} className={styles.pen} alt={'pen'} />
              </div>
            </Button>
          )}
          {
            modalItem && <Modal visible={modalItem !== null} setVisible={setModalItem}>
              <TaskForm comments={comments} onCreateComment={onCreateComment}
                modalItem={modalItem} />
            </Modal>
          }
          <div className={styles.add}>Добавить задачу</div>
        </div>
      )}
    </div>
  )
}
