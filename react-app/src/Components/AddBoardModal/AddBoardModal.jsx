import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux'
export default function AddBoardModal(props) {

  const colorDefault = 2 // Цвет доски
  const author = useSelector((session)=> session.auth.userId)
  const [title, setTitle] = useState();

  const sendForm = async () => {
    try {
      const response = await fetch('/api/board', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, color: colorDefault })
      });

      const answerModal = await response.json();
      // console.log("▶ ⇛ answerModal", answerModal);
      if (answerModal) {
        boardAdd();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const boardAdd = () => {
    props.onHide()
    props.addboard()
  }

  return (
    <Modal
      // {...props}
      show={props.show} onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Новая Доска
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form.Label htmlFor="inputBoardName"><h4>Название</h4></Form.Label>
        <Form.Control
          type="text"
          id="inputBoardName"
          className='w-75'
          onChange={(e) => setTitle(e.target.value)}
        />

        <Form.Label htmlFor="inputBoardFon"><h4>Фон</h4></Form.Label>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={() => sendForm()}>
            Отправить
          </Button>
        </Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}
