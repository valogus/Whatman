import React, { useEffect, useState } from 'react';
import style from './TaskForm.module.css'
import { Heading, Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { Text } from '@chakra-ui/react'


function TaskForm({
  modalItem }) {

  const [value, setValue] = useState(modalItem.description)
  const [description, setDescription] = useState(false);
  const [comment, setComment] = useState('')
  const [isComment, setIsComment] = useState(false)
  const [comments, setComments] = useState([])
  const { userId, userName } = useSelector(store => store.auth);
  const [authorName, setAuthorName] = useState('')


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
          console.log(commentUser)
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

  return (
    <div>
      <Text fontSize='4xl'>{modalItem.title}</Text>
      <div>
        <div style={{ paddingTop: '10px' }}>
          <span style={{ fontSize: '14px' }}>Описание</span>
        </div>
        {description
          ?
          <>
            <Textarea style={{ display: 'block', margin: '15px 0' }} value={value} onChange={(event => setValue(event.target.value))} placeholder='Описание' boxSize='80%'></Textarea>
            <Button style={{ marginRight: "10px" }} type="button" onClick={addDescription}>Сохранить</Button>
            <Button type="button" onClick={cancel}>Отмена</Button>
          </>
          :
          <div>
            {!value ?
              <div className={style.nonValue} onMouseDown={() => setDescription(true)}>Добавить описание...</div>
              :
              <div style={{ width: '200px', height: '20px', backgroundColor: 'white', margin: '5px 0', borderRadius: '5px', cursor: 'text', fontSize: '12px', fontWeight: 'bold' }} onMouseDown={() => setDescription(true)}>
                {value}
              </div>
            }
          </div>
        }
        {!isComment
          ?
          <div>
            <div>
              <input style={{ width: '100%', marginBottom: '1rem' }} placeholder="Добавить комментарий..." onFocus={() => setIsComment(true)} />
            </div>
          </div>
          :
          <>
            <Textarea style={{ margin: '15px 0' }} value={comment} onChange={(event => setComment(event.target.value))} placeholder='Ваш комментарий'></Textarea>
            <Button type="button" onClick={addComment}>Сохранить</Button>
            <Button style={{ marginLeft: '10px' }} type="button" onClick={() => setIsComment(false)}>Отмена</Button>
          </>
        }
        {
          comments.map(
            (comment, index) => <div key={comment.id}>
              <hr style={{ marginBottom: '10px' }} />
              <Heading style={{ marginBottom: '1rem' }} size='sm'>{comment['User.login']}</Heading>
              <Text fontSize='sm'>{comment.title}</Text>
            </div>)
        }
      </div>
      {/* Див с блоком назначение исполнителя */}
      <div style={{ border: '1px solid grey', width: '50%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ padding: '0.5rem', marginRight: '50px' }}>Исполнитель</h2>
          <span>Не назначено</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: '' }}>
          <h2 style={{ padding: '0.5rem', marginRight: '50px' }}>Атвор</h2>
          <span>{authorName}</span>
        </div>
      </div>
    </div >
  );
}

export default TaskForm;
