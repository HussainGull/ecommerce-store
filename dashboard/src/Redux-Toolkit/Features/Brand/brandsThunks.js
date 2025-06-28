 import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";


// 👉 Create  Brands
export const createBrand = createAsyncThunk(
    'brands/createBrand',
    async (brandData, {rejectWithValue}) => {
        try {
            const response = await axiosClient.post('/brand/create-brand', brandData);  // ✅ Send JSON
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Brand creation failed");
        }
    }
);


// 👉 Fetch  Brands
export const fetchBrands = createAsyncThunk(
    'brands/fetchBrands',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get('/brand/get-all-brands');
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch brands");
        }
    }
);


// 👉 Delete Brand
export const deleteBrand = createAsyncThunk(
    'brands/deleteBrand',
    async (id, {rejectWithValue}) => {
        try {
            await axiosClient.delete('/brand/delete-brand', {data: {id}})
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch brands");
        }
    }
);


// 👉 Update Brand
export const updateBrand = createAsyncThunk(
    'brands/updateBrand',
    async ({id, name}, {rejectWithValue}) => {
        try {
            const response = await axiosClient.patch('/brand/update-brand', {id, name});
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update brand.");
        }
    }
);


// 👉 Fetch Single Brand
export const fetchBrandById = createAsyncThunk(
    'brands/fetchBrandById',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get(`/brand/get-brand/${id}`);
            return response.data.data; // returning the brand object
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch brand");
        }
    }
);


 // 👉 Fetch Products By Brand
 export const fetchProductsByBrand = createAsyncThunk(
     "products/fetchByBrand",
     async (id, { rejectWithValue }) => {
         try {
             const response = await axiosClient.get(`/brand/get-products-by-brand/${id}`);
             return response.data?.data;
         } catch (error) {
             return rejectWithValue(error.response.data.message || "Failed to fetch products by brand");
         }
     }
 );