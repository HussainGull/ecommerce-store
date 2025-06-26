// features/products/productsSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {
    addProduct, createBrand,
    createCategory,
    deleteProduct, fetchBrands, fetchCategories,
    fetchEditProduct,
    fetchProduct,
    updateProduct
} from './productsThunks';


const initialState = {
    editProductList: null,
    updatedProduct: null,
    list: [],
    categories: [],
    brands: [],
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
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
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
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.categories = action.payload
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(createBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.brands = action.payload
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.brands = action.payload;
            })


    }

})

export default productsSlice.reducer;
