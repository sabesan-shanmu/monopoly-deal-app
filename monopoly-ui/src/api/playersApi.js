import axiosInstance from './axiosInstance'


export const gamesApi = {
  register:(registerUrl,data)=>{
      return axiosInstance.post(registerUrl,data);
  },
  login:(loginUrl,data)=>{
      return axiosInstance.post(loginUrl,data);
  }  
}
  






