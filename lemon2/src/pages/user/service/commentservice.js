import api from "./api";

const getById = (id) => {              
    return api.post(`${api.url.comment}/get-by-id/${id}`);
};

const list =() => api.get(`${api.url.comment}/get`);
const add = data => api.post(`${api.url.comment}/create`,data);
const update  = (id) => api.post(`${api.url.comment}/update/${id}`);

export default {

    getById :getById,
    add: add,
    list: list,

    update:update,

};