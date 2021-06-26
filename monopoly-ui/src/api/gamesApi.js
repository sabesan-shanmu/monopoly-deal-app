import axiosInstance from './axiosInstance'



export const gamesApi = {

    getAll:()=>{
        return axiosInstance.get('/api/games/');
    },
    get:(gamePassCode)=>{
        return axiosInstance.get(`/api/games/${gamePassCode}/`);
    },  
    post:(data)=>{
        return axiosInstance.post('/api/games/',data);
    }  
}