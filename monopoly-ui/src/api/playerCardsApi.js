import axiosInstance from './axiosInstance'



export const playerCardsApi = {

    get:(playerCardsUrl,accessToken)=>{
        return axiosInstance.get(playerCardsUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    }   
}