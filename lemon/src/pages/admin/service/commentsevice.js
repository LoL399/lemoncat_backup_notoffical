import api from "./api";

const list = () => {              
    return api.get(`${api.url.comment}/get`);
};

const get = (id) => api.get(`${api.url.comment}/${id}`); 

// const getOne = (id) => api.get(`${api.url.comment}/get-by-id/${id}`); 
const add = data => api.post(`${api.url.comment}/create`,data);
const update =(id,data)=> api.post(`${api.url.comment}/update/${id}`,data).then(res => res.data).catch(err => console.error("Wasn't able to update property.", err));
const remove = (id) => api.delete(`${api.url.comment}/${id}`);
export default {
    list : list,
    get :get,
    add: add,
    update:update,
    remove:remove,
    // getOne: getOne,
};