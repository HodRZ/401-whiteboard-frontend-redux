import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
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
        console.log(updated.data[1]);
        return updated.data[1];
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
                state.posts = state.filter(item => item.id !== action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id);
                console.log(posts);
                console.log(action.payload);
                state.posts = [...posts, ...action.payload];
            });
    }
});


export const selectAllPosts = (state) => state.posts.posts;

export default postsSlice.reducer;