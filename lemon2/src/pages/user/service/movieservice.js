import api from "./api"

const list = page => {              
    return api.get(`${api.url.movies}/getActive/${page}`);
};
const listHot = () => {              
    return api.get(`${api.url.movies}/getHot`);
};


const listNew= () => {              
    return api.get(`${api.url.movies}/getNewest`);
};
const getOne = (id) => api.get(`${api.url.movies}/get-by-id/${id}`); 

const searchFor = (search) => api.get(`${api.url.movies}/search/${search}`)
const searchByGenres = (page,data) => api.post(`${api.url.movies}/byGenres/${page}`,data)

export default {
    list : list,
    listHot: listHot,
    listNew: listNew,
    getOne: getOne,
    searchFor: searchFor,
    searchByGenres: searchByGenres
};