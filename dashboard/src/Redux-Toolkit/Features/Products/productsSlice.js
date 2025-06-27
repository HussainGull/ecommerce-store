// features/products/productsSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {
    addProduct,
    deleteProduct, fetchEditProduct,
    fetchProduct,
    updateProduct
} from './productsThunks';


const initialState = {
    list: [],
    editProductList: null,
    updatedProduct: null,
    loading: false,
    error: null,
};


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // When creation is successful
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload); // Add new product to list
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'Something went wrong';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
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
            .addCase(fetchEditProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.editProductList = action.payload;  // ✅ Store as object not array
            })
            .addCase(fetchEditProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.updatedProduct = action.payload;  // Optional: store updated product
                console.log("Slice Data:", state.updatedProduct)
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

    }

})

export default productsSlice.reducer;
