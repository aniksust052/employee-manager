import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';

export default function LoginChk() {

    const [manager, setManager] = useState(true);
    const [lgin, setlgin] = useState(false);
    const handleEmployee = () => {
        setManager(false);
        setlgin(true);
    }
    const handleManager = () => {
        setManager(true);
        setlgin(true);
    }

    return (
        <>
            <div className='login-chk'>
                <div className={`employee + ${lgin && !manager ? ' login-bg' : ''}`} onClick={handleEmployee}>Login as Employee</div>
                <div className={`manager +  ${lgin && manager ? ' login-bg' : ''}`} onClick={handleManager} >Login as Manager</div>
            </div>
            {
                lgin && (
                    <LoginForm manager={manager} />
                )
            }
            
        </>
    );
}