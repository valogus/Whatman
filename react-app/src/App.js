
import React from 'react';
import Home from './components/Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Auth from './components/Auth/Auth.jsx';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar'
import Boards from './components/Boards/Boards';
import Board from './components/Board/Board';

function App() {

  const { userName } = useSelector(store => store.auth);
  return (

    <div className="App">

      <Navbar user={userName} />
      <Routes>
        <Route path='/' element={<Navigate to={userName ? '/library' : '/auth'} />} />
        <Route path='/auth' element={<Auth />} />
        <Route path="/library" element={<Home />

        } />
        <Route path="/board/:id" element={
          <ChakraProvider>
            <Board />
          </ChakraProvider>
        } />
      </Routes>
    </div>
  );
}

export default App;
