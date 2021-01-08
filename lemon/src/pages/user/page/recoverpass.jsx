import React, { Component } from 'react';
import Dialog from 'react-bootstrap-dialog';
import $ from 'jquery';
import {emailValidation, passValidation} from '../common/validation.js'
import userservice from '../service/userservice.js';

class RecoverPass extends Component {
	state = { 
		showInputCode: false,
		showInputNewPass: false,
		buttonName: "Nhận mã khôi phục",
		email: "", password: "", emailValidate: "", passValidate: "", recovercode:"",
		message: "", sucess: 0


	 }
	 
	componentDidMount()
	{
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip();
		  });
		  this.validateForm();
	}

	handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
		this.validateForm();
	}

	validateForm(){
		this.setState({emailValidate: emailValidation(this.state.email)});
		// this.state.passValidate = passValidation(this.state.password);
	}
	//  checkonClick(){

	// 	if(!this.state.showInputNewPass)
	// 	{
	// 		if(!this.state.showInputCode)
	// 		{
	// 			this.setState({showInputCode : !this.state.showInputCode});
	// 			this.setState({buttonName: "Xác nhận mã khôi phục"})
	// 		}

	// 		if(this.state.showInputCode)
	// 		{
	// 			this.setState({showInputNewPass : !this.state.showInputNewPass});
	// 			this.setState({buttonName: "Đổi mật khẩu"})
	// 			this.changeConfirm();
	// 		}
	// 	}

	//  }

	submit(){
		
		if(this.state.emailValidate === "")
		{
			console.log("sending...")
			const data = {email: this.state.email}
			userservice.recoverPass(data).then(res => this.setState({message: "Hãy kiểm tra email của bạn",sucess: 1})).catch(()=>{this.setState({message: "Emal của bạn không có trong hệ thống", sucess: 0})})

		}
		else
		{
			this.setState({message: "Hãy nhập đúng dạng email", sucess: 0})
		}
	}

	
	 changeConfirm=()=>{
		this.dialog.show({
		  title: 'Thông báo',
		  body: 'Hãy đăng nhập bằng mật khẩu mới',
		  actions: [
			Dialog.OKAction(() => {
				// 
			})
		  ],
		  bsSize: 'small',
		})
		
	  }
    render() { 
        return ( <div className="sign section--bg homecolor">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<div className="sign__content">

						<form action="#" className="sign__form">
							<a href="index.html" className="sign__logo">
                                <h1 className="text-light">Quên mật khẩu</h1></a>
							<div className="sign__group">
							<input type="text" data-toggle="tooltip" title={this.state.emailValidate} 
								className={this.state.emailValidate === "" ? "sign__input" : "sign__input border border-danger"} placeholder="Email khôi phục" name="email" value={this.state.email} onChange={this.handleChange}/></div>
{/* 
							{this.state.showInputCode === true ?
								<div className="sign__group" >
								<input type="text" className="sign__input" placeholder="Mã khôi phục" value={this.state.recovercode} name="recovercode" onChange={this.handleChange}/></div>: null}
							{this.state.showInputNewPass === true ?
							<div className="sign__group" >
								<input type="password" data-toggle="tooltip" title={this.state.passValidate} 
								className={this.state.passValidate === "" ? "sign__input" : "sign__input border border-danger"}placeholder="Mật khẩu mới" value={this.state.password} name="password" onChange={this.handleChange}/></div>: null} */}

							<button className="sign__btn" type="button" onClick={()=>this.submit()}>{this.state.buttonName}</button>
							<span className={this.state.sucess === 0 ? "sign__text text-danger" :  "sign__text text-success"}>{this.state.message}</span>
						</form>
					</div>
				</div>
			</div>
		</div>
		<Dialog ref={(el) => { this.dialog = el }} />
	</div> );
    }
}
 
export default RecoverPass;