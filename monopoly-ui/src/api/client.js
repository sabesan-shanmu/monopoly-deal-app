import 'axios'
import axios from 'axios';

export const apiClient = axios.create({
    baseUrl:process.env.REACT_APP_API_BASE_URL,
    timeout:process.env.REACT_APP_API_TIMEOUT
  });

