import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from '../../config/api';
import base64 from 'base-64';

const initialState = {
    loggedUser: null,
    isLoggedIn: false,
    isLoading: true
};

export const silentLogin = createAsyncThunk('user/silentLogin',
    async () => {
        const user = await axiosPrivate.post(`/silent`);
        return user.data;
    });

export const logout = createAsyncThunk('user/logout',
    async () => {
        await axiosPrivate.delete(`/silent`);
        return null;
    }
);

export const signIn = createAsyncThunk('user/signIn',
    async (data) => {
        const { email, password } = data;
        const encodedData = base64.encode(`${email}:${password}`);
        const res = await axiosPrivate.post(`/signin`, {}, { headers: { Authorization: `Basic ${encodedData}` } });
        return res.data;
    }
);

export const signUp = createAsyncThunk('user/signUp',
    async (data) => {
        const res = axiosPrivate.post(`/signUp`, data);
        return res.data;
    });


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(silentLogin.fulfilled, (state, action) => {
                state.loggedUser = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(silentLogin.rejected, (state, action) => {
                alert("Sorry your session ended!");
                state.isLoggedIn = false;
            })
            .addCase(logout.fulfilled, (state, action) => {
                const newState = {
                    ...initialState,
                    isLoading: false
                };
                state = newState;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loggedUser = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loggedUser = action.payload;
                state.isLoggedIn = true;
            });
    }
});


export const selectUserState = (state) => state.user;


export default userSlice.reducer;