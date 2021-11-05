import axiosInstance from './axiosInstance'



export const drawCardsApi = {

    get:(drawCardsUrl,accessToken)=>{
        return axiosInstance.get(drawCardsUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    }   
}