import Movies from '../container/movie';
import Person from '../container/person';
import Review from '../container/review'
import News from '../container/news';
import UserInfo from '../container/user';
import TopMovies from '../container/topmovie';
import Roles from '../container/role';
import Award from '../container/award';
import Index from '../container/index';
import CommentInfo from '../container/comment';
import Testing from '../container/testing';
const admin = "/admin";

const routes = [
    {path: admin+"/movie" , exact : true, name: "Movie", component: Movies},
    {path: admin+"/" , exact : true,name: "Home",component: Movies},
    {path: admin+"/person" , exact : true,name: "Person", component: Person} ,
    {path: admin+"/review" , exact : true,name: "Review",component: Review},
    {path: admin+"/news" , exact : true,name: "News",component: News},
    {path: admin+"/userInfo" , exact : true,name: "UserInfo",component: UserInfo},
    {path: admin+"/top" , exact : true,name: "TopMovie",component: TopMovies},
    {path: admin+"/role" , exact : true,name: "Role",component: Roles},
    {path: admin+"/award" , exact : true,name: "Award",component: Award},
    {path: admin+"/comment" , exact : true,name: "Comment",component: CommentInfo},
    {path: admin+"/test" , exact : true,name: "Comment",component: Testing}
    
];
export default routes;