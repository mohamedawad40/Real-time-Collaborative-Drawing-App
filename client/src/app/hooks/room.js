import { createAsyncThunk } from "@reduxjs/toolkit";
import { roomService } from "../../service/roomService";

export const fetchRooms = createAsyncThunk('/rooms', async (_, thunkAPI) => {
    try {
        const allRoomList = await roomService.getPublicRoomList();
        return allRoomList;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const joinRoom = createAsyncThunk('/room/join', async (roomId, thunkAPI) => {
    try {
        return await roomService.joinRoom(roomId);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
})

export const createRoom = createAsyncThunk('/rooms/create', async (roomData, thunkAPI) => {
    try {
        console.log('roomData',roomData)
        return await roomService.createRoom(roomData);
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
})


