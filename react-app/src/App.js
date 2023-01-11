import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/auth' element={<Auth />}/>
      </Routes>
    </div>
  );
}

export default App;
