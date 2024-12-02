import React, { useRef, useState } from "react";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import ApiServices from "../services/apiServices";

export default function LoginForm ( {managerLogin, manager, setManager} ) {
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        const newData = {
            email: formData.get("email"),
            password: managerLogin ? formData.get("password") : formData.get("reg"),
        };

        if(!newData.email || !newData.password ){
            setLoginStatus("Email and password/registration are required.");
            return;
        }
        try{
            const loginResponse = await ApiServices.login(newData);
            if (!loginResponse.token) {
                
                setLoginStatus(loginResponse.message || "Invalid credentials.");
                console.log("success");
                return;
            }
           
            localStorage.setItem("token", loginResponse.token);
            localStorage.setItem("role", loginResponse.role);
            navigate('/employees');
            setLoginStatus("Login Successfull");
            setManager(true);
            formRef.current.reset();
            return;
            
        } catch (err) {
            setLoginStatus("Bad Credential");
        }
    }

    return(
        <div className="login-form">
            <form action="" id="login" ref={formRef} onSubmit={handleLogin}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="email">Email :</label>
                            </td>
                            <td>
                                <input type="text" id="email" name="email" placeholder="email" required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor={managerLogin ? "password" : "reg"}>
                                    {managerLogin ? 'Password : ' : 'Registration Number :'}
                                </label>
                            </td>
                            <td>
                                {
                                    managerLogin && (
                                        <input type="password" id="password" name="password" placeholder="password" required />
                                    )
                                }
                                {
                                    !managerLogin && (
                                        <input type="number" id="reg" name="reg" placeholder="reg. provided by manager"  required />
                                    )
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button 
                                    type="submit" 
                                >
                                    Login
                                </button>
                            </td>
                            <td>
                                {
                                    managerLogin && (
                                        <NavLink className={'new-user'} to={'/register'} >New manager!!</NavLink>
                                    )
                                }
                            </td>
                        </tr>
                        {
                            loginStatus && (
                                <>
                                    <tr>
                                        <td colSpan={'2'}>
                                        {loginStatus}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><NavLink to={'/home'} className={'new-user'} colSpan={'2'} >Go Home Page</NavLink></td>
                                    </tr>
                                </>
                            )
                        }
                    </tbody>
                </table>
            </form>
        </div>
    );
}