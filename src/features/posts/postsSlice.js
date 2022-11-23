import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../config/api';


const initialState = {
    posts: []
};

export const getAllPosts = createAsyncThunk('posts/getAllPosts',
    async () => {
        const postsData = await axios.get(`/postAll`);
        return postsData.data;

    }
);

export const addPost = createAsyncThunk('posts/addPost',
    async (data) => {
        const { post, token } = data;
        const newPost = await axios.post(`/post`, post, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return newPost.data;
    }
);

export const updatePost = createAsyncThunk(
    'posts/editPost',
    async (data) => {
        const { id, title, content, access_token } = data;

        const updated = await axios.put(`/post/${id}`,
            {
                title,
                content
            },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        );
        updated.data[1][0].comments = data.comments;
        updated.data[1][0].User = data.User;
        return updated.data[1][0];
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (data) => {
        const { id, access_token } = data;
        await axios.delete(`/post/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return id;
    }
);

export const getPost = createAsyncThunk(
    'posts/getPost',
    async (data) => {
        const { id, access_token } = data;
        const post = await axios.get(`/post/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return post.data;
    }
);


export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(item => item.id !== action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const { id } = action.payload;
                const posts = state.posts.map(post => {
                    if (post.id === id) {
                        post = action.payload;
                    }
                    return post;
                });
                state.posts = posts;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            });

    }
});


export const selectAllPosts = (state) => state.posts.posts;

export default postsSlice.reducer;