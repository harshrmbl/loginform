import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import User from './pages/User';
import PageNotFound from './pages/page404';
import RequireAuth from './pages/AdditionalComponents/requireAuth';

const App: React.FC = () => {
  //const isLoggedIn = localStorage.getItem('isLoggedIn')==='true'; 
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  console.log('type', typeof (isLoggedIn));
  console.log('value', isLoggedIn);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/home" element={<RequireAuth component={Home} />}/>
        <Route path='/user'
          element={isLoggedIn === "true" ? <User /> : <Navigate to="/" />}></Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
