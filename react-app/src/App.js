import React from 'react';
import Home from './components/Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth.jsx';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar'

function App() {

  const user = useSelector((session)=> session.auth)

  return (

    <div className="App">
      <Navbar/>
      <Routes>
      <Route path='/' element={<Navigate to={user.userId ? '/library' : '/auth'} />} />
        <Route path='/auth' element={<Auth />}/>
        <Route path="/library" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
