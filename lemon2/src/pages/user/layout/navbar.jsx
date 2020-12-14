import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.js';
import logo from "../common/Catlogo.png"
import { Link } from "react-router-dom";
class NavBar extends Component {
    state = { expand: false, searchInfo: false }
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
                             <button className={this.state.searchInfo === false ? "header__search-btn " : "header__search-btn active"} type="button" onClick={()=> this.searchPanel()}>
                                <i className="icon ion-ios-search" ></i>
                            </button>
                            <Link to="/home/login" class="header__sign-in">
                                <i class="icon ion-ios-log-in"></i>
                                <span>Đăng nhập</span>
                            </Link>


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
    <form action="#" className={this.state.searchInfo===false ? "header__search": "header__search header__search--active"}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="header__search-content bg-white">
                        <input type="text" placeholder="Tìm kiếm phim, chương trình TV,..."/><button type="button">Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
   
</nav> );
    }
}
 
export default NavBar;