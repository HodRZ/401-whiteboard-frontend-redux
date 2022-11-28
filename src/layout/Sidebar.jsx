import React from 'react';
import { useSelector } from 'react-redux';
import AuthButton from '../features/auth/AuthButton';
import { selectUserState } from '../features/auth/authSlice';
import './Sidebar.css';

function Sidebar() {
    const { isLoggedIn } = useSelector(selectUserState);
    return (
        <div className='flex fixed h-screen shadow-xl p-2 top-0 left-0 '>
            <div className='flex flex-col gap-3 font-mono'>
                <i>home</i>
                <i>about</i>
                <i>contact</i>
                <i>support</i>
                <i>Profile</i>
                {isLoggedIn &&
                    <AuthButton />
                }
                {/* {userState.isLoggedIn && <button className='border-b-2 border-white shadow-xl hover:bg-action hover:text-purple-200 rounded-xl my-3' onClick={logout}>logout</button>} */}
            </div>
        </div>
    );
}

export default Sidebar;