import React, {useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './myTasks.module.css';


export default function MyTasks() {
  const [tasks, setTasks] = useState([])
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
           
              {tasks.map((task) => ( <div className={styles.boxTasks}>
                <div className={styles.tasks}>
                  <div className={styles.task}>Задача: {task['Task.title']}</div>
                   <div className={styles.task}>Описание: {task['Task.description']}</div>
                </div>
                </div>))}
          </>
          ) : (<h2>У вас нет задач</h2>)
        }
      </div>
    </>

  )
}

  
    
  //     <Heading size='md'> Customer dashboard</Heading>
  //   </CardHeader>
    
  //     <Text>View a summary of all your customers over the last month.</Text>
  //   </CardBody>
  //   {/* <CardFooter>
  //     <Button>View here</Button>
  //   </CardFooter> */}
  // </Card>