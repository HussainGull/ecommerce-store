import {configureStore} from '@reduxjs/toolkit'
import authReducer from '/src/Redux-Toolkit/Features/Users/Auth/authSlice.js'
import productsReducer from '/src/Redux-Toolkit/Features/Products/productsSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,

    },
})