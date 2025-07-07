import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts, fetchShuffledProducts} from "@/Redux-ToolKit/Features/Products/productsThunks.js";

const initialState = {
    products: [],
    shuffledProducts: [],
    error: null,
    loading: null,
}


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
                state.error = null;
            }).addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(fetchShuffledProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.shuffledProducts = action.payload;
            })
            .addCase(fetchShuffledProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default productSlice.reducer;
