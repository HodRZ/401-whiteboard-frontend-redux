// import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';
import { selectAllPosts } from './postsSlice';

const PostsList = () => {

    const data = useSelector(selectAllPosts);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-4 font-mono gap-x-5 gap-y-8'>
            {
                data &&
                data.map(post => {
                    return <PostCard key={post.id} post={post} />;

                })}
        </div>
    );
};

export default PostsList;