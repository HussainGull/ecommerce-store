import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";


// Create Categories
export const createCategory = createAsyncThunk(
    '/categories/createCategory',
    async (categoryData, {rejectWithValue}) => {
        try {
            const response = await axiosClient.post('/category/create-category', categoryData);  // ✅ Send JSON
            return response.data?.data;  // ✅ Return actual category data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Category creation failed");
        }
    }
);


// Delete Categories
export const deleteCategory = createAsyncThunk(
    '/categories/deleteCategory',
    async (id, {rejectWithValue}) => {
        try {
            await axiosClient.delete('/category/delete-category', {data: {id}})
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error While Deleting Category");
        }
    }
);


// Update Categories
export const updateCategory = createAsyncThunk(
    '/categories/updateCategory',
    async ({id, name}, {rejectWithValue}) => {
        try {
            const response = await axiosClient.patch('/category/update-category', {id, name});
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update category.");
        }
    }
);


// 👉 Fetch Single Category
export const fetchCategoryById = createAsyncThunk(
    '/categories/fetchCategoryById',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get(`/category/get-category/${id}`);
            return response.data.data; // returning the category object
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch category");
        }
    }
);

// Fetch Categories
export const fetchCategories = createAsyncThunk(
    '/categories/fetchCategories',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get('/category/get-all-categories');
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
        }
    }
);