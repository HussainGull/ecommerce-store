import {createSlice} from '@reduxjs/toolkit';
import {
    createCategory,
    fetchCategories,
    deleteCategory,
    updateCategory,
    fetchCategoryById, fetchProductsByCategory,
} from './categoriesThunks.js';

const initialState = {
    productsByCategory: [],
    categories: [],
    editCategory: null,
    loading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })

            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                    (cat) => cat._id !== action.payload
                );
            })

            .addCase(updateCategory.fulfilled, (state, action) => {
                state.categories = state.categories.map((cat) =>
                    cat._id === action.payload._id ? action.payload : cat
                );
            })

            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.editCategory = action.payload;
            })

            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.productsByCategory = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default categoriesSlice.reducer;
