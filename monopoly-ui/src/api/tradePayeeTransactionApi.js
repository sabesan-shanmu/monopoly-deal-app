import axiosInstance from './axiosInstance'



export const tradePayeeTransactionApi = { 
    post:(tradePayeeTransactionUrl,accessToken,data) =>{
        return axiosInstance.post(tradePayeeTransactionUrl,data,{headers: {'Authorization': `Bearer ${accessToken}`}})
    }
}

export const singleTradePayeeTransactionApi = {
    put:(tradePayeeTransactionUrl,accessToken,data) =>{
        return axiosInstance.put(tradePayeeTransactionUrl,data,{headers: {'Authorization': `Bearer ${accessToken}`}})
    },
    get:(tradePayeeTransactionUrl,accessToken) =>{
        return axiosInstance.get(tradePayeeTransactionUrl,{headers: {'Authorization': `Bearer ${accessToken}`}})
    }
}