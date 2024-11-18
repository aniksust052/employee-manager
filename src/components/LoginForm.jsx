import React, { useRef, useState } from "react";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import ApiServices from "../services/apiServices";

export default function LoginForm ( {manager} ) {
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        const newData = {
            email: formData.get("email"),
            password: manager ? formData.get("password") : formData.get("reg"),
        };

        if(!newData.email || !newData.password ){
            setLoginStatus("Email and password/registration are required.");
            return;
        }
        console.log(newData);
        try{
            const loginResponse = await ApiServices.login(newData);

            if (!loginResponse.token) {
                setLoginStatus(loginResponse.message || "Invalid credentials.");
                return;
            }
           
            localStorage.setItem("token", loginResponse.token);
            localStorage.setItem("role", loginResponse.role);
            setLoginStatus("");
            navigate('/employees');
        } catch (err) {
            setLoginStatus("Bad Credential");
            console.log("error login : ", err);
        }
    }
    // loginStatus === '#'? navigate('/employees') : '';

    return(
        <div className="login-form">
            <form action="" id="login" ref={formRef}>
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
                                <label htmlFor={manager ? "password" : "reg"}>
                                    {manager ? 'Password : ' : 'Registration Number :'}
                                </label>
                            </td>
                            <td>
                                {
                                    manager && (
                                        <input type="password" id="password" name="password" placeholder="password" required />
                                    )
                                }
                                {
                                    !manager && (
                                        <input type="number" id="reg" name="reg" placeholder="reg. provided by manager"  required />
                                    )
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit" onClick={(e) => handleLogin(e)}>Login</button>
                            </td>
                            <td>
                                {
                                    manager && (
                                        <NavLink className={'new-user'} to={'/register'} >New manager!!</NavLink>
                                    )
                                }
                            </td>
                        </tr>
                        {
                            loginStatus && (
                                <tr>
                                    <td colSpan={'2'}>
                                    {loginStatus}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </form>
        </div>
    );
}