import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Spinn from '../Spinn/Spinn'
import Main from '../Main/Main'
import Home from '../Home/Home'


export default function Layout() {

  const [user, setUser] = useState()
  const [answerServer, setAnswerServer] = useState(false)
  // const isAuth = { login: 'q@q', id: 1 }
  // const isAuth = null

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3100/api/checkAuth', {
          method: 'GET',
          credentials: 'include',
        });
        const { user } = await response.json();
        console.log("▶ ⇛ user", user);
        setUser(user)
        setAnswerServer(true)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {console.log('Render Layout')}
      <Navbar user={user}></Navbar>
      {!answerServer ?
        <Spinn></Spinn>
        :
        user ?
          <Home user={user}></Home>
          :
          <Main user={user}></Main>
      }
    </ >
  )
}
