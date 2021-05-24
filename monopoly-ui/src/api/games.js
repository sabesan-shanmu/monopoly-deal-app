import {axiosInstance} from './axiosInstance'


export async function getGames() {
    return await axiosInstance.get('/api/games/');
};
  
export async function createGame(gameInput) {
    const data ={
        name:gameInput,
        gameMode:1,//Todo:eventually move to expanded mode
    }
    return await axiosInstance.post('/api/games/',data);
  };

export async function getGame(id) {
    return await axiosInstance.get(`/api/games/${id}/`);
};

export async function updateGame(id,data){
    return await axiosInstance.post(`/api/games/${id}/`,data);
};

export async function deleteGame(id) {
    return await axiosInstance.delete(`/api/games/${id}/`);
};







