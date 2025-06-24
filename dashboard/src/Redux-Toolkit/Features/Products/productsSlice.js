// features/products/productsSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {addProduct} from './productsThunks';


const initialState = {
    list: [],
    loading: false,
    error: null,
}


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // When product creation starts
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // When creation is successful
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload); // Add new product to list
            })

            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'Something went wrong';
            })
    }

})

export default productsSlice.reducer;
