import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosClient from "@/Elements/AxiosClient/AxiosClient.js";

export const createCarouselThunk = createAsyncThunk(
    "carousel/createCarousel",
    async (carouselData, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(carouselData)) {
                if (key === "carouselImage") {
                    if (value) formData.append("carouselImage", value);
                } else {
                    formData.append(key, value);
                }
            }
            console.log("Form Data:", formData);
            const response = await axiosClient.post("/carousel/create-carousel", formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Carousel creation failed");
        }
    }
);

export const fetchCarouselsThunk = createAsyncThunk(
    "carousel/fetchCarousels",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get("/carousel/get-all-carousels");
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch carousels");
        }
    }
);

export const deleteCarouselThunk = createAsyncThunk(
    "carousel/deleteCarousel",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosClient.delete(`/carousel/delete-carousel/${id}`);
            console.log(response.data?.data)
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete carousel");
        }
    }
);

export const getSingleCarouselThunk = createAsyncThunk(
    "carousel/getSingleCarousel",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosClient.get(`/carousel/get-carousel/${id}`);
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch carousel");
        }
    }
);

export const updateCarouselThunk = createAsyncThunk(
    "carousel/updateCarousel",
    async ({id, updatedData}, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(updatedData)) {
                if (key === "carouselImage") {
                    if (value) formData.append("carouselImage", value);
                } else {
                    formData.append(key, value);
                }
            }
            const response = await axiosClient.put(`/carousel/update-carousel/${id}`, formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            return response.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update carousel");
        }
    }
);