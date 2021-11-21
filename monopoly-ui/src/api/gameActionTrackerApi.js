import axiosInstance from './axiosInstance'



export const gameActionTrackerApi = {

    get:(gameActionTrackerUrl,accessToken)=>{
        return axiosInstance.get(gameActionTrackerUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    },   
    post:(gameActionTrackerUrl,accessToken,data) =>{
        return axiosInstance.post(gameActionTrackerUrl,data,{headers: {'Authorization': `Bearer ${accessToken}`}})
    }
}