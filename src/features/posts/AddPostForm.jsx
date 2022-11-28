import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "../auth/authSlice";
import { addPost } from "./postsSlice";

function AddPostForm() {
    const { loggedUser } = useSelector(selectUserState);
    const dispatch = useDispatch();

    const createPost = async (e) => {
        e.preventDefault();
        const post = {
            content: e.target.content.value,
            title: e.target.title.value,
            UserId: loggedUser.id
        };
        const data = {
            post,
            token: loggedUser.access_token
        };
        dispatch(addPost(data));
    };
    return (
        <div className='md:flex place-content-center '>
            <div className='mx-5 my-8  shadow-md p-6 md:w-[75%] '>
                <form className='flex flex-col gap-2 text-center font-mono ' onSubmit={createPost}>
                    <div className='flex justify-between md:gap-3 '>
                        <label className='w-[10%]'>title</label>
                        <input type="text" placeholder='goes here' name='title' className='border md:w-[93%] border-action rounded-lg ' />
                    </div>
                    <label>give it your best</label>
                    <textarea type="text" placeholder='whats on your mind' name='content' className='border border-action rounded-lg ' />
                    <div className='flex justify-center gap-16 '>
                        <button className='border-b-2 hover:bg-purple-900 hover:text-action w-[20%] shadow-lg rounded-lg'>post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPostForm;