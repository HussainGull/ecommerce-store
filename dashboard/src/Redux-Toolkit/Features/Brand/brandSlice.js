import { createSlice } from '@reduxjs/toolkit';
import {
    createBrand,
    fetchBrands,
    deleteBrand,
    updateBrand,
    fetchBrandById,
} from '@/Redux-Toolkit/Features/Brand/brandsThunks.js';

const initialState = {
    brands: [],
    editBrand: null,
    loading: false,
    error: null,
};

const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.brands.push(action.payload);
            })
            .addCase(createBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.brands = action.payload;
            })

            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.brands = state.brands.filter(
                    (brand) => brand._id !== action.payload
                );
            })

            .addCase(updateBrand.fulfilled, (state, action) => {
                state.brands = state.brands.map((brand) =>
                    brand._id === action.payload._id ? action.payload : brand
                );
            })

            .addCase(fetchBrandById.fulfilled, (state, action) => {
                state.editBrand = action.payload;
            });
    },
});

export default brandsSlice.reducer;
