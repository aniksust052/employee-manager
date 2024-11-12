import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles.scss';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Employees from './pages/Employees';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Home /> } />
        <Route path={'/home'} element={ <Home /> } />
        <Route path={'/'} element={ <Home /> } />
        <Route path='/contact' element={ <Contact /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/register' element={ <Signup /> } />
        <Route path='/employees' element={ <Employees /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
