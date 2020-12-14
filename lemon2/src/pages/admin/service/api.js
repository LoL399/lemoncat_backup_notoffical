import axios from 'axios';
const url ={    /// tat ca cac duong dan thi nam o day
    baseURL: "http://localhost:7000/admin",
    movies: "/movies",
    ussers: "/users",
    people: "/persons",
    news: "/news",
    loginroute: "/login",
    reviews: "/reviews",
    comment: "/comments"
};
const instance = axios.create({             
    baseURL: url.baseURL,                   
    headers:{
        "Content-Type":"application/json",  
        "Accept":"application/json"          
    },
});



export default {   
    url : url,
    axios: instance,
    get : instance.get,
    post : instance.post,
    put : instance.post,
    delete : instance.delete,
};