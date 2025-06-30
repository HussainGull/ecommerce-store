import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from "@/Redux-ToolKit/Features/Category/categorySlice.js";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
    },
})