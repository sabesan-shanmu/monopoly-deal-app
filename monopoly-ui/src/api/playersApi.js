import axiosInstance from './axiosInstance'


export const playersApi = {
  register:(registerUrl,data)=>{
      return axiosInstance.post(registerUrl,data);
  },
  login:(loginUrl,data)=>{
      return axiosInstance.post(loginUrl,data);
  },
  vote:(voteUrl,accessToken,data)=>{
    return axiosInstance.post(voteUrl,data,{headers: {'Authorization': `Bearer ${accessToken}`}});
  }  
}
  






