import axiosInstance from './axiosInstance'



export const gameMoveApi = {

    get:(gameMoveUrl,accessToken)=>{
        return axiosInstance.get(gameMoveUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    },
    patch:(gameMoveUrl,accessToken,data)=>{
        return axiosInstance.patch(gameMoveUrl,data,{headers: {'Authorization': `Bearer ${accessToken}`}});
    }    
}