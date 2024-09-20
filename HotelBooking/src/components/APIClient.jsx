
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // replace with your API URL
});

// Interceptor to add JWT token to every request
apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
