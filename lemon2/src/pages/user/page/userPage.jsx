import React, { Component } from 'react';
import { ModalBody, Modal,Button } from 'react-bootstrap';
import Wait from '../../Other/LoadingScreen';
import cookieUlti from '../common/cookieUlti';
import cover from '../common/images/covers-cover.jpg';
import { passValidation } from '../common/validation';
import userservice from '../service/userservice';
import $ from 'jquery';
class UserPage extends Component {
    state = { 
        modalState: false,
        tabType: 0,
        userInfo: null
     }

     componentDidMount(){
       this.loadData();

     }

     loadData(){

      this.checkLogin()
       
     }

     checkLogin(){
      if(cookieUlti.getCookie("userLogin")!==null)
      {
          userservice.getInfo().then(res => {this.setState({userInfo: res.data}, ()=>console.log(this.state.userInfo))}).catch((err) => {
            this.props.history.replace("/404");
            this.props.history.go(0)
          })
      }
      else{
        this.props.history.replace("/404");
        this.props.history.go(0)

      }
    }
     setModalState=()=>{
        this.state.modalState===false ? this.setState({modalState: true}) : this.setState({modalState: false})
      }

     renderSwitch(param) {
        switch(param) {
          case 1:
            return <InfoChange userInfo={this.state.userInfo}/>;
        case 2:
            return <PassChange/>;
        case 3:
            return <ActivityChange/>;
        default:
          return null
        }
      }
    infoHandler(bool,param){
        this.setState({modalState: bool});
        this.setState({tabType: param});
    }
    
    render() { 
        return ( 
            <div className="h-100">
              {
                this.state.userInfo === null ? <div className=" container-fluid section home h-100 color  border-0"><Wait/></div>:
                <section className="section details homecolor border-0 ">

                {/*ultilities */}
                <div className="container">
                <div className="row my-4">
                    {/* card 1 */}
                <div className="col-md-4">
                  <div className=" mb-4 text-light content__head container">
                    <div className="card-body my-n3">
                      <div className="row align-items-center">
                        <div className="col-3 text-center">
                          <span className="circle circle-lg bg-light">
                            <i className="fe fe-user fe-24 text-primary"></i>
                          </span>
                        </div> 
                        <div className="col">
                          <a href="#">
                            <h3 className="mt-4 mb-1 labelGradient">Thông tin cá nhân tài khoản</h3>
                          </a>
                          <p className="text-muted">Thay đổi các thông tin liên lạc.</p>
                        </div> 
                      </div> 
                      <button className="sign__btn" type="button" onClick={()=>this.infoHandler(true,1)}>Chỉnh sửa thông tin cá nhân</button>
                    </div> 
                    
                  </div> 
                </div> 
                {/* card 2 */}
                <div className="col-md-4">
                  <div className="mb-4 text-light content__head container">
                    <div className="card-body my-n3">
                      <div className="row align-items-center">
                        <div className="col-3 text-center">
                          <span className="circle circle-lg bg-light">
                            <i className="fe fe-shield fe-24 text-primary"></i>
                          </span>
                        </div> 
                        <div className="col">
                          <a href="#">
                            <h3 className=" mt-4 mb-1 labelGradient">Bảo mật tài khoản</h3>
                          </a>
                          <p className="text-muted">Thay đổi mật khẩu của tài khoản</p>
                        </div> 
                      </div> 
                      <button className="sign__btn" type="button" onClick={()=>this.infoHandler(true,2)}>Thay đổi mật khẩu</button>
                    </div>

                  </div> 
                </div>

                {/* card 3 */}
                <div className="col-md-4">
                  <div className="mb-4 text-light content__head container">
                    <div className="card-body my-n3">
                      <div className="row align-items-center">
                        <div className="col-3 text-center">
                          <span className="circle circle-lg bg-light">
                            <i className="fe fe-bell fe-24 text-primary"></i>
                          </span>
                        </div> 
                        <div className="col">
                          <a href="#">
                            <h3 className="labelGradient mt-4 mb-1">Nhật kí hoạt động</h3>
                          </a>
                          <p className="text-muted">Nhật kí hoạt động của tài khoản.</p>
                        </div> 
                      </div>
                      <button className="sign__btn" type="button" onClick={()=>this.infoHandler(true,3)}>Xem nhật ký hoạt động</button>
                    </div> 

                  </div>
                </div> 
              </div>
                </div>
                
            </section>
                
              }
              <Modal
                show={this.state.modalState}
                onHide={this.setModalState}   
              >
                <Modal.Body className="homecolor ">
                    <div className="row">
                    {/*  */}
                    
                    </div>
                     
                    <div className="section--bg homecolor">
                   
                        <div className="container">
                       
                            <div className="row">
                            <button className="float-right text-right labelGradient h2 " onClick={()=>this.infoHandler(false,3)}>x</button>
                            
                                <div className="col-12">
                                    <div className="d-flex justify-content-center">
                                    <div className="">
                                    {this.renderSwitch(this.state.tabType)}
                                    </div>

                                   
                                    
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div> 
                </Modal.Body>
            </Modal>

            </div>
        );
    }
}

class InfoChange extends Component {
    state = { name: "",photo: "", userInfo: {} }

    componentDidMount(){
      this.loadData();
    }

    loadData(){
      this.setState({photo: this.props.userInfo.photo})
      this.setState({name: this.props.userInfo.name});
    }

    submitForm(id){
      const data={
        id : this.props.userInfo._id, 
        name : this.state.name,
        photo : this.state.photo,
      }
      
      console.log(data)
      userservice.updateByUser(data).then((res) => {
        window.location.reload();
      }).catch(err => alert(err))

    }

    handleChange = event => {
      if(event.target.name === "photo")
      {
        console.log(event.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.onload = function () {
          this.setState({[event.target.name]:(reader.result)})}.bind(this)
      }
      else
      this.setState({[event.target.name]: event.target.value});
      console.log( event.target.value)
      // this.validateForm();
    }
  

    render() { 
        return ( 

                <div className=" mt-3 mb-3">

                <div>
                 <h3 className="text-white mb-4">Chỉnh thông tin cá nhân</h3>
                <div className="sign__group d-block mx-auto w-50">
                <img src={this.state.photo} alt="..." className="avatar"/>
                </div>
                <div className="sign__group d-block mx-auto w-50">
                {/* <span className="text-light">Thêm ảnh mới + </span> */}
                <input type="file" accept="image/x-png,image/gif,image/jpeg" name="photo" className="text-light" onChange={this.handleChange} />
                </div>

                <div className="sign__group">
                <input type="text" className="sign__input" placeholder="UserName" name="name" value={this.state.name} onChange={this.handleChange}/></div>

                <button className="sign__btn" type="button" onClick={()=>this.submitForm()}>Thay đổi</button> 
                </div> 


               </div>



        );
    }
}

class PassChange extends Component {
    state = { oldPass: "", newPass: "", passValidate: "", comfirmPassValid: "", message: "", rePass: "" }

    componentDidMount(){
      $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
        });
  
    }

    handleChange = event => {
      this.setState({[event.target.name]: event.target.value}, ()=> this.validateForm());
      
      console.log(event.target.value)

    }
  
    async validateForm(){
      this.state.passValidate = passValidation(this.state.newPass);
      await this.state.rePass === this.state.newPass ? this.setState({comfirmPassValid: ""}): this.setState({comfirmPassValid: "Mật khẩu không giống"}) 
    }

    submit(){
      this.validateForm();
      if(this.state.passValidate === "" && this.state.comfirmPassValid ==="")
      {
        if(this.state.oldPass !="" && this.state.newPass !="" && this.state.rePass !="")
        {
          this.setState({message: ""});
          console.log("SUBMITTING ...")
          const data = {
            oldPass: this.state.oldPass,
            newPass: this.state.newPass
          }

          userservice.updatePass(data).then(res => {
            res.data.right === false ? this.setState({message:"Mật khẩu cũ sai, xin hãy kiểm tra lại thông tin"}) : window.location.reload();
          })
  
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



    render() { 
        return (                 
        <form action="#" className="mb-3">
        <h3 className="text-white mt-4 mb-4">Thay đổi mât khẩu</h3>
        <div className="sign__group">
        <input type="password" className= "sign__input"  name="oldPass" value={this.state.oldPass} onChange={this.handleChange } placeholder="Mật khẩu cũ"/></div>

        <div className="sign__group">
            <input type="password" data-toggle="tooltip" title={this.state.passValidate} 
								className={this.state.passValidate === "" ? "sign__input" : "sign__input border border-danger"} name="newPass" value={this.state.newPass} onChange={this.handleChange }  placeholder="Mật khẩu mới"/></div>

        <div className="sign__group">
            <input type="password"  data-toggle="tooltip" title={this.state.comfirmPassValid} 
								className={this.state.comfirmPassValid === "" ? "sign__input" : "sign__input border border-danger"} name="rePass" value={this.state.rePass} onChange={this.handleChange } placeholder="Nhập lại mât khẩu mới - xác minh"/></div>

        <button className="sign__btn" type="button" onClick={()=>this.submit()}>Thay đổi mật khẩu</button>
        <span className="sign__text text-danger">{this.state.message}</span>
    </form> 
    );
    }
}

class ActivityChange extends Component {
    state = {  }
    render() { 
        return ( 
          <div>
            <ul className="nav nav-tabs content__tabs border-0" id="content__tabs" role="tablist">
							<li className="nav-item">
								<a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Bình luận</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Đánh giá</a>
							</li>
              
						</ul>
            <div className="tab-content mt-5" id="myTabContent">
							<div className="tab-pane fade active show" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
                {/*  */}
                    <li className="comments__item">
                  <div className="comments__autor">
                  <img className="reviews__avatar" src="images/img-user.svg" alt=""/>
                    <span className="comments__name">John Doe</span>
                    <span className="comments__time">30.08.2018, 17:53</span>
                  </div>
                  <p className="comments__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                  <div className="comments__actions">

                    <button type="button"><i className="icon ion-ios-trash"></i>Xóa</button>

                  </div>
                </li>
							</div>
							<div className="tab-pane fade " id="tab-2" role="tabpanel" aria-labelledby="2-tab">
							{/* Hey listen */}
                  <li className="reviews__item">
                <div className="reviews__autor">

                  <span className="reviews__name">Best Marvel movie in my opinion</span>
                  <span className="reviews__time">24.08.2018, 17:53 by John Doe</span>

                  <span className="reviews__rating"><i className="icon ion-ios-star"></i>8.4</span>
                </div>
                <p className="reviews__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                <div className="comments__actions">

                <button type="button"><i className="icon ion-ios-trash"></i>Xóa</button>

                </div>
              </li>
							</div>
				
						</div>
          </div>
         );
    }
}


 
export default UserPage;