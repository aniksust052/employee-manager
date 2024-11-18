import React, { useRef, useState } from 'react';
import ApiServices from '../services/apiServices';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const formRef = useRef();
    const navigate = useNavigate();
    const [signupStatus, setSignupStatus] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        const newData = {
            email: formData.get("email"),
            password: formData.get("password"),
            role : 'MANAGER',
        };

        if(!newData.email || !newData.password ){
            setSignupStatus("Email and password are required.");
            return;
        }
        try{
            const signupResponse = await ApiServices.signUP(newData);
            setSignupStatus('');

            navigate('/login');
        } catch (err) {
            setSignupStatus('This email already exist')
            console.log("error login : ", err);
        }
    }

    return (
        <div className="login-form">
            <form action="" id="signup" ref={formRef} onSubmit={handleSignup}>
                
                <table>
                    <thead>
                        <tr>
                            <th className='signup-title' colSpan={'2'} >Signup is only for Manager</th>
                        </tr>
                    </thead>
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
                                <label htmlFor="password">Password :</label>
                            </td>
                            <td>
                                
                                <input type="password" id="password" name="password" placeholder="password" required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">Signup</button>
                            </td>
                        </tr>
                        {
                            signupStatus && (
                                <tr><td colSpan={'2'}>{signupStatus}</td></tr>
                            )
                        }
                    </tbody>
                </table>
            </form>
        </div>
    );
}
