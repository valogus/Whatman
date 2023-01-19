
import React from 'react';
import Home from './components/Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Auth from './components/Auth/Auth.jsx';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar'
import Board from './components/Board/Board';
import MyTasks from './components/MyTasks/MyTasks'
import Main from './components/Main/Main'

function App() {

  const { userName } = useSelector(store => store.auth);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to={userName ? '/library' : '/main'} />} />
        <Route path='/main' element={<Main />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      {userName && <Navbar />}
      <Routes>
        <Route path="/library" element={userName ? <Home /> : <Navigate to={'/auth'} />} />
        <Route path="/board/:id" element={userName ? <ChakraProvider>
          <Board />
        </ChakraProvider> : <Navigate to={'/auth'} />} />
        <Route path='/myTasks' element={userName ? <ChakraProvider> <MyTasks /> </ChakraProvider> : <Navigate to={'/auth'} />} />
      </Routes>
    </div>
  );
}

export default App;
