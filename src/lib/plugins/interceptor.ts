import axios from 'axios';
import type { AxiosInstance } from '@types/axios';
const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://www.omdbapi.com/', // Replace with your API base URL
    timeout: 10000, // Optional: Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;