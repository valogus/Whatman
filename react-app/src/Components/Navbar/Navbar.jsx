import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Spacer, Center, ChakraProvider, Text, Link, IconButton } from '@chakra-ui/react';
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
    <ChakraProvider>
      <Flex w='100%'>
        <ul className={style.nav_wrap}>
          <li>
            <NavLink to="/">
              Watman
            </NavLink>
          </li>
          {userName &&
            (<>
              <li>

                <NavLink to="/myTasks">
                  Мои Задачи
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => (isActive ? `${style.active}` : 'inactive')} to="/library">
                  Мои Доски
                </NavLink>
              </li>
            </>)
          }
          <Spacer />
          <NavLink onClick={() => logout()} to="/auth">
            Выйти
          </NavLink>

        </ul>
      </Flex>
    </ChakraProvider >
  )
}
