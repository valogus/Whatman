import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { ChakraProvider, Flex, Center, Spacer, Text, Wrap, IconButton } from '@chakra-ui/react';
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
      <Flex w='100%' className={style.nav_wrap}>
        {/* <ul className={style.nav_wrap}> */}
        <Wrap spacing='50px'>
          <Center>
            <Text ml={10}>
              Watman
            </Text>
          </Center>
          {userName &&
            (<>
              <li>
                <NavLink to="/myTasks"
                  className={({ isActive }) => (isActive ? `${style.active}` : 'inactive')}
                >
                  Мои Задачи
                </NavLink>
              </li>
              <li>
                <NavLink to="/library"
                  className={({ isActive }) => (isActive ? `${style.active}` : 'inactive')}
                >
                  Мои Доски
                </NavLink>
              </li>
              {/* <li>
              <NavLink onClick={() => console.log('Создать')} to="/">
                Создать
              </NavLink>
            </li> */}
            </>)
          }
        </Wrap>
        <Spacer></Spacer>

        <Wrap spacing='50px'>
          <Center>
            <Text>{userName}</Text>
          </Center>
          <li>
            <NavLink onClick={() => logout()} to="/">
              Выйти
            </NavLink>
          </li>
        </Wrap>

        {/* </ul> */}
      </Flex>
    </>
  )
}
