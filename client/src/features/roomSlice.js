import { createSlice } from "@reduxjs/toolkit";
import { createRoom, fetchRooms, joinRoom } from "../app/hooks/room";

const initialState = {
    rooms: [],
    isLoading: false,
    isError: false,
    message: ''
}

const roomSlice = createSlice({
    name:"room",
    initialState,
    reducers: {
        resetRooms(state) {
            state.isLoading = false;
            state.isError   = false;
            state.message   = '';
        }
    },
    extraReducers: builder => {
        builder
            // fetchRooms
            .addCase(fetchRooms.pending, state => { state.isLoading = true })
            .addCase(fetchRooms.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.rooms     = payload;
            })
            .addCase(fetchRooms.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError   = true;
                state.message   = payload;
            })

            // joinRoom
            .addCase(joinRoom.pending, state => { state.isLoading = true })
            .addCase(joinRoom.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(joinRoom.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError   = true;
                state.message   = payload;
            })
            .addCase(createRoom.pending, (state) => { state.isLoading = true })
            .addCase(createRoom.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.rooms.push(payload);
            })
            .addCase(createRoom.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError   = true;
                state.message   = payload;
            })
    }
})
export default roomSlice.reducer;
export const roomAction = { fetchRooms, joinRoom, createRoom, resetRooms: roomSlice.actions.resetRooms };