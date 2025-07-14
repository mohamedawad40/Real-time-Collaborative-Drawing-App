import { configureStore } from '@reduxjs/toolkit'
import   authReducer from '../features/authSlice'
import   roomReducer from '../features/roomSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer
    },
})

export default store;