import React, { useState } from 'react';
import styles from './Board.module.css';
import pen from './pen.png'
import { Button } from '@chakra-ui/react'
import Modal from '../Modal/Modal'
import TaskForm from '../TaskFrom/TaskFrom'
import { useAutoAnimate } from '@formkit/auto-animate/react'



export default function Board() {
  const [boards, setBoards] = useState([
    { id: 1, title: 'К выполнению', items: [{ id: 1, title: 'сварить кофе' }, { id: 2, title: 'Вымыть окна' }, { id: 3, title: 'Пропылесосить' }], project_id: 1 },
    { id: 2, title: 'В работе', items: [{ id: 4, title: 'Доделать модальное окно' }, { id: 5, title: 'Доделать регистрацию' }, { id: 6, title: 'Почистить экран' }], project_id: 1 },
    { id: 3, title: 'Завершено', items: [{ id: 7, title: 'Погулять с сыном' }, { id: 8, title: 'Приготовить ужин' }, { id: 9, title: 'Сходить за пивом' }], project_id: 1 },
  ])

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

  function dropHandler(e, board, item) {
    e.preventDefault()
    e.stopPropagation()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }

  function onCreateComment(comment) {
    const newComment = {
      id: comments.length + 1,
      login: 'Петруля',
      comment,
    }
    setComments([newComment, ...comments]);
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
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

  return (
    <div ref={animation} className={styles.app}>
      {boards.map(board =>
        <div className={styles.board} onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)} key={board.id}>
          <div className={styles.board__title}>{board.title}</div>
          {board.items.map(item =>
            <Button key={item.id}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              draggable={true}
              className={styles.item}
              onClick={() => setModalItem(item)}
            >
              {item.title}
              <div>
                <img src={pen} className={styles.pen} alt={'pen'} />
              </div>
            </Button>)}
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
