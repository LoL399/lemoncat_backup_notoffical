import api from "./api";

const list = () => {              
    return api.get(`${api.url.ussers}/get`);
};

const get = (id) => api.get(`${api.url.ussers}/${id}`); 
const add = data => api.post(`${api.url.ussers}/create`,data);
const update =(id,data)=> api.post(`${api.url.ussers}/update/${id}`,data);
const remove = (id) => api.delete(`${api.url.ussers}/${id}`);
export default {
    list : list,
    get :get,
    add: add,
    update:update,
    remove:remove
};