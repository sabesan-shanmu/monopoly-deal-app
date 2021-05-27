import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_API_BASE_URL,
    timeout:process.env.REACT_APP_API_TIMEOUT,
    headers:{
      'Content-Type': 'application/json'
    }    
  });
