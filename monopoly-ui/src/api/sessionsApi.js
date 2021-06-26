import axiosInstance from './axiosInstance'



export const sessionsApi = {

    get:()=>{ return axiosInstance.get('/api/sessions/')},

    clear:()=>{return axiosInstance.get('/api/logout/')}

};

