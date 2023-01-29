import React, {useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import MyModal from '../Modal/MyModal';
import TaskForm from '../TaskFrom/TaskFrom';
import styles from './myTasks.module.css';


export default function MyTasks() {
  const [tasks, setTasks] = useState([])
  const [modalItem, setModalItem] = useState(null)
  const userId = useSelector((session) => session.auth.userId)
  console.log("🚀 ~ file: MyTasks.jsx:8 ~ MyTasks ~ userId", userId)
  
  const getUserTasks = async () => {
    try {
      const response = await fetch(`/api/myTasks/${userId}`);
      const tasks = await response.json();
      console.log("🚀 ~ file: MyTasks.jsx:14 ~ getUserTasks ~ tasks", tasks)

      setTasks(tasks);
    } catch (error) {
      console.log(error, '=============');
    }
  }
  useEffect(() => {
    getUserTasks()
  }, []);

  return (
    <>
        <div className={styles.title} size='md'>МОИ ЗАДАЧИ:</div>
         <div className={styles.all}>
        {tasks.length > 0 ?
          (<>
              {tasks.map((task) => ( <div key={task.id} className={styles.boxTasks} onClick={() => setModalItem(task)}>
                <div className={styles.tasks}>
                  <div className={styles.task}>Задача: {task.title}</div>
                   <div className={styles.task}>Описание: {task.description}</div>
                </div>
                </div>))}
          </>
          ) : (<h2>У вас нет задач</h2>)
        }
      </div>
      {
        modalItem && <MyModal visible={modalItem !== null} setVisible={setModalItem}>
          <TaskForm
            modalItem={modalItem} />
        </MyModal>
      }
    </>

  )
}

