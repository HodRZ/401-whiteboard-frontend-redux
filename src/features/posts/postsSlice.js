import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from '../../config/api';


const initialState = {
    posts: []
};

export const addComment = createAsyncThunk('posts/addComment',
    async (data) => {
        const { id, commentData, token } = data;
        console.log(commentData);
        const newComment = await axios.post(`/post/${id}/comment`, commentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const res = {
            newCmnt: newComment.data,
            id
        };
        return res;
    }
);

export const deletComment = createAsyncThunk('posts/deletComment',
    async (data) => {
        const { id, token, postId } = data;
        await axios.delete(`/comment/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const res = {
            id,
            postId
        };
        return res;
    }
);

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
                state.posts = [...posts];
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const post = state.posts.find(pst => pst.id === Number(action.payload.id));
                if (post) {
                    post.comments.push(action.payload.newCmnt);
                }
            })
            .addCase(deletComment.fulfilled, (state, action) => {
                const post = state.posts.find(pst => pst.id === Number(action.payload.postId));
                console.log(current(post));
                if (post) {
                    post.comments.filter(comment => {
                        const result = comment.id !== Number(action.payload.id);
                        console.log(result);
                        return result;
                    });
                }
            });

    }
});


export const selectAllPosts = (state) => state.posts.posts;

export default postsSlice.reducer;