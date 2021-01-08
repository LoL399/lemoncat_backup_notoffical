import api from "./api";



const login = data => api.post(`${api.url.loginroute}`,data);

export default {
    login
};