import React, { useState } from 'react'
import { useEffect } from 'react'

import style from './style.module.css'
import Boards from '../Boards/Boards'

export default function Home({ user }) {

  const [boards, setBoards] = useState([])
  const userId = user?.id
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:3100/api/board/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });
        const boards = await response.json();
        setBoards(boards.projects);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <h2 className={style.text_center}> Мои Проекты</h2>
      <div className={style.main_wrap}>
        {
          boards.map((board) =>
          (
            <Boards board={board} key={board.id}></Boards>)
          )
        }
      </div>
      <div className={style.add_board}>
        <button
          className={style.add_board_button}
          onClick={() => console.log("Добавить Проект")}
        >+</button>
      </div>
    </>
  )
}
