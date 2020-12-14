import api from "./api";

const list = () => {              
    return api.get(`${api.url.people}/get`);
};

const get = (id) => api.get(`${api.url.people}/${id}`); 
const getOne = (id) => api.get(`${api.url.people}/get-by-id/${id}`); 
const add = data => api.post(`${api.url.people}/create`,data);
const update =(id,data)=> api.post(`${api.url.people}/update/${id}`,data);
const remove = (id) => api.delete(`${api.url.people}/${id}`);
export default {
    list : list,
    get :get,
    add: add,
    update:update,
    remove:remove,
    getOne: getOne
};