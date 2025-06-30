// src/utils/axiosClient.js
import {showToast} from "@/Elements/Toaster/Toaster.jsx";
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api/v1", // or full backend URL like "http://localhost:5000/api/v1"
    withCredentials: true, // 🔐 Required to send cookies with requests
    headers: {
        "Content-Type": "application/json",
    },
});


axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url;

        // Only redirect if NOT login request
        if (status === 401 && !requestUrl.includes("/login")) {
            showToast({
                title: "🔐 Session expired",
                description: "Please log in again.",
            });

            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);



axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default axiosClient;
