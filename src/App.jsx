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
import ApiServices from './services/apiServices';
import Logout from './pages/Logout';

function App() {
    const manager = ApiServices.isManager();
    const employee = ApiServices.isEmployee();
    const authenticated = ApiServices.isAuthenticate();
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Home /> } />
        <Route path={'/home'} element={ <Home /> } />
        <Route path={'/'} element={ <Home /> } />
        <Route path={'/contact'} element={ <Contact /> } />
        <Route path={'/about'} element={ <About /> } />
        {
            !authenticated && (
                <Route path={'/login'} element={ <Login /> } />
            )
        }
        <Route path={'/logout'} element={ <Logout /> } />
        <Route path={'/register'} element={ <Signup /> } />
        {
            manager && (
                <>
                    <Route path={'/employees'} element={ <Employees manager={true} /> } />
                    <Route path={'/dashboard'} element={ <Dashboard /> } />
                </>
            )
        }
        <Route path={'*'} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
