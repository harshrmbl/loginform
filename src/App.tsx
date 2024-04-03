import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/page404';

const App: React.FC = () => {
  //const isLoggedIn = localStorage.getItem('isLoggedIn')==='true'; 
  const isLoggedIn = localStorage.getItem('isLoggedIn'); 
  console.log('type', typeof(isLoggedIn));
  console.log('value', isLoggedIn);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={isLoggedIn=== "true"? <Home /> : <Navigate to="/"  />} 
        />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
