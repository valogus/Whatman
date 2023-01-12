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
      </Routes>
    </div>
  );
}

export default App;
