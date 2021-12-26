import axiosInstance from './axiosInstance'



export const propertyMoveCheckApi = {

    get:(propertyMoveCheckUrl,accessToken)=>{
        return axiosInstance.get(propertyMoveCheckUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    }   
}