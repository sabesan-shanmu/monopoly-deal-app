import {apiClient} from './client'


export async const gamesService = {

  getGames:() => {
    return await apiClient.get('/api/games');
  },
  createGame:()=>{
    return await apiClient.post('/api/games');
  }
  
}

export async const gameService = {
  getGame:() => {
    return await apiClient.get('/api/games');
  },
  updateGame:()=>{
    return await apiClient.post('/api/games');
  },
  deleteGame:()=>{
    return await apiClient.delete('/api/games');
  }
}






