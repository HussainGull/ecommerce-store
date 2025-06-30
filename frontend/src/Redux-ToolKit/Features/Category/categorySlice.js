import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "@/Redux-ToolKit/Features/Category/categoryThunk.js";

const initialState = {
    categories: [],
    error: null,
    loading: null,
}


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export default categorySlice.reducer;
