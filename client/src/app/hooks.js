import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../service/authService';


export const register = createAsyncThunk('/user/register', async (userData, { rejectWithValue }) => {
    try {
        const user = await authService.register(userData);
        console.log('user:', user);
        return user
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || 'Registration failed';
        return rejectWithValue(message);
    }
})

export const login = createAsyncThunk('/user/login', async (userData, { rejectWithValue }) => {
    try {
        const user = await authService.login(userData);
        console.log('user:', user);
        return user
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || 'Login failed';
        return rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('/user/logout', async () => {
    await authService.logout();
});
