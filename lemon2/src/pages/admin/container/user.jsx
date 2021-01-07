import React, { Component } from 'react';
 
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { Modal } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import createtable from '../common/datatable';
import userservice from '../service/userservice';
import reviewservice from '../service/reviewservice';
import Wait from '../../Other/LoadingScreen';

class UserInfo extends Component {
    state = {userlist: null}

    componentDidMount(){
      this.loadData();
    }

    loadData(){
      userservice.list().then(res => {this.setState({userlist: res.data}); console.log(res)})

    }

    render() { 
        return ( 
            
            <div className="row justify-content-center">
              {this.state.userlist === null ? <Wait/> : <LoadData userlist={this.state.userlist}/>}
            </div>
        
        );
    }
}

class LoadData extends Component {
  state = {  modalState: false,modalType: 0, viewFlag: false, userdetail: {}, listUser: [] }
  componentDidMount(){
    this.loadData();
    
  }


  loadData(){
    this.setState({listUser: this.props.userlist},()=>{ createtable();});
  }

  setModalState=(type,addModal,user)=>{
    this.setState({viewFlag: addModal})
    this.setState({modalType: type})
    if(user === null)
  
      this.setState({userdetail: {}})
    else
      this.setState({userdetail: user})
    this.state.modalState===false ? this.setState({modalState: true}) : this.setState({modalState: false})
  }


  removeConfirm=user=>{
    this.dialog.show({
      title: 'Confimation',
      body: 'Are you want to edit this user?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          user.status = !user.status;
          console.log(user)
          userservice.update(user._id,user).then((res) => { 

            const index = this.state.listUser.findIndex((element)=>{return element._id == user._id})  
            let item = this.state.listUser;
            item[index] = user;
            this.setState({listUser: item})
            // console.log(res)         
            // window.location.reload();
            }).catch(err => console.log(err))

        })
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
    
  }
  render() { 
    return (      
      <div className="col-12">
      <div className="row mb-4 items-align-center">
        <h2 className="mb-2 page-title">User's info control</h2>
          <div className="col-md-auto ml-auto text-right">
            <button type="button" className="btn" onClick={()=>this.setModalState(0, false,{})}><span className="fe fe-plus fe-24 text-muted text-primary" ></span></button>
          </div>
        </div>
      <div className="row my-4">

        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-body">
            <table className="table datatables display ">
              <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                   this.state.listUser.map((user,idx)=>{
                    return (
                      <tr key={idx}>

                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.status === true ? <span class="badge badge-pill badge-success text-light">Active</span>: <span class="badge badge-pill badge-danger">Inactive</span> }</td>
                    <td>{user.role}</td>
                      <td><button className="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span className="text-muted sr-only">Action</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item text-warning pointercursor" onClick={()=>this.setModalState(0, true,user)}>Edit</a>
                          <a className="dropdown-item text-danger pointercursor" onClick={()=>this.removeConfirm(user)}>{user.status === true ? "Disabled" : "Enable"  }</a>
                          <a className="dropdown-item text-primary pointercursor" onClick={()=>this.setModalState(1,false, user)}>Activities</a>
                        </div>
                      </td>
                    </tr>
                    )
                  })
                }
                  {/*  */}
                  <Modal
                  size="lg"
                  show={this.state.modalState}
                  onHide={this.setModalState}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {this.state.modalType === 0 ? "User's Detail" : "Activities's Detail"}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {this.state.modalType === 0 ? <UserDetail viewDetails={this.state.viewFlag} userdetail={this.state.userdetail}/> : <ReviewModal userID={this.state.userdetail} />}
                  </Modal.Body>
                </Modal>
                {/* Dialog remove */}
                <Dialog ref={(el) => { this.dialog = el }} />
              </tbody>
            </table> 
              
            </div>
          </div>
        </div> 
      </div> 
    </div> 

               );
  }
}

class UserDetail extends Component {
  state = { viewDetails: true, id:"",  name:"", email: "", password:"",photo:"", role:"admin" }
  
  componentDidMount(){
    this.setState({viewDetails : this.props.viewDetails});
    this.loadData(this.props.userdetail)

  }
  loadData(props){
    this.setState({id : props._id})
    this.setState({name : props.name});
    this.setState({email : props.email});
    this.setState({password : props.password});
    this.setState({photo : props.photo});
    this.setState({role : props.role});
  }
  submitForm(id){
    const data={
      id: this.state.id,
      name : this.state.name,
      email : this.state.email,
      password : this.state.password,
      photo : this.state.photo,
      role : this.state.role
    }
    
    console.log(data)
    if(this.state.isEdit)
    {
      console.log("Only edit")
      // console.log(data)
      userservice.update(id,data).then(res => {          
        window.location.reload();
      }).catch(err => console.log(err))
      
    }
    else
    {
      userservice.add(data).then(res=>{        
        if(res.status === 201)
        {
          window.location.reload();
        }
        else
        {
          alert("Thông tin email bị trùng hoặc sai xót. Xin hãy kiểm tra lại"); 
        }})
    }
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

  toEdit(){
    this.state.viewDetails===false? this.setState({viewDetails: true}): this.setState({viewDetails: false})
    if(!this.state.viewDetails)
    {
      this.loadData(this.props.userdetail);
    }
    else
    {
      this.setState({isEdit: true});
    }
  }
    render() { 
        return ( <form>
          <fieldset disabled={this.state.viewDetails}>

                <div className="form-group">
                    <label >User's Name</label>
                    <input name="name" className="form-control" placeholder="Enter the name" value={this.state.name} name="name" onChange={this.handleChange} />
                </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange}/>
                      </div>
                      <div className="form-group col-md-6">
                        <label>Password</label>
                        <input type="text" className="form-control"  placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange}/>
                      </div>
                    </div>
                    <div className="form-group">
                      {this.state.viewDetails=== false ?                      
                      < div>
                        <label>Photo</label>
                        <input type="file" accept="image/x-png,image/gif,image/jpeg" name="photo" className="form-control-file" onChange={this.handleChange} />
                      </div> :                         
                      <div>
                         <label >Photo</label>
                          <img className="avatar d-flex justify-content-center" src={this.state.photo} name="photo"  />
                        </div>
                      }
                        <div>
                         <label >Photo</label>
                          <img className="avatar d-flex justify-content-center" src={this.state.photo} name="photo"  />
                        </div>


                      </div>
                      <div className="form-group ">
                      <label >Role </label>
                        { this.state.viewDetails === true ?                        
                        <input className="form-control" value={this.state.role} required/> :
                        <select class="form-control form-control-sm" name="role" onChange={this.handleChange}>
                          <option value="admin" selected={this.state.role === "admin"}>Admin</option>
                          <option value="user" selected={this.state.role === "user"}>User</option>
                        </select>
                      }

                      </div>

            </fieldset>
         {this.state.viewDetails===true?<a className="btn btn-warning text-light" onClick={()=>this.toEdit()}>Edit</a>:<a onClick={()=>this.submitForm(this.state.id)} className="btn btn-primary text-light">Submit</a>}
          {this.state.viewDetails===true?<a className="btn btn-danger text-light" onClick={()=>this.toEdit()}>Disable</a>:<a className="btn btn-danger text-light" onClick={()=>this.toEdit()}>Cancel</a>}


        </form> );
    }
}

class ReviewModal extends Component {
  state = { listReview: []  }

  componentDidMount(){

    this.loadData();
  }

  loadData(){

    if(this.props.userID)
    {
      reviewservice.getByUer(this.props.userID._id).then(res => {this.setState({listReview: res.data}, () => console.log(res.data))}).catch(err => console.log(err));
    }
    else
    {
      this.setState({listReview : []})
    }


  }


  removeConfirm=review=>{
    let flag = review.active
    this.dialog.show({
      title: 'Confimation',
      body: 'Do you want to change the status of this review?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          review.active = !review.active;
          console.log(review)
          reviewservice.update(review._id,review).then(() => { 
            const index = this.state.listReview.findIndex((element)=>{return element._id == review._id})  
            let item = this.state.listReview;
            item[index] = review;
            this.setState({listReview: item})
              // console.log(res)         
            // window.location.reload();
            }).catch(err => console.log(err))
        })
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
    
  }

  render() { 
    return ( 
      <div>
        {
          this.state.listReview.length === 0 ? <h2>No review yet</h2> :
          this.state.listReview.map((review,idx)=>{
            return(
              <div className="row align-items-center">
              <div className="col-3 text-center">
                <span className="circle circle-lg bg-light">
                  <i className="fe fe-user fe-24 text-primary"></i>
                </span>
              </div>
              <div className="col">
                <div>

                  <h3 className="h5 mt-4 mb-1">{review.name} </h3>
                  {review.active === true ? <span class="badge badge-pill badge-success text-light">Active</span>: <span class="badge badge-pill badge-danger">Inactive</span> }
                  <i className="fe fe-thumbs-up fe-15 text-primary ml-3"></i>: {review.like.length}

                </div>
                <div>
                <small>{review.updatedAt}</small>
                </div>
                <div>
                <small>by: {review.byUser.name}</small>
                </div>
                <p className="text-muted">{review.content}</p>
                <small>Rating:<i className="fe fe-star fe-15 text-primary ml-3"></i> {review.userScore}/10</small>
                
                <p  className="text-danger text-right pointercursor" onClick={()=>this.removeConfirm(review)}><small>{review.active === true ? "Disabled" : "Enable"  }</small></p>
                <hr/>
                <Dialog ref={(el) => { this.dialog = el }} />
              </div> 
          </div>
            )
            
          })

        }

      </div>
     );
  }
}
 
export default UserInfo;