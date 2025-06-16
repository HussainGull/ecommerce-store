import axios from "axios";

// ✅ Create Axios instance
const axiosClient = axios.create({
    baseURL: "/api/v1", // OR full URL like "http://localhost:5000/api/v1"
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false, // Set to true if you’re using cookies/session
});

// ✅ Automatically add JWT token to every request
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ❌ Handle errors globally (optional)
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized. Token may be expired.");
            // Redirect to login, or refresh token logic can go here
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
