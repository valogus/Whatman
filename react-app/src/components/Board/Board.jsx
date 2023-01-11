import React, { useState } from 'react';
import styles from './Board.module.css';
import pen from './pen.png'

export default function Board() {
  const [boards, setBoards] = useState([
    { id: 1, title: 'К выполнению', items: [{ id: 1, title: 'сварить кофе'}, { id: 2, title: 'Вымыть окна'}, { id: 3, title: 'Пропылесосить'}], project_id: 1 },
    { id: 2, title: 'В работе', items: [{ id: 4, title: 'Доделать модальное окно'}, { id: 5, title: 'Доделать регистрацию'}, { id: 6, title: 'Почистить экран'}], project_id: 1 },
    { id: 3, title: 'Завершено', items: [{ id: 7, title: 'Погулять с сыном'}, { id: 8, title: 'Приготовить ужин'}, { id: 9, title: 'Сходить за пивом'}], project_id: 1 },
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  function dragOverHandler(e) {
    e.preventDefault()
    if (e.target.className == styles.item) {
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

 

  return (
    <div className={styles.app}>
      {boards.map(board =>
        <div className={styles.board}>
          <div className={styles.board__title}>{board.title}</div>
          {board.items.map(item =>
            <div
          onDragOver={(e)=> dragOverHandler(e)}
          onDragLeave={(e)=> dragLeaveHandler(e)}
          onDragStart={(e)=> dragStartHandler(e, board, item)}
          onDragEnd={(e)=> dragEndHandler(e)}
          onDrop={(e)=> dropHandler(e, board, item)}
          draggable={true}
            className={styles.item}
          >
              {item.title} <div>
                <img src={pen} className={styles.pen} alt={'pen'} />
            </div>
            </div>)}
          <div className={styles.add}>Добавить задачу</div>
        </div>
      )}
    </div>
  )
}
