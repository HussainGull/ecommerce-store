// Create Categories
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";

export const createSlider = createAsyncThunk(
    'sliders/createSlider',
    async (sliderData, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            for (const [key, value] of Object.entries(sliderData)) {
                if (key === "sliderImage") {
                    // ✅ Handle single file (not array)
                    if (value) {
                        formData.append("sliderImage", value); // Single file, not forEach
                    }
                } else {
                    formData.append(key, value);
                }
            }

            const response = await axiosClient.post('/slider/create-slider', formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });

            return response.data?.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Slider creation failed"
            );
        }
    }
);


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


export const deleteSlider = createAsyncThunk(
    'slider/deleteSlider',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosClient.delete(`/slider/delete-slider/${id}`);
            return response.data?.data;   // Returning deleted slider id
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Failed to delete slider');
        }
    }
);


// ✅ Thunk to get a single slider by ID
export const getSingleSlider = createAsyncThunk(
    'slider/getSingleSlider',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get(`/slider/get-slider/${id}`);
            return response.data?.data;  // Assuming your ApiResponse sends data inside `data`
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Failed to fetch slider');
        }
    }
);


// ✅ Update Slider Thunk
export const updateSlider = createAsyncThunk(
    'slider/updateSlider',
    async ({id, updatedData}, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            for (const [key, value] of Object.entries(updatedData)) {
                if (key === "sliderImage") {
                    // Handle single file (not array)
                    if (value) {
                        formData.append("sliderImage", value); // Single file, not forEach
                    }
                } else {
                    formData.append(key, value);
                }
            }
            const response = await axiosClient.put(`/slider/update-slider/${id}`, formData,
                {headers: {'Content-Type': 'multipart/form-data'}});

            return response.data?.data;  // Return updated slider
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'Failed to update slider');
        }
    }
);