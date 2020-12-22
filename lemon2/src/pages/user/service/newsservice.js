import api from "./api"

const list = page => {              
    return api.get(`${api.url.news}/getActive/${page}`);
};
const listHot = () => {              
    return api.get(`${api.url.news}/getHot`);
};

const listNew= () => {              
    return api.get(`${api.url.news}/getNewest`);
};
const getOne = (id) => api.get(`${api.url.news}/get-by-id/${id}`); 



const searchFor = (search) => api.get(`${api.url.news}/search/${search}`)
export default {
    list : list,
    listHot: listHot,
    listNew: listNew,
    getOne: getOne,
    searchFor: searchFor
};