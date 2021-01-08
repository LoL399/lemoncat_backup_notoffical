import axios from 'axios';
import cookieUlti from '../common/cookieUlti';
const url ={    /// tat ca cac duong dan thi nam o day
    baseURL: "http://localhost:7000/user",
    movies: "/movies",
    registry: "/signin",
    ussers: "",
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
        "Accept":"application/json" ,
        'Authorization': `Basic ${cookieUlti.getCookie("userLogin")}`
    },
});



export default {   
    url : url,
    axios: instance,
    get : instance.get,
    post : instance.post,
    put : instance.put,
    delete : instance.delete,
};