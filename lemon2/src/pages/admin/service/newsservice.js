import api from "./api";

const list = () => {              
    return api.get(`${api.url.news}/get`);
};

const get = (id) => api.get(`${api.url.news}/${id}`); 
const add = data => api.post(`${api.url.news}/create`,data);
const update =(id,data)=> api.post(`${api.url.news}/update/${id}`,data).catch(err => console.log(err));
const remove = (id) => api.delete(`${api.url.news}/${id}`);
export default {
    list : list,
    get :get,
    add: add,
    update:update,
    remove:remove
};