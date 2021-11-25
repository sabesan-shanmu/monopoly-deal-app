import axiosInstance from './axiosInstance'



export const transactionTrackerApi = {

    get:(transactionTrackerUrl,accessToken)=>{
        return axiosInstance.get(transactionTrackerUrl,{headers: {'Authorization': `Bearer ${accessToken}`}});
    },   
    post:(transactionTrackerUrl,accessToken,data) =>{
        return axiosInstance.post(transactionTrackerUrl,data,{headers: {'Authorization': `Bearer ${accessToken}`}})
    }
}

export const singleTransactionTrackerApi = {
    patch:(transactionTrackerUrl,accessToken,data) =>{
        return axiosInstance.patch(transactionTrackerUrl,data,{headers: {'Authorization': `Bearer ${accessToken}`}})
    }
}