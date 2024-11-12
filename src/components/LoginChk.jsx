import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import $ from 'jquery';

export default function LoginChk() {

    const [manager, setManager] = useState(true);

    useEffect( () => {
        $(document).on('click', '.manager', () => {
            setManager(true);
            $('.login-form').css(
                {
                    display: 'flex',
                }
            );
            $('.manager').css(
                {
                    background: 'rgb(52, 73, 74)',
                }
            )
            $('.employee').css(
                {
                    background: 'transparent',
                }
            )
        });
        $(document).on('click', '.employee', () => {
            setManager(false);
            $('.login-form').css(
                {
                    display: 'flex',
                }
            );
            $('.employee').css(
                {
                    background: 'rgb(52, 73, 74)',
                }
            )
            $('.manager').css(
                {
                    background: 'transparent',
                }
            )
        });
    }, [] );

    return (
        <>
            <div className='login-chk'>
                <div className='employee'>Login as Employee</div>
                <div className='manager' >Login as Manager</div>
            </div>
            <LoginForm manager={manager} />
        </>
    );
}