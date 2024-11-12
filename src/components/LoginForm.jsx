import React from "react";
import { NavLink } from 'react-router-dom';

export default function LoginForm ( {manager} ) {
    return(
        <div className="login-form">
            <form>
                <table>
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
                            {
                                manager && (
                                    <label htmlFor="password">Password :</label>
                                )
                            }
                            {
                                !manager && (
                                    <label htmlFor="reg">Registration Number :</label>
                                )
                            }
                            
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
                            <button>Login</button>
                        </td>
                        <td>
                            {
                                manager && (
                                    <NavLink className={'new-user'} to={'/register'} >New user?</NavLink>
                                )
                            }
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}