import axiosInstance from './axiosInstance'



export const selectionMoveCheckApi = {

    get:(selectionMoveCheckUrl,accessToken)=>{
        return axiosInstance.get(selectionMoveCheckUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    }   
}