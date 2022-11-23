import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState } from '../auth/authSlice';
import { isAuthorized } from '../auth/helpers';
import EditPost from './EditPost';
import { addComment, deletComment, deletePost, updatePost } from './postsSlice';

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);
    const { loggedUser } = useSelector(selectUserState);

    const newComment = (e) => {
        e.preventDefault();
        const data = {
            commentData: {
                content: e.target.comment.value,
                UserId: loggedUser.id,
            },
            token: loggedUser.access_token,
            id: e.target.id
        };
        dispatch(addComment(data));
        e.target.comment.value = '';
    };

    const removeCmnt = (e) => {
        e.preventDefault();
        const id = e.target.id;
        const data = {
            id,
            token: loggedUser.access_token,
            postId: post.id
        };
        dispatch(deletComment(data));
    };
    const editPost = (e) => {
        e.preventDefault();
        const data = {
            ...post,
            content: e.target.content.value,
            title: e.target.title.value,
            id: e.target.id,
            access_token: loggedUser.access_token
        };
        dispatch(updatePost(data));
        e.target.content.value = '';
        e.target.title.value = '';
        setShowEdit(false);
    };

    const remove = (e) => {
        e.preventDefault();
        const data = {
            id: post.id,
            access_token: loggedUser.access_token
        };
        dispatch(deletePost(data));
    };
    return (
        <>
            {showEdit &&
                <EditPost post={post} setShowEdit={setShowEdit} editPost={editPost} />
            }
            <div key={post?.id} className=' border shadow-xl flex flex-col border-slate-700 rounded-md h-fit '>
                <div className='flex justify-between'>
                    <h2 className='text-center text-2xl mx-3 my-5'>{post?.title}</h2>
                    <aside className='flex place-items-center'>
                        <h3 className='text-center bg-black text-white rounded-lg p-2 text-md mx-3 my-5'>{post.User?.username}</h3>
                        {
                            isAuthorized(post.UserId, loggedUser) &&
                            <>
                                <button onClick={() => { setShowEdit(true); }}>edit</button>
                                <form onSubmit={remove} id={post?.id} className='mt-3'>
                                    <button className='text-xl'>delete</button>
                                </form>
                            </>
                        }


                    </aside>
                </div>
                <p className='px-3 py-8 bg-black bg-opacity-10 break-all'>{post?.content}</p>
                <div className=' flex flex-col gap-3 my-2'>
                    {
                        post?.comments &&
                        post.comments.map((comment) => {
                            return <div key={comment.id} className='flex justify-between'>
                                <p className='px-5 border-y border-black break-all'>{comment.content}</p>
                                <div className='flex '>
                                    {
                                        (isAuthorized(comment.UserId, loggedUser)) &&
                                        <form id={comment.id}
                                            onSubmit={removeCmnt}
                                        >
                                            <button className='mx-2 text-sm border-y rounded-xl hover:bg-black hover:text-white border-black h-fit'  >delete</button>
                                        </form>
                                    }
                                    <p className='px-2 border-y bg-black text-white border-x rounded-md border-black h-fit'>{comment?.User?.username}</p>
                                </div>
                            </div>;
                        })
                    }
                </div>
                <form className='flex flex-col my-3 place-items-center text-center' id={post?.id} onSubmit={newComment}>
                    <input type="text" name='comment' placeholder='comment' className='w-full border-y border-black  my-4' />
                    <button className='border-b-2  border-black shadow-xl hover:bg-action hover:text-purple-200 rounded-xl w-32'>comment</button>
                </form>
            </div>
        </>
    );
};

export default PostCard;