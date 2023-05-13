import { message } from 'antd';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8686/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    message.error('Lỗi không xác định');
    console.log(error);

    Promise.reject(error)
  },
);

axiosClient.interceptors.response.use((response) => {
  return response;
});

export default axiosClient;
