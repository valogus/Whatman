import React, { useState } from 'react';
import style from './TaskForm.module.css'
import { Heading, Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

import { Text } from '@chakra-ui/react'


function TaskForm({ comments, onCreateComment, modalItem }) {

  const [value, setValue] = useState('')
  const [description, setDescription] = useState(false);
  const [comment, setComment] = useState('')
  const [isComment, setIsComment] = useState(false)

  function cancel() {
    setDescription(false)
  }

  function addComment() {
    if (comment.trim()) {
      onCreateComment(comment)
    }
    setIsComment(false)
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
            <Button style={{ marginRight: "10px" }} type="button" onClick={() => setDescription(false)}>Сохранить</Button>
            <Button type="button" onClick={cancel}>Отмена</Button>
          </>
          :
          <div>
            {!value ?
              <div className={style.nonValue} onMouseDown={() => setDescription(true)}>Добавить описание...</div>
              :
              <div style={{ width: '100%', height: '20px', backgroundColor: 'white', margin: '5px 0', borderRadius: '5px', cursor: 'text' }} onMouseDown={() => setDescription(true)}>
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
              { } <hr style={{ marginBottom: '10px' }} />
              <Heading style={{ marginBottom: '1rem' }} size='sm'>{comment.login}</Heading>
              <Text fontSize='sm'>{comment.comment}</Text>
            </div>)
        }
      </div>
    </div >
  );
}

export default TaskForm;
