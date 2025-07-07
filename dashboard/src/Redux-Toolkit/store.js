import {configureStore} from '@reduxjs/toolkit'
import authReducer from '/src/Redux-Toolkit/Features/Users/Auth/authSlice.js'
import productsReducer from '/src/Redux-Toolkit/Features/Products/productsSlice.js'
import categoriesReducer from '/src/Redux-Toolkit/Features/Category/categorySlice.js'
import brandsReducer from '/src/Redux-Toolkit/Features/Brand/brandSlice.js'
import sliderReducer from '/src/Redux-Toolkit/Features/Slider/sliderSlice.js'
import carouselReducer from '/src/Redux-Toolkit/Features/Carousel/carouselSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        categories: categoriesReducer,
        brands: brandsReducer,
        sliders: sliderReducer,
        carousels:carouselReducer
    },
})