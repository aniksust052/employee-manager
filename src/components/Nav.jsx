import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiServices from '../services/apiServices';

function Nav() {
    const [manager, setManager] = useState(ApiServices.isManager());
    const [employee, setEmployee] = useState(ApiServices.isEmployee());
    const [authenticated, setAuthenticate] = useState(ApiServices.isAuthenticate());
    const navigate = useNavigate();

    const handleLogout = () => {
        const res = window.confirm("Are you sure to logout ?") ;
        if(res){
            ApiServices.logout()
            setAuthenticate(ApiServices.isAuthenticate());
            setManager(ApiServices.isManager());
            setEmployee(ApiServices.isEmployee());
            navigate('/login');
        }
    }

    return (
        <ul className='nav-bar'>
            {
                manager && (
                    <>
                        <li>
                            <NavLink to='/employees' >
                                Employees
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard'>
                                Dashboard
                            </NavLink>
                        </li>
                        
                    </>
                )
            }
            
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

            {
                !authenticated && (
                    <li>
                        <NavLink to='/login'>
                            Login
                        </NavLink>
                    </li>
                )
            }
            {
                authenticated && (
                    <li>
                        <NavLink to='#' className={'logout'} onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}>
                            Logout
                        </NavLink>
                    </li>
                )
            }
        </ul>
    );
}

export default Nav;
