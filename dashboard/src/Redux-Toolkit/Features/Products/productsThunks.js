import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (productData, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            for (const [key, value] of Object.entries(productData)) {
                if (key === 'productImage') {
                    value.forEach(file => formData.append('productImage', file)); // 👈 matches backend's multer.array
                } else if (Array.isArray(value)) {
                    formData.append(key, value.join(',')); // 👈 serialize array fields like tags
                } else {
                    formData.append(key, value); // 👈 scalar fields
                }
            }

            console.log('Before Sending TO Api:', formData)

            const res = await axiosClient.post('/product/add-product', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            console.log("Api Response:", res.data?.data)
            return res.data?.data;

        } catch (err) {
            const message = err?.response?.data?.message || 'Product creation failed.';
            return rejectWithValue(message);
        }
    }
);

export const fetchProduct = createAsyncThunk(
    'products/fetchProducts',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get('/product/get-all-products'); // Your actual endpoint
            return response.data?.data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, {rejectWithValue}) => {
        try {
            await axiosClient.delete(`/product/delete-product/${id}`);
            return id; // return the ID so slice can remove it
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to delete product");
        }
    }
);

export const fetchEditProduct = createAsyncThunk('products/fetchProduct',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get(`/product/get-edit-product/${id}`);
            return response.data?.data

        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || "Failed to Fetch product");
        }
    });


export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({id, updatedData}, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            Object.entries(updatedData).forEach(([key, value]) => {
                if (key === 'productImage' && Array.isArray(value)) {
                    value.forEach(file => formData.append('productImage', file));
                } else if (Array.isArray(value)) {
                    formData.append(key, value.join(','));
                } else {
                    formData.append(key, value);
                }
            });

            const response = await axiosClient.patch(`/product/update-product/${id}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update product");
        }
    }
);


