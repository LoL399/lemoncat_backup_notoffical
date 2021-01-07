import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.js';
import logo from "../common/Catlogo.png"
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import cookieUlti from '../common/cookieUlti';
import userservice from '../service/userservice';
import Wait from '../../Other/LoadingScreen';

import Dialog from 'react-bootstrap-dialog';
class NavBar extends Component {
    state = { expand: false, searchInfo: false, logIn: false, userInfo: null, search: ""}

    componentDidMount()
	{
        this.checkLogin();
	}

    checkLogin(){
        if(cookieUlti.getCookie("userLogin")!==null)
        {
            this.setState({logIn: true})
        }
        else
        {
            this.setState({logIn: false})
            localStorage.removeItem('personId');
            localStorage.removeItem('name');
            localStorage.removeItem('avatar');
        }
    }
    logOutConfirm=()=>{
        this.dialog.show({
          title: 'Confimation',
          body: 'Are you want to logout?',
          actions: [
            Dialog.CancelAction(),
            Dialog.OKAction(() => {
                Cookies.remove("userLogin");
                localStorage.clear();
                window.location.reload();
            })
          ],
          bsSize: 'small',
          onHide: (dialog) => {
            dialog.hide()
            console.log('closed by clicking background.')
          }
        })
        
      }


    expandMenu(){
       this.state.expand === true ? this.setState({expand : false}) : this.setState({expand : true}) 
    }
    searchPanel(){
        this.state.searchInfo === true ? this.setState({searchInfo : false}) : this.setState({searchInfo : true}) 
     }
    render() { 
        return ( 	
        <nav className="header">
            <div className="header__wrap">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="header__content">
                        <Link to="/home">
                            <img src={logo} className="header__logo logoLemon bg-transparent "/></Link>
                        <div className={this.state.expand === false ? " header__nav" : " header__nav header__nav--active"}>
                            <li className="header__nav-item">
                                <Link className="header__nav-link" to="/home/catalog" >Catalog Phim</Link>
                            </li>
                            <li className="header__nav-item">
                                <Link className="header__nav-link" to="/home/paper" >Tin tức hôm nay</Link>
                            </li>
                        </div>
                        <div className="header__auth">
                             <button className={this.state.searchInfo === false ? "header__search-btn mr-5" : "header__search-btn active mr-5"} type="button" onClick={()=> this.searchPanel()}>
                                <i className="icon ion-ios-search" ></i>
                            </button>
                            {this.state.logIn === true ? 
                            
                            <div class="dropdown show header__sign-in">
                            <span role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {localStorage.getItem("name")}</span>

                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Link class="dropdown-item" to="/home/profile">Thông tin cá nhân</Link>
                              <a class="dropdown-item pointercursor" onClick={()=>this.logOutConfirm()}>Đăng xuất</a>
                              
                             <Dialog ref={(el) => { this.dialog = el }} />
                            </div>
                            </div>
                            :
                            <Link to="/home/login" class="header__sign-in">
                            <i class="icon ion-ios-log-in"></i>
                            <span>Đăng nhập</span>
                            </Link>    
                        }



                        </div>
                        <button className={ this.state.expand === false ? "header__btn" : " header__btn header__btn--active"} type="button" onClick={() => this.expandMenu()}>
                            <span ></span>
                            <span></span>
                            <span></span>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    </div>
    <div className={this.state.searchInfo===false ? "header__search": "header__search header__search--active"}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="header__search-content bg-white">
                        <input type="text" placeholder="Tìm kiếm phim, chương trình TV,..." onChange={(e => this.setState({search: e.target.value}, ()=> console.log(this.state.search)) )}/>
                        {this.state.search === "" ? <button type="button" disabled>Tìm kiếm</button> :<Link to={`/home/search/${this.state.search}`}><button type="button">Tìm kiếm</button></Link>}
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</nav> );
    }
}
 
export default NavBar;