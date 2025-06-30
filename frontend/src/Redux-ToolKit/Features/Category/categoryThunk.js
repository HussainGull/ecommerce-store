import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";

export const fetchCategories = createAsyncThunk('category/fetchCategories', async (_, rejectWithValue) => {
    try {
        const response = await axiosClient.get('/category/get-all-categories')
        return response.data?.data;

    } catch (error) {
        return rejectWithValue(error)
    }
})