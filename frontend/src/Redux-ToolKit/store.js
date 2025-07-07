import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from "@/Redux-ToolKit/Features/Category/categorySlice.js";
import sliderReducer from "@/Redux-ToolKit/Features/Sliders/sliderSlice.js";
import productReducer from "@/Redux-ToolKit/Features/Products/productsSlice.js";



export const store = configureStore({
    reducer: {
        category: categoryReducer,
        slider: sliderReducer,
        product:productReducer
    },
})