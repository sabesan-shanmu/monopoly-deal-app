import axiosInstance from './axiosInstance'



export const gamesApi = {

    getAll:()=>{
        return axiosInstance.get('/api/games/');
    },
    post:(data)=>{
        return axiosInstance.post('/api/games/',data);
    }  
}