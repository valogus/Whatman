import React from 'react'
import { NavLink } from 'react-router-dom';

import style from './style.module.css'

export default function Navbar() {
  return (
    <>
      <ul className={style.nav_wrap}>
        <li>
          {' '}
          <NavLink to="/" className={style}>
            Главная{' '}
          </NavLink>
        </li>{' '}
        <li>
          {' '}
          <NavLink to="/statistic" className={style}>
            Задачи
          </NavLink>
        </li>{' '}
        <li>
          {' '}
          <NavLink to="/top" className={style}>
            Мои Доски
          </NavLink>
        </li>{' '}
        Пригласить участника
        <li>
          <NavLink onClick={console.log('Создать')} to="api/" className={style}>
            Создать
          </NavLink>
        </li>
        <li>
          <NavLink onClick={console.log('Logout')} to="api/signup" className={style}>
            Выйти
          </NavLink>
        </li>
      </ul>
    </>
  )
}
