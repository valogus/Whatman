
import React from 'react';
import Home from './components/Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Auth from './components/Auth/Auth.jsx';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar'
import Board from './components/Board/Board';

function App() {

  const { userName } = useSelector(store => store.auth);
  return (

    <div className="App">


      <Routes>
        <Route path='/' element={<Navigate to={userName ? '/library' : '/auth'} />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Navbar />
      <Routes>
        <Route path="/library" element={userName ? <Home /> : <Navigate to={'/auth'} />} />
        <Route path="/board/:id" element={userName ? <ChakraProvider>
          <Board />
        </ChakraProvider> : <Navigate to={'/auth'} />} />
      </Routes>
    </div>
  );
}

export default App;
