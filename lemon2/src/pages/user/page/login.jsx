import { timers } from 'jquery';
import React, { Component } from 'react';
import logo from "../common/Catlogo.png";
import { Link } from "react-router-dom";
import $ from 'jquery';
import {emailValidation, passValidation, confirmPassValidation as reEnter} from '../common/validation.js'
import userservice from '../service/userservice';
// import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Cookies from "js-cookie";

import cookieUlti from '../common/cookieUlti';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class LoginUser extends Component {
	state = { remember:false, email: "", password: "", emailValidate: "", passValidate: "", message: "" }

	componentDidMount()
	{
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip();
		  });

		this.checkLogin();
	}


    checkLogin(){
        if(cookieUlti.getCookie("userLogin")!==null)
        {
            this.props.history.push("/home");
            this.props.history.go(0);
        }
    }
	remembercheck(){ this.setState({remember: !this.state.remember })}
	handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
		this.validateForm();
	}

	validateForm(){
		this.state.emailValidate = emailValidation(this.state.email);
		this.state.passValidate = passValidation(this.state.password);
	}

	loginSys = data => {
		userservice.login(data).then(res => {console.log(res)
			if(res.data.err && res.data.err=== 403)
            {
                this.setState({message:"Tài khoản bị khóa"})
			}
			else{

				localStorage.setItem('personId', res.data.data.id);
				localStorage.setItem('name', res.data.data.name);
				localStorage.setItem('avatar', res.data.data.photo);
				console.log(localStorage.getItem('personId'))
				if(this.state.remember)
				{
					Cookies.set("userLogin",res.data.token,{expires: 365});  
				}
				else{
					Cookies.set("userLogin",res.data.token,{expires: new Date(new Date().getTime() + 1 * 60 * 1000)}); 
				}

				 
				this.props.history.push('/home');
				this.props.history.go(0);

			}

		}).catch(err => this.setState({message: "Thông tin bị sai, vui lòng kiểm tra" }))
	}

	responseFacebook = (res) => {
		const data ={

			email: res.email,
			password: res.id + "facebook"
		}
		this.loginSys(data);
		
	  }


	 responseGoogle = (res) => {
		const data ={

			email: res.profileObj.email,
			password: res.profileObj.googleId + "google"
		}
		this.loginSys(data);
	  }


	submit(){
		const data = {
			email : this.state.email,
			password: this.state.password
		}
		this.loginSys(data);

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
								<input type="text" data-toggle="tooltip" title={this.state.emailValidate} autoFocus
								className={this.state.emailValidate === "" ? "sign__input" : "sign__input border border-danger"} placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/></div>

							<div className="sign__group">
								<input type="password" data-toggle="tooltip" title={this.state.passValidate} 
								className={this.state.passValidate === "" ? "sign__input" : "sign__input border border-danger"} placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/></div>

							<div className="sign__group sign__group--checkbox">
								<input name="remember" type="checkbox" checked={this.state.remember} onClick={()=>this.remembercheck()}/><label onClick={()=>this.remembercheck()}>Ghi nhớ đăng nhập</label>
							</div>
							<ul className="footer__social sign__text m-0">
								<li className="facebook">
								
								<FacebookLogin
								appId="1095214214266196"
								fields="name,email,picture"
								buttonText="Login"
								// onClick={componentClicked}
								callback={this.responseFacebook}
								render={renderProps => (
									<span onClick={renderProps.onClick}>
										<a data-toggle="tooltip" title="Đăng nhập bằng facebook!"><i className="icon ion-logo-facebook"></i></a>
									</span>
									)}
									/>
									
								</li>
								<li className="google">
								<GoogleLogin
									clientId="199074635155-afhvfjg0filid36ot4mnal5mvbc4fjk9.apps.googleusercontent.com"
									render={renderProps => (
									<span onClick={renderProps.onClick} disabled={renderProps.disabled}>
										<a data-toggle="tooltip" title="Đăng nhập bằng google!"><i className="icon ion-logo-google"></i></a></span>
									)}

									onSuccess={this.responseGoogle}
									onFailure={this.responseGoogle}
									cookiePolicy={'single_host_origin'}
									/>
  								</li>
							</ul>
							
							<button className="sign__btn" type="button" onClick={()=>this.submit()}>Đăng nhập</button>
							<span className="sign__text text-danger">{this.state.message}</span>

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