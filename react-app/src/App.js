import React from 'react';
import Layout from './Components/Layout/Layout'
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth.jsx';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector((session)=> session.auth)

  return (

    <div className="App">
      <Routes>
      <Route path='/' element={<Navigate to={user.userId ? '/library' : '/auth'} />} />
        <Route path='/auth' element={<Auth />}/>
         <Route path="/library" element={<Layout />} >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
