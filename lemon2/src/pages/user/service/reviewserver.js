import api from "./api";

const list = () => {              
    return api.get(`${api.url.reviews}/get`);
};

const get = (id) => api.get(`${api.url.reviews}/${id}`); 
const add = data => api.post(`${api.url.reviews}/create`,data);
const update =(id,data) => api.post(`${api.url.reviews}/update/${id}`,data);
const getByMovie = (id) => api.get(`${api.url.reviews}/get-by-movie/${id}`);
const remove = (id) => api.delete(`${api.url.reviews}/${id}`);
export default {
    list : list,
    get :get,
    add: add,
    update:update,
    remove:remove,
    getByMovie: getByMovie,
};