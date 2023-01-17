import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.css'
import { setUsernameAC } from '../../store/reducers/actionAuth'

export default function Navbar() {

  // const isAuth = { login: 'q@q', id: 1 }
  // const isAuth = null
  const { userName } = useSelector(store => store.auth);
  const dispatch = useDispatch()
  function logout() {
    dispatch(setUsernameAC({
      userName: null,
      userId: null,
    }));
    // localStorage.setItem("userSession", JSON.stringify(data));
    localStorage.clear();
    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })

  }

  return (
    <>
      <ul className={style.nav_wrap}>
        <li>
          <NavLink to="/">
            Jirlo
          </NavLink>
        </li>
        {userName &&
          (<>
            <li>
              <NavLink to="/">
                Задачи
              </NavLink>
            </li>
            <li>
              <NavLink to="/library">
                Мои Доски
              </NavLink>
              </li>
              <li>
              <NavLink onClick={() => console.log('Создать')} to="/">
                Создать
              </NavLink>
            </li>
          </>)
        }
        <NavLink onClick={() => logout()} to="/auth">
          Выйти
        </NavLink>

      </ul>
    </>
  )
}
