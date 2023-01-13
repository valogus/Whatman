import React from 'react'
import { Link } from 'react-router-dom';
import style from './style.module.css'

export default function Boards({ board }) {
  return (
    <>
      <div className={style.boards_wrap}>
        <Link to={`/board/${board.id}`} className={style.board_block}>
          <h3>{board.id}</h3>
          <h3>{board.title}</h3>
          <h3>{board['User.email']}</h3>
          <h3>{board['User.login']}</h3>
        </Link>
      </div>
    </>

  )
}
