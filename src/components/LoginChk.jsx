import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';

export default function LoginChk( {
    manager,
    setManager
} ) {

    const [managerLogin, setManagerLogin] = useState(true);
    const [lgin, setlgin] = useState(false);
    const handleEmployee = () => {
        setManagerLogin(false);
        setlgin(true);
    }
    const handleManager = () => {
        setManagerLogin(true);
        setlgin(true);
    }

    return (
        <>
            <div className='login-chk'>
                <div className={`employee + ${lgin && !managerLogin ? ' login-bg' : ''}`} onClick={handleEmployee}>Login as Employee</div>
                <div className={`manager +  ${lgin && managerLogin ? ' login-bg' : ''}`} onClick={handleManager} >Login as Manager</div>
            </div>
            {
                lgin && (
                    <LoginForm 
                        managerLogin={managerLogin} 
                        manager={manager} 
                        setManager={setManager} 
                    />
                )
            }
            
        </>
    );
}