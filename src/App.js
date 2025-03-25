
// src/App.js
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Admin from './admin/Admin';
import ProtectedRoute from './admin/ProtectedRoute';
import Login from './admin/Login';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './admin/Auth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path='/admincheck' element={<Admin />}></Route>
        {/* <Route path='/adminNew' element={<Admin />} /> */}
      </Routes>
    </div>
  );
}

export default App;