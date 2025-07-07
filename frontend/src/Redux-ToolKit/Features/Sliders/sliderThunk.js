import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchSliders = createAsyncThunk(
    'sliders/fetchSliders',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get('/slider/fetch-sliders');
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch sliders"
            );
        }
    });
