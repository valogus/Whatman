import React from 'react'
import { NavLink } from 'react-router-dom';

import style from './style.module.css'

export default function Navbar({ user }) {
  console.log("▶ ⇛NAVBAR user", user);

  // const isAuth = { login: 'q@q', id: 1 }
  // const isAuth = null

  return (
    <>
      <ul className={style.nav_wrap}>
        <li>
          <NavLink to="/">
            Jirlo
          </NavLink>
        </li>
        {user &&
          (<>
            <li>
            <NavLink to="/">
            Задачи
          </NavLink>
          </li>
        <li>
            <NavLink to="/home">
            Мои Доски
          </NavLink>
          </li>
          <NavLink to="/">
        Пригласить участника
          </NavLink>
        <li>
            <NavLink onClick={() => console.log('Создать')} to="/">
            Создать
          </NavLink>
        </li>
          </>)
        }
        {user ?
          (<>
            <NavLink onClick={() => console.log('Выйти')} to="/">
              Выйти
            </NavLink>
          </>) : (<>
            <li>
              <NavLink onClick={() => console.log('Войти')} to="/">
                Войти
          </NavLink>
        </li>
          </>)
        }

      </ul>
    </>
  )
}
