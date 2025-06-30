import {createSlice} from '@reduxjs/toolkit';
import {
    createSlider,
    deleteSlider,
    fetchSliders,
    getSingleSlider, updateSlider
} from "@/Redux-Toolkit/Features/Slider/sliderThunks.js";

const initialState = {
    sliders: [],
    editSlider: null,
    loading: false,
    error: null,
};

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSlider.fulfilled, (state, action) => {
                state.loading = false;
                state.sliders.push(action.payload);
            })
            .addCase(createSlider.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSliders.fulfilled, (state, action) => {
                state.loading = false;
                state.sliders = action.payload;  // ✅ Correct
            })
            .addCase(fetchSliders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteSlider.fulfilled, (state, action) => {
                state.loading = false;
                state.sliders = state.sliders.filter((slider) => slider._id !== action.payload.id
                );
            })
            .addCase(deleteSlider.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSingleSlider.fulfilled, (state, action) => {
                state.loading = false;
                state.editSlider = action.payload;  // ✅ Stores slider data for editing form
            })
            .addCase(getSingleSlider.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateSlider.fulfilled, (state, action) => {
                state.loading = false;
                state.sliders = state.sliders.map((slider) => slider._id === action.payload._id ? action.payload : slider
                );
            })
            .addCase(updateSlider.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default sliderSlice.reducer;
