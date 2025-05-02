import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL
const API = axios.create({
        baseURL,
        headers: {
                'Content-Type': 'application/json',
        },
});

export default API;


API.interceptors.request.use(
        (config) => {
                const token = sessionStorage.getItem('token');
                if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
        },
        (error) => {
                return Promise.reject(error);
        }
);


API.interceptors.response.use(
        (response) => {
                return response;
        },
        (error) => {
                if (error.response && error.response.status === 401) {
                        console.error('Unauthorized! Token expired?');
                }
                return Promise.reject(error);
        }
);

