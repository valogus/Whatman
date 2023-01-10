import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Main from './Components/Main/Main'


function App() {
  // const isAuth = { login: 'q@q', id: 1 }
  const isAuth = null
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          {isAuth ?
          <Route index element={<Home />} />
            :
            <Route index element={<Main />} />
          }
        </Route>
      </Routes>
    </>
  );
}

export default App;
