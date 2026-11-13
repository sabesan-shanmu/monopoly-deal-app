import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {loadTokens,saveTokens,notifyTokensRefreshed} from '../common/tokenStorage';

const axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_API_BASE_URL,
    timeout:process.env.REACT_APP_API_TIMEOUT,
    withCredentials:true,
    headers:{
      'Content-Type': 'application/json'
    }
  });


// Access tokens expire after an hour. When a call fails because of that, refresh the tokens once
// (shared by every request that failed at the same time) and retry the call with the new access token.
let refreshInFlight = null;

const refreshTokens = () => {
    if(!refreshInFlight){
        const tokens = loadTokens();
        if(!tokens)
            return Promise.reject(new Error("No stored tokens to refresh"));
        const {gamePassCode} = jwt_decode(tokens.refreshToken).identity;
        refreshInFlight = axiosInstance.post(`/api/games/${gamePassCode}/refresh/`, null, {
                headers: {'Authorization': `Bearer ${tokens.refreshToken}`},
                _isTokenRefresh: true
            })
            .then((response) => {
                saveTokens(response.data.accessToken, response.data.refreshToken);
                notifyTokensRefreshed(response.data);
                return response.data;
            })
            .finally(() => { refreshInFlight = null; });
    }
    return refreshInFlight;
};

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const config = error.config;
        const response = error.response;
        const isExpiredToken = response && response.status === 401 && response.data && response.data.name === 'ExpiredTokenError';
        if(!isExpiredToken || !config || config._retriedAfterRefresh || config._isTokenRefresh)
            return Promise.reject(error);

        return refreshTokens()
            .then((tokens) => axiosInstance({
                ...config,
                _retriedAfterRefresh: true,
                headers: {...config.headers, 'Authorization': `Bearer ${tokens.accessToken}`}
            }))
            .catch(() => Promise.reject(error));
    }
);


export default axiosInstance;
