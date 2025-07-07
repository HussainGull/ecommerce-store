import {createSlice} from "@reduxjs/toolkit";
import {fetchSliders} from "@/Redux-ToolKit/Features/Sliders/sliderThunk.js";

const initialState = {
    sliders: [],
    error: null,
    loading: null,
}


const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSliders.fulfilled, (state, action) => {
                state.sliders = action.payload;
            })
            .addCase(fetchSliders.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export default sliderSlice.reducer;
