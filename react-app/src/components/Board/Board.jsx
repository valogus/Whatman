import React, { useEffect, useState } from 'react';
import styles from './Board.module.css';
import { Button, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react'
import MyModal from '../Modal/MyModal'
import TaskForm from '../TaskFrom/TaskFrom'
import { useParams } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from '@chakra-ui/react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux';
import AddColumn from './addColumn/addColumn';
import AddUser from'./addUser/AddUser'
import styled from 'styled-components';


export default function Board() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idColumn, setIdColumn] = useState(0);

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [fon, setFon] = useState(null)
  const [boards, setBoards] = useState([]);
  const { id } = useParams();

  const [flag, setFlag] = useState(false)

  const [modalItem, setModalItem] = useState(null);
  const [task, setTask] = useState('')
  const { userId } = useSelector((session) => session.auth)

  const Wrapper = styled.div`
  
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: 8px;
  border: 8px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;
const Container = styled.div`
box-shadow: ${(props) => (props.isDragging ? '45px 45px 45px rgba(0, 0, 0, 0.35)' : '0 5px 45px rgba(0, 0, 0, 0.2)')};
background-color: #f4f5f7;
  min-width: 300px;
  min-height: 400px;
  border-radius: 6px;
  border: 3px solid lightgrey;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 10px;
`;
const Title = styled.h4`
background-color: ${(props) => (props.isDragging ? 'rgb(217, 227, 237)' : '#f4f5f7')};
font-size: 1.3rem;
font-weight: 600;
padding: 8px;
display: flex;
justify-content: space-between;
border-radius: 6px;
`
const TaskList =styled.div`
padding:8px;
border-radius: 6px;
background-color: ${(props) => (props.isDraggingOver ? 'rgb(217, 227, 237)' : '#f4f5f7')};
`
const Task = styled.div`
box-shadow: ${(props) => (props.isDragging ? '0 5px 45px rgba(0, 0, 0, 0.35)' : '0 5px 45px rgba(0, 0, 0, 0.12)')};
opacity:1;
width: 100%;
border: 2px solid lightgrey;
padding: 8px;
border-radius: 6px;
margin-bottom: 8px;
cursor: grab;
background-color: ${(props) => (props.isDragging ? '#fefae9' : 'white')};
display: flex;
align-items: center;
justify-content: space-between;
`

  const getAllBoards = async () => {
    try {
      const response = await fetch(`/api/board/${userId}`);
      const boardsData = await response.json();
      const [boards, partnerBoards] = boardsData
      const allBoards = boards.concat(partnerBoards)
      setFon(JSON.parse(allBoards.find((el)=> el.id == id).fon))
      console.log(fon)
    } catch (error) {
      console.log(error, '=============');
    }
  }


  useEffect(() => {
    getAllBoards()
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


  const onDragEnd = (result) => {

    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId &&
      destination.index === source.index) {
      return
    }
    // перемещение колонок
    if (type === 'column') {

      const newColumns = JSON.parse(JSON.stringify(boards))
      const newElement = newColumns.splice(source.index, 1)
      newColumns.splice(destination.index, 0, newElement[0])
      newColumns.map((el, index) => el.order = index)
      fetch(`/api/columns`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newColumns)
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
    if (source.droppableId === destination.droppableId) {
      const newColumnTasks = [...column.Tasks]
      const newElement = newColumnTasks.splice(source.index, 1)
      newColumnTasks.splice(destination.index, 0, newElement[0])
      newColumnTasks.map((el, index) => el.order = index)
      fetch(`/api/tasks/${newElement[0].id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newColumnTasks)
      })
        .then(res => {
          return res.json()
        })

      const newColumn = {
        ...column,
        Tasks: newColumnTasks
      }
      const newState = JSON.parse(JSON.stringify(boards))

      newState.splice(destination.droppableId, 1, newColumn)
      setBoards(newState)
      return;
    }
    //перемещение в нескольких column_id?
    const startColumnTasks = [...start.Tasks]
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
    startColumnTasks.map((el, index) => el.order = index)
    finishColumnTasks.map((el, index) => el.order = index)
    const sendAllTasks = startColumnTasks.concat(finishColumnTasks);
    fetch(`/api/tasks/${newElement[0].id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(sendAllTasks)
    })
      .then(res => {
        return res.json()
      })
    const newState = JSON.parse(JSON.stringify(boards))
    newState.splice(source.droppableId, 1, oldColumn)
    newState.splice(destination.droppableId, 1, newColumn)
    setBoards(newState)
  }

  function addTaskToColumn(board) {
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title: task, column_id: board.id, project_id: id, order: board.Tasks.length, author_id: Number(userId) })
    })
      .then(res => res.json())
      .then(task => {
        setTask('')
        setFlag(x => !x)
        onClose();
      })
  }

  function removeTask(id, board) {
    const result = boards.map((column => {
      if (column.id === board.id) {
        column.Tasks = column.Tasks.filter(task => task.id !== id)
        column.Tasks.map((el, index) => el.order = index)
        return column
      } else {
        return column
      }
    }))


    fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(result[board.id - 1])
    })
      .then(res => res.json())
      .then(data => {
        if (data.deleted) {
          setBoards(result)
        }
      })
  }
  function removeColumn(id) {
    fetch(`/api/columns/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deleted) {
          setBoards((prev) => [...prev].filter(column => column.id !== id))
        }
      })
  }

  return (

    <div className={styles.main}>
    <AddUser/>
 <Flex bgColor={fon?.color}
 bgImage={fon?.image}
 className={styles.scroll}
 >
   
    <DragDropContext 
    onDragEnd={onDragEnd} 
    >
       

      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => <div className={styles.app}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >{boards.map((board, index) =>
        (<Draggable key={board.id} 
        draggableId={board.id.toString()} 
        index={index}>
          {(provided, snapshot) => <Container
            
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >

            <Title  {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
              >{board.title}              <Button borderRadius="50%" pt={1} ml={1} type='button' variant='ghost' onClick={() => removeColumn(board.id)}>
              ✖️
        </Button></Title>

            <Droppable droppableId={`${index}`}>
              {(provided, snapshot) => <TaskList className={styles.droppableTasks}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                type='task'

              >
                {board.Tasks?.map((item, i) =>

                  <Draggable key={item.id} draggableId={`task-${item.id}`} index={i}>

                    {(provided, snapshot) => <Task
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    >
                        <div className={styles.modalarea} onClick={() => setModalItem(item)}>
                          {item.title}
                        </div>
                        <Button borderRadius="50%" pt={1} ml={1} type='button' variant='ghost' onClick={() => removeTask(item.id, board)}>
                          ✖️
                        </Button>

                      
                    </Task>
                    }

                  </Draggable>


                )}{provided.placeholder}</TaskList>}

            </Droppable>


            <Button  colorScheme='teal' variant='outline' onClick={() => { onOpen(); setIdColumn(board) }}>
              +
            </Button>
          </Container>}


        </Draggable> )
        
        )}{provided.placeholder}               
        <AddColumn id={id}boards={boards}setBoards={setBoards}/></div>}



      </Droppable >

      {
        modalItem && <MyModal visible={modalItem !== null} setVisible={setModalItem}>
          <TaskForm
            modalItem={modalItem} />
        </MyModal>
      }
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
    </DragDropContext >
    <div className={styles.footer}></div>
    </Flex>
    
    </div>
  )
}
