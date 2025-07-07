import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, rejectWithValue) => {

    try {
        const response = await axiosClient.get('/product/get-all-products');
        return response.data?.data;

    } catch (e) {
        return rejectWithValue(e);
    }

});


export const fetchShuffledProducts = createAsyncThunk(
    "product/fetchShuffledProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get("/product/get-shuffled-products");
            return response.data?.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to load shuffled products");
        }
    }
);