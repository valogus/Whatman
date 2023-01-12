import React, { useState } from 'react'
import { useEffect } from 'react'

import style from './style.module.css'
import Boards from '../Boards/Boards'
import AddBoardModal from '../AddBoardModal/AddBoardModal'

export default function Home({ user }) {

  const [boards, setBoards] = useState([])
  const [modalShow, setModalShow] = useState(false);

  const userId = user?.id

  // Получение досок юзера с базы
  const getAllBoards = async () => {
    try {
      const response = await fetch(`http://localhost:3100/api/board/${userId}`, {
        method: 'GET',
      });
      const boards = await response.json();
      setBoards(boards.projects);
      // console.log("▶ ⇛ setBoards", boards);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      await getAllBoards()
    })();
  }, []);

  return (
    <>

      <h2 className={style.text_center}> Ваши Проекты</h2>
      {boards.length > 0 ?
        (<>
          <div className={style.main_wrap}>
            {boards.map((board) =>
              (<Boards board={board} key={board.id}></Boards>))
            }
          </div></>
        )
        : (<h2 className={style.text_center}>У вас нет Проектов</h2>)
      }

      <div className={style.add_board}>
        <button
          className={style.add_board_button}
          onClick={() => setModalShow(true)}
        >+</button>
      </div>


      <h2 className={style.text_center}>Проекты в которых вы учавствуете</h2>


      <AddBoardModal show={modalShow}
        onHide={() => setModalShow(false)}
        addboard={getAllBoards}
      >
      </AddBoardModal>
    </>
  )
}
