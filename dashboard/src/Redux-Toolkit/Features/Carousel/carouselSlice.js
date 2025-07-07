import {createSlice} from '@reduxjs/toolkit';
import {
    createCarouselThunk,
    deleteCarouselThunk,
    fetchCarouselsThunk, getSingleCarouselThunk, updateCarouselThunk
} from "@/Redux-Toolkit/Features/Carousel/carouselThunk.js";


const initialState = {
    carousels: [],
    editCarousel: null,
    loading: false,
    error: null,
};

const carouselSlice = createSlice({
    name: 'carousel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCarouselThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.carousels.push(action.payload);
            })
            .addCase(createCarouselThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCarouselsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.carousels = action.payload;
            })
            .addCase(fetchCarouselsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCarouselThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.carousels = state.carousels.filter((carousel) => carousel._id !== action.payload._id);
            })
            .addCase(deleteCarouselThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSingleCarouselThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.editCarousel = action.payload;
            })
            .addCase(getSingleCarouselThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCarouselThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.carousels = state.carousels.map((carousel) =>
                    carousel._id === action.payload._id ? action.payload : carousel
                );
            })
            .addCase(updateCarouselThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default carouselSlice.reducer;
