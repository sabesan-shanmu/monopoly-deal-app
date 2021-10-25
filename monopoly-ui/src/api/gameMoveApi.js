import axiosInstance from './axiosInstance'



export const gameMoveApi = {

    get:(gameMoveUrl,accessToken)=>{
        return axiosInstance.get(gameMoveUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    }  
}