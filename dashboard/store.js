import { configureStore } from '@reduxjs/toolkit'
import authReducer from '/src/Features/Users/Auth/authSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})