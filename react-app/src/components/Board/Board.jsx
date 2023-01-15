import React, { useEffect, useState } from 'react';
import styles from './Board.module.css';
import pen from './pen.png'
import { Button } from '@chakra-ui/react'
import Modal from '../Modal/Modal'
import TaskForm from '../TaskFrom/TaskFrom'
import { useParams } from 'react-router-dom';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'


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

  useEffect(() => {
    
    const abortController = new AbortController()
    fetch(`/api/columns/${id}`, { signal: abortController.signal })
      .then(res => res.json())
      .then(data => setBoards(data))
      .catch(console.log)

    return () => {
      abortController.abort()
    }
  }, []);
  console.log(boards)

  // function dragOverHandler(e) {
  //   e.preventDefault()
  //   if (e.target.className === styles.item) {
  //     e.target.style.boxShadow = '0 4px 3px gray'
  //   }
  // }

  // function dragLeaveHandler(e) {
  //   e.target.style.boxShadow = 'none'
  // }

  // function dragStartHandler(e, board, item) {
  //   console.log('Зашли')
  //   setCurrentBoard(board)
  //   setCurrentItem(item)
  // }

  // function dragEndHandler(e) {
  //   e.target.style.boxShadow = 'none'
  // }

  // function dropHandler(e, board, item) {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   console.log(board)
  //   console.log(currentBoard)
  //   console.log(item, 'item')
  //   console.log(currentItem, 'current!!!!')
  //   setCurrentItem((prev)=>prev['column_id'] = board.id)
  //   const currentIndex = currentBoard.Tasks.indexOf(currentItem)
  //   currentBoard.Tasks.splice(currentIndex, 1)
  //   const dropIndex = board.Tasks.indexOf(item)
  //   board.Tasks.splice(dropIndex + 1, 0, currentItem)

  //  setBoards(boards.map(b => {
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

  // function dropCardHandler(e, board) {
  //   board.Tasks.push(currentItem)
  //   currentItem['column_id'] = board.id
  //     fetch(`/api/tasks/${currentItem.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify({ boardId: board.id })
  //     })
  //       .then(res => {
  //         return res.json()
  //       })
  //   const currentIndex = currentBoard.Tasks.indexOf(currentItem)
  //   currentBoard.Tasks.splice(currentIndex, 1)
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
  //   console.log(board, 'BOARD')
  // }

  const onDragEnd = (result) => {
   
    const {destination, source, draggableId} = result;
    console.log(result)
    if(!destination) return;
    if (source.droppableId === destination.droppableId && 
      destination.index === source.index){
        return
      }
    // внимательно! поменять на индекс!
    const column = boards[source.droppableId]
    const start = boards[source.droppableId]
    const finish = boards[destination.droppableId]
    // перемещение в одной колонке
    if(source.droppableId === destination.droppableId){
      console.log(start, finish, 'column')
      const newColumnTasks= [...column.Tasks]
      newColumnTasks.splice(source.index, 1)
       newColumnTasks.splice(destination.index, 0, JSON.parse(draggableId))
      
      const newColumn = {
        ...column,
        Tasks: newColumnTasks
      }
      const newState = JSON.parse(JSON.stringify(boards))
      
      newState.splice(destination.droppableId, 1, newColumn )
      console.log(newState , 'column')
         setBoards(newState)
         return;
    }
    //перемещение в нескольких column_id?
    const startColumnTasks= [...start.Tasks]
    startColumnTasks.splice(source.index, 1)
    const oldColumn = {
      ...start,
      Tasks: startColumnTasks
    }
    const finishColumnTasks = [...finish.Tasks]
    finishColumnTasks.splice(destination.index, 0, JSON.parse(draggableId))
    const newColumn = {
      ...finish,
      Tasks: finishColumnTasks
    }
    console.log(newColumn)
    const newState = JSON.parse(JSON.stringify(boards))
    newState.splice(source.droppableId, 1, oldColumn )
    newState.splice(destination.droppableId, 1, newColumn)
    console.log(newState, 'NEW')
       setBoards(newState)
    // console.log(column, 'column')
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
    <div className={styles.app}>
       <DragDropContext onDragEnd={onDragEnd}>
      {boards.map((board, index) =>
     
        <div className={styles.board} key={board.id}>
          <div   className={styles.board__title}>{board.title}</div>
          <Droppable droppableId={`${index}`}>
            {(provided)=><div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
            >
            {board.Tasks?.map((item, i) =>
            <Draggable key={item.id} draggableId={JSON.stringify(item)} index={i}>
              {(provided, snapshot)=> <div 
              ref={provided.innerRef} {...provided.draggableProps}>  
              <div 
              {...provided.dragHandleProps}
              className={styles.item}
              onClick={() => setModalItem(item)}
            >
              {item.title}
              <div>
             { board.id} {i}
                <img src={pen} className={styles.pen} alt={'pen'} />
              </div>
             
            </div>
            </div>}
         
            </Draggable>
          )}{provided.placeholder}</div> }
          
          </Droppable>
          {
            modalItem && <Modal visible={modalItem !== null} setVisible={setModalItem}>
              <TaskForm comments={comments} onCreateComment={onCreateComment}
                modalItem={modalItem} />
            </Modal>
          }
          <div className={styles.add}>Добавить задачу</div>
          
        </div>
       )}
       </DragDropContext>
    </div>
  )
}
