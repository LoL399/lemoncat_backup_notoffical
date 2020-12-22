
import MainPage from '../page';
import MovieCatalog from '../page/catalogmovie';
import LoginUser from '../page/login';
import MovieDetail from '../page/moviedetail';
import NewsDetail from '../page/news';
import RecoverPass from '../page/recoverpass';
import RegistryUser from '../page/registry';
import NewsCatalog from '../page/catalognews';
import UserPage from '../page/userPage';
import SearchPage from '../page/searchcatalog';
import newsPaper from '../page/catalognews2';

const home = "/home";

const routes = [
    {path: home, exact : true, name: "Main Page", component: MainPage},
    {path: home+"/login", exact : true, name: "User Login", component: LoginUser},
    {path: home+"/registry", exact : true, name: "User Login", component: RegistryUser},
    {path: home+"/detail/:id", exact : true, name: "Movie Detail", component: MovieDetail},
    {path: home+"/catalog/", exact : true, name: "Movie Catalog", component: MovieCatalog},
    {path: home+"/news/:id", exact : true, name: "News detail", component: NewsDetail},
    {path: home+"/forgot", exact : true, name: "Forgot pass", component: RecoverPass },
    {path: home+"/paper", exact : true, name: "News Catalog", component: NewsCatalog },
    {path: home+"/profile", exact : true, name: "User Profile", component: UserPage },
    {path: home+"/search/:search", exact : true, name: "Search", component: SearchPage },

];
export default routes;