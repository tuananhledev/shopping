import axios from 'axios';

const axiosInstance = axios.create({
   // baseURL: 'https://localhost:7284/api',
   baseURL: 'http://ghostrider5026-001-site1.anytempurl.com/api/',
   // baseURL: 'https://ghostrider5024.bsite.net/api',
   headers: {
      'Content-Type': 'application/json',
   },
});

export default axiosInstance;
