import axiosInstance from './axiosInstance'



export const inPlayMoveCheckApi = {

    get:(inPlayMoveCheckUrl,accessToken)=>{
        return axiosInstance.get(inPlayMoveCheckUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    }   
}