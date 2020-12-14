import { timers } from 'jquery';
import React, { Component } from 'react';
import logo from "../common/Catlogo.png";
import { Link } from "react-router-dom";
import $ from 'jquery';
import {emailValidation, passValidation} from '../common/validation.js'

class LoginUser extends Component {
	state = { remember:false, email: "", password: "", emailValidate: "", passValidate: "" }

	componentDidMount()
	{
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip();
		  });
	}
	remembercheck(){ this.state.remember===false ? this.setState({remember: true }) : this.setState({remember: false })}
	handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
		this.validateForm();
	}

	validateForm(){
		this.state.emailValidate = emailValidation(this.state.email);
		this.state.passValidate = passValidation(this.state.password);
	}
    render() { 
        return ( 
        <div className="sign section--bg homecolor">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<div className="sign__content">

						<form action="#" className="sign__form">
						<img src={logo} className="header__logo logoLemon bg-transparent "/>

							<div className="sign__group">
								<input type="text" data-toggle="tooltip" title={this.state.emailValidate} 
								className={this.state.emailValidate === "" ? "sign__input" : "sign__input border border-danger"} placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/></div>

							<div className="sign__group">
								<input type="password" data-toggle="tooltip" title={this.state.passValidate} 
								className={this.state.passValidate === "" ? "sign__input" : "sign__input border border-danger"} placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/></div>

							<div className="sign__group sign__group--checkbox">
								<input name="remember" type="checkbox" checked={this.state.remember} onClick={()=>this.remembercheck()}/><label for="remember">Ghi nhớ đăng nhập</label>
							</div>
							<ul className="footer__social sign__text m-0">
								<li className="facebook">
								<a data-toggle="tooltip" title="Đăng nhập bằng facebook!"><i className="icon ion-logo-facebook"></i></a></li>
								<li className="twitter"><a data-toggle="tooltip" title="Đăng nhập bằng google!"><i className="icon ion-logo-google"></i></a></li>
							</ul>
							
							<button className="sign__btn" type="button">Đăng nhập</button>

							<span className="sign__text">Chưa có tài khoản? <Link to="/home/registry">Đăng kí ngay!</Link></span>
							
							<span className="sign__text"><Link to ="/home/forgot">Quên mật khẩu?</Link></span>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div> );
    }
}
 
export default LoginUser;