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

  const onDragEnd = (result) => {
   
    const {destination, source, draggableId, type} = result;
    console.log(result)
    if(!destination) return;
    if (source.droppableId === destination.droppableId && 
      destination.index === source.index){
        return
      }
    // перемещение колонок
    if(type === 'column'){
      console.log(result)

      const newColumns = JSON.parse(JSON.stringify(boards))
      const newElement = newColumns.splice(source.index, 1)
      console.log(newElement)
      newColumns.splice(destination.index, 0, newElement[0])
      newColumns.map((el, index)=> el.order = index)
      console.log(newColumns)
      fetch(`/api/columns`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(  newColumns )
      })
        .then(res => {
          return res.json()
        })
       setBoards(newColumns)
      return;
    }
    // внимательно! поменять на индекс!
    const column = boards[source.droppableId]
    const start = boards[source.droppableId]
    const finish = boards[destination.droppableId]
    // перемещение в одной колонке
    if(source.droppableId === destination.droppableId){
      const newColumnTasks= [...column.Tasks]
      const newElement = newColumnTasks.splice(source.index, 1)
       newColumnTasks.splice(destination.index, 0, newElement[0])
       newColumnTasks.map((el, index)=> el.order = index)
       const sendAllTasks = [];
       fetch(`/api/tasks/${newElement[0].id}`, {
       method: 'PUT',
       headers: {
         'Content-type': 'application/json',
       },
       body: JSON.stringify(  newColumnTasks )
     })
       .then(res => {
         return res.json()
       })
      
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
    const newElement = startColumnTasks.splice(source.index, 1)
    newElement[0].column_id = Number(finish.id)
    const oldColumn = {
      ...start,
      Tasks: startColumnTasks
    }
    const finishColumnTasks = [...finish.Tasks]
    finishColumnTasks.splice(destination.index, 0, newElement[0])
    const newColumn = {
      ...finish,
      Tasks: finishColumnTasks
    }
      startColumnTasks.map((el, index)=> el.order = index)
      finishColumnTasks.map((el, index)=> el.order = index)
       const sendAllTasks = startColumnTasks.concat(finishColumnTasks);
    fetch(`/api/tasks/${newElement[0].id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(  sendAllTasks )
  })
    .then(res => {
      return res.json()
    })
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
       <DragDropContext onDragEnd={onDragEnd}>
       <Droppable droppableId='all-columns' direction='horizontal' type ='column'>
        {(provided)=><div className={styles.app}
            ref={provided.innerRef}
            {...provided.droppableProps}
            >{boards.map((board, index) =>
       ( <Draggable key={board.id} draggableId={board.id.toString()} index={index}>
          {(provided)=><div 
          className={styles.board} 
          {...provided.draggableProps}
          ref={provided.innerRef}
           >
          <div  {...provided.dragHandleProps} 
          className={styles.board__title}>{board.title}</div>
          <Droppable droppableId={`${index}`}>
            {(provided)=><div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            type='task'
            >
            {board.Tasks?.map((item, i) =>
            <Draggable key={item.id} draggableId={`task-${item.id}`} index={i}>
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
          
        </div>}
   
        </Draggable>)
       )}{provided.placeholder}</div>}
     
       </Droppable>
       </DragDropContext>
  )
}
