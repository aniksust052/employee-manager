import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <ul className='nav-bar'>
            <li>
                <NavLink to='/employees' >
                    Employees
                </NavLink>
            </li>
            <li>
                <NavLink to='/home' >
                    Home
                </NavLink>
            </li>
            {/* <li>
                <NavLink to='/contact'>
                    Contact
                </NavLink>
            </li>
            <li>
                <NavLink to='/about'>
                    About
                </NavLink>
            </li> */}
            <li>
                <NavLink to='/dashboard'>
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to='/login'>
                    Login
                </NavLink>
            </li>
            {/* <li>
                <NavLink to='/logout'>
                    Logout
                </NavLink>
            </li> */}
        </ul>
    );
}

export default Nav;
