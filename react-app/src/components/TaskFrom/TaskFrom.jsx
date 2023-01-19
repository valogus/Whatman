import React, { useEffect, useRef, useState } from 'react';
import style from './TaskForm.module.css'
import { Heading, Input, Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { Text, Select } from '@chakra-ui/react'


function TaskForm({ modalItem }) {

  const [value, setValue] = useState(modalItem.description)
  const [description, setDescription] = useState(false);
  const [comment, setComment] = useState('')
  const [isComment, setIsComment] = useState(false)
  const [comments, setComments] = useState([])
  const { userId, userName } = useSelector(store => store.auth);
  const [authorName, setAuthorName] = useState('')
  const [isExecutor, setIsExecutor] = useState(false)
  const [executor, setExecutor] = useState('Назначить исполнителя')
  const [executors, setExecutors] = useState([])
  const [isTitle, setIsTitle] = useState(false)
  const [title, setTitle] = useState(modalItem.title)


  useEffect(() => {
    const abortController = new AbortController()

    fetch(`/api/projects/${modalItem.project_id}/executors`, { signal: abortController.signal })
      .then(res => res.json())
      .then(users => setExecutors(users))

    return () => {
      abortController.abort()
    }
  }, [modalItem.project_id])

  useEffect(() => {
    const abortController = new AbortController()
    fetch(`/api/tasks/${modalItem.id}/executors`, { signal: abortController.signal })
      .then(res => res.json())
      .then(user => setExecutor(user?.login))
    return () => {
      abortController.abort()
    }
  }, [modalItem.id])


  useEffect(() => {
    const abortController = new AbortController()

    fetch(`/api/tasks/task/${modalItem.id}/comments`, { signal: abortController.signal })
      .then(res => res.json())
      .then(comments => setComments(comments))

    return () => {
      abortController.abort()
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController()

    fetch(`/api/tasks/task/author/${modalItem.author_id}`)
      .then(res => res.json())
      .then(res => setAuthorName(res.login))

    return () => {
      abortController.abort()
    }
  }, [modalItem.author_id])

  function cancel() {
    setDescription(false)
  }

  function addComment() {
    if (comment.trim()) {
      fetch(`/api/tasks/task/${modalItem.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title: comment, task_id: modalItem.id, UserId: userId }),
      })
        .then(res => res.json())
        .then(commentUser => {
          commentUser['User.login'] = userName
          setComments([commentUser, ...comments])
        })
    }
    setIsComment(false)
  }

  function addDescription() {
    fetch(`/api/tasks/task/${modalItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ description: value })
    })
      .then(res => res.json())
      .then(task => {
        modalItem.description = task.description
        setDescription(false)
      })
  }


  function addExecutorToTask(exUser) {
    setExecutor(exUser)
    const exec = executors.find(el => {
      if (el['User.login'] === exUser) {
        return el;
      }
    })
    fetch('/api/tasks/task/executor', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        junior_id: exec.junior_id,
        task_id: modalItem.id
      })
    })
      .then(() => setIsExecutor(false))
  }

  function editTitle() {
    fetch(`/api/tasks/task/${modalItem.id}/title`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(() => {
        modalItem.title = title;
        setIsTitle(false)
      })
  }

  return (
    <div className={style.modalBox}>

      {
        isTitle ?
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '7px' }} >
            <Input type="text" variant='unstyled' size='lg' style={{ width: '93%' }} value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button variant='outline' onClick={editTitle}>
              +
            </Button>
          </div>
          :
          <div className={style.title} onMouseDown={() => setIsTitle(true)}>
            <Text fontSize='4xl'>{title}</Text>
          </div>

      }
      <hr style={{ borderWidth: '1.7px' }} />
      <div className={style.secondRow}>
        <div className={style.descComment}>
          <div>
            <div>
              <div className={style.desc}>
                <span>Описание</span>
              </div>
              {description
                ?
                <>
                  <Textarea className={style.txtarea} value={value} onChange={(event => setValue(event.target.value))} placeholder='Описание' boxSize='80%'></Textarea>
                  <Button className={style.btn} type="button" onClick={addDescription}>Сохранить</Button>
                  <Button className={style.btn} type="button" onClick={cancel}>Отмена</Button>
                </>
                :
                <div>
                  {!value ?
                    <div className={style.nonValue} onMouseDown={() => setDescription(true)}>&nbsp;&nbsp;&nbsp;Добавить описание...</div>
                    :
                    <div className={style.addDesc} onMouseDown={() => setDescription(true)}>
                      ✒️&nbsp;  {value}
                    </div>
                  }
                </div>
              }
              {!isComment
                ?
                <div>
                  <input className={style.inputComment} placeholder="✒️  Добавить комментарий..." onFocus={() => setIsComment(true)} />
                </div>
                :
                <>
                  <Textarea style={{ margin: '15px 0' }} value={comment} onChange={(event => setComment(event.target.value))} placeholder='Ваш комментарий'></Textarea>
                  <Button className={style.btn} type="button" onClick={addComment}>Сохранить</Button>
                  <Button className={style.btn} type="button" onClick={() => setIsComment(false)}>Отмена</Button>
                </>
              }
              {
                comments.map(
                  (comment, index) => <div className={style.commStyle} key={comment.id}>
                    {/* <hr style={{ marginBottom: '10px' }} /> */}
                    <Heading style={{ marginBottom: '1rem' }} size='sm'>{comment['User.login']}</Heading>
                    <Text fontSize='sm'>{comment.title}</Text>
                  </div>)
              }
            </div>
          </div>
        </div>
        {/* Див с блоком назначение исполнителя */}
        <div className={style.executor}>
          <div className={style._executor}>
            <div className={[style.author, style.author_1].join(' ')}>
              <h2 style={{ padding: '0.5rem', marginRight: '50px' }}>Исполнитель</h2>
              {
                isExecutor ?
                  <div>
                    <Select value={executor} onChange={(event) => addExecutorToTask(event.target.value)} placeholder="Назначить исполнителя">

                      {executors.map(
                        (login) => <option key={login['User.login']} value={login['User.login']}>{login['User.login']}</option>
                      )}
                    </Select>
                  </div>
                  :
                  <div>
                    {
                      !executor ?
                        <span onMouseDown={() => setIsExecutor(true)}> Назначить исполнителя</span>
                        :
                        <span onMouseDown={() => setIsExecutor(true)}>{executor}</span>
                    }
                  </div>
              }
            </div>

            <div className={style.author}>
              <h2 style={{ padding: '0.5rem', marginRight: '50px' }}>Автор</h2>
              <span>{authorName}</span>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default TaskForm;
