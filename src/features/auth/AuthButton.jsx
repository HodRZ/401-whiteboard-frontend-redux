import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './authSlice';

function AuthButton() {
    const disptach = useDispatch();
    const signout = () => {
        disptach(logout());
    };
    return (

        <button className='border-b-2 border-white shadow-xl hover:bg-action hover:text-purple-200 rounded-xl my-3'
            onClick={signout}>logout
        </button>

    );
}

export default AuthButton;