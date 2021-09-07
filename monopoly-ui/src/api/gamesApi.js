import axiosInstance from './axiosInstance'



export const gamesApi = {

    getAll:()=>{
        return axiosInstance.get('/api/games/');
    },
    get:(gamePassCode)=>{
        return axiosInstance.get(`/api/games/${gamePassCode}/`);
    },  
    postAll:(data)=>{
        return axiosInstance.post('/api/games/',data);
    },
    post:(gameUrl,accessToken,data)=>{
        return axiosInstance.post(gameUrl,data,{headers: {'Authorization': `Bearer ${accessToken}`}});
    }   
}