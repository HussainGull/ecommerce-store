// features/products/productsSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {addProduct, deleteProduct, fetchEditProduct, fetchProduct} from './productsThunks';


const initialState = {
    editProductList: null,
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

            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.list = state.list.filter(product => product._id !== deletedId)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchEditProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEditProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.editProductList = action.payload;  // ✅ Store as object not array
            })
            .addCase(fetchEditProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });


    }

})

export default productsSlice.reducer;
