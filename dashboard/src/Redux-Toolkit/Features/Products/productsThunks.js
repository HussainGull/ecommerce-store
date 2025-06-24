import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";
import {showToast} from "@/Elements/Toaster/Toaster.jsx";

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
            const status = err.response?.status;
            const message = err?.response?.data?.message || 'Product creation failed.';
            if (status === 408) {
                showToast({title: "Product Image are Required", description: "Product Images are Required"})
            } else {
                showToast({title: "All Fields Are Required", description: "Fill all the fields."})

            }
            return rejectWithValue(message);
        }
    }
);
