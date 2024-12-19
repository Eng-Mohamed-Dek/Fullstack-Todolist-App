import axios from 'axios';
import { BASE_URL } from './constant';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token')

        if (accessToken) {
            config.headers.Authorization = `Barear ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

  
export default axiosInstance;

// https://medium.com/@essaadihamza4/how-to-create-an-axios-instance-0ceb5b4080ac