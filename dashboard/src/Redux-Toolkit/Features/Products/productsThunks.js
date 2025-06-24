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

            const res = await axiosClient.post('/product/add-product', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });

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