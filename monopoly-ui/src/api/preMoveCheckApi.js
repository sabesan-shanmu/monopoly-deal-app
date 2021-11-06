import axiosInstance from './axiosInstance'



export const preMoveCheckApi = {

    get:(preMoveCheckUrl,accessToken)=>{
        return axiosInstance.get(preMoveCheckUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    }   
}