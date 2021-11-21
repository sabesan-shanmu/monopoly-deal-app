import axiosInstance from './axiosInstance'



export const gameCardsApi = {

    get:(gameCardsUrl,accessToken)=>{
        return axiosInstance.get(gameCardsUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    },   
    patch:(gameCardsUrl,accessToken,data) =>{
        return axiosInstance.post(gameCardsUrl,data,{headers: {'Authorization': `Bearer ${accessToken}`}})
    }
}