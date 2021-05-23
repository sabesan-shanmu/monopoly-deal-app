import {axiosInstance} from '../../api/axiosInstance'


export async function getGames() {
    return await axiosInstance.get('/api/games');
};
  
export async function createGame() {
    return await axiosInstance.post('/api/games');
  };

export async function getGame() {
    return await axiosInstance.get('/api/games');
};

export async function updateGame() {
    return await axiosInstance.post('/api/games');
};

export async function deleteGame() {
    return await axiosInstance.delete('/api/games');
};







