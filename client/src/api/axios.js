import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
})

// 🔐 Interceptor: Attach token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        // console.log('token', token);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
            console.log('config', config)
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        if (status === 401) {
            console.warn("Unauthorized. Redirecting to login...");
        }
        return Promise.reject(error);
    }
);
export default API;
