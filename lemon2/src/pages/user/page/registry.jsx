import React, { Component } from 'react';
import logo from "../common/Catlogo.png";
import { Link } from "react-router-dom";
import $ from 'jquery';
import {emailValidation, passValidation, phoneValidation, confirmPassValidation as reEnter} from '../common/validation.js'

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import userservice from '../service/userservice';
import cookieUlti from '../common/cookieUlti';
class RegistryUser extends Component {
	state = { username:"", email: "", password: "", phone: "",  emailValidate: "", passValidate: "", phoneValide: "", comfirmPassValid: "", rePass: "", message: ""}
	
	componentDidMount(){
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip();
		  });
	}

	async componentWillUnmount(){
		this.checkLogin();
		this.validateForm();
		
	}

	checkLogin(){
        if(cookieUlti.getCookie("userLogin")!==null)
        {
            this.props.history.push("/home");
            this.props.history.go(0);
        }
    }

	createUser = data =>{
		userservice.registry(data)
		.then(res => {
			alert("xin hãy đăng nhập");
			this.props.history.replace("/home/login");
			this.props.history.go(0);
		}).catch(()=>{
			this.setState({message: "Email bị đã xuất hiện ở trong hệ thống, vui lòng thay đổi" },()=>alert(this.state.message))
		})
	}

	submit(){
		this.validateForm();
		if(this.state.passValidate === "" && this.state.comfirmPassValid === "" && this.state.emailValidate ==="" )
		{
			if(this.state.email !="" && this.state.password !="" && this.state.username !="")
			{
				this.setState({message: ""});
				console.log("SUBMITTING ...")
				const data = {
					name: this.state.username,
					email: this.state.email,
					password: this.state.password
				}
				this.createUser(data);

			}
			else
			this.setState({message: "Xin đừng bỏ trống thông tin nào hết"})

		}
		else
		{
			this.setState({message: "Xin hẫy kiểm tra lại các thông tin"})
			console.log("validate",this.state.emailValidate, this.state.comfirmPassValid, this.state.passValidate)
		}



	}


	responseFacebook = (res) => {

		const data ={
			name: res.name,
			email: res.email,
			password: res.id + "facebook"
		}
		// 1626022010912968facebook
		this.createUser(data);
	  }

	 responseGoogle = (res) => {
		// const data ={
		// 	name: res.profileObj.name,
		// 	email: res.profileObj.email,
		// 	password: res.profileObj.googleId + "google"
		// }
		// // "104988882528795719138"

		// this.createUser(data);
	  }


	handleChange = event => {
		this.setState({[event.target.name]: event.target.value}, ()=>this.validateForm());
		console.log(event.target.value)
	}

	validateForm= ()=>{
		this.setState({emailValidate : emailValidation(this.state.email)});
		this.setState({passValidate : passValidation(this.state.password)});
		this.setState({phoneValide : phoneValidation(this.state.phone)});
		const check = async ()=>{
			if(this.state.rePass.localeCompare(this.state.password)!==0)
			{
				this.setState({comfirmPassValid: "Mật khẩu không giống"})
			}
			else
				this.setState({comfirmPassValid: ""})
		}

		check();

		
	}

    render() { 
        return ( 
		<div className="sign section--bg homecolor">
		<div className="container">
			<div className="row">
				<div className="col-12 mt-5">
					<div className="sign__content">

						<form className="sign__form">
						<img src={logo} className="header__logo logoLemon bg-transparent "/>
							
							<div className="sign__group">
							<input type="text" className="sign__input" placeholder="UserName" name="username" value={this.state.username} onChange={this.handleChange} required={true}/></div>

							<div className="sign__group">
								<input type="text" data-toggle="tooltip" title={this.state.emailValidate} 
								className={this.state.emailValidate === "" ? "sign__input" : "sign__input border border-danger"} placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} required={true}/></div>

							<div className="sign__group">
								<input type="password" data-toggle="tooltip" title={this.state.passValidate} 
								className={this.state.passValidate === "" ? "sign__input" : "sign__input border border-danger"} placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} required={true}/></div>
							<div className="sign__group">
								<input type="password" data-toggle="tooltip" title={this.state.comfirmPassValid} 
								className={this.state.comfirmPassValid === "" ? "sign__input" : "sign__input border border-danger"} placeholder="Nhập lại password để xác nhận" name="rePass" onChange={this.handleChange} value={this.state.rePass} required={true}/></div>

                                {/* <div className="sign__group">
								<input type="text" data-toggle="tooltip" title={this.state.phoneValide} 
								className={this.state.phoneValide === "" ? "sign__input" : "sign__input border border-danger"} placeholder="Phone Number" name="phone" onChange={this.handleChange} value={this.state.phone}/></div> */}
							<button className="sign__btn" type="button" onClick={()=>this.submit()}>Tạo tài khoản</button>
							<span className="sign__text text-danger">{this.state.message}</span>
							<div className="sign__group">

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
										<a data-toggle="tooltip" title="Tạo bằng facebook!"><i className="icon ion-logo-facebook"></i></a>
									</span>
									)}
									/>
									
								</li>
								<li className="google">
								<GoogleLogin
									clientId="199074635155-afhvfjg0filid36ot4mnal5mvbc4fjk9.apps.googleusercontent.com"
									render={renderProps => (
									<span onClick={renderProps.onClick} disabled={renderProps.disabled}>
										<a data-toggle="tooltip" title="Tạo bằng google!"><i className="icon ion-logo-google"></i></a></span>
									)}

									onSuccess={this.responseGoogle}
									onFailure={this.responseGoogle}
									cookiePolicy={'single_host_origin'}
									/>
  								</li>
							</ul>


							<span className="sign__text">Đã có tài khoản? <Link to="/home/login">Đăng nhập thôi!</Link></span>


							<span className="sign__text"><Link to ="/home/forgot">Quên mật khẩu?</Link></span>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>  );
    }
}


 

export default RegistryUser;