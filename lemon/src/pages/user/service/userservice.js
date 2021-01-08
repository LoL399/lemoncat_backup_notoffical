import api from "./api";

const login = (data) => api.post(`${api.url.loginroute}`,data);

const registry  = (data) => api.post(`${api.url.registry}`,data)

const getInfo = () => api.get(`${api.url.baseURL}/getInfo`)

const updateByUser = ( data ) => api.post(`${api.url.baseURL}/userupdate`,data)

const updatePass = ( data ) => api.post(`${api.url.baseURL}/updatePass`,data)

const getUserInfo = (id) => api.get(`${api.url.baseURL}/userData/${id}`)

const recoverPass = (data) => api.post(`${api.url.baseURL}/reset-password`,data)

export default {
    // get :get,
    // add: add,
    // update:update,
    // getOne,
    getInfo,
    login,
    registry, updateByUser, updatePass, recoverPass,getUserInfo
};