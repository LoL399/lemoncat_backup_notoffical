import React, { Component } from 'react';
 
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { Modal } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import createtable from '../common/datatable';
import userservice from '../service/userservice';
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
  state = {  modalState: false,modalType: 0, viewFlag: false, userdetail: {} }
  componentDidMount(){
    createtable();
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
      body: 'Are you want to delete this major?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          user.status = !user.status;
          console.log(user)
          userservice.update(user._id,user).then((res) => { 
            console.log(res)         
            window.location.reload();
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
            <button type="button" className="btn"><span className="fe fe-refresh-ccw fe-24 text-muted" ></span></button>
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
                   this.props.userlist.map((user,idx)=>{
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
                          <a className="dropdown-item text-primary pointercursor" onClick={()=>this.setModalState(1,false)}>Activities</a>
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
                    {this.state.modalType === 0 ? <UserDetail viewDetails={this.state.viewFlag} userdetail={this.state.userdetail}/> : <ActivitiesDetail/>}
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

class ActivitiesDetail  extends Component {
    state = { ActivitiesState: 0 }

    changeActivity(id){
      this.setState({ActivitiesState: id});
    }
    renderSwitch(id){
      switch(id) {
        case 1:
          return <CommentDetail/>;
        default:
          return <ReviewDetail/>;
      }
    }

    render() { 
        return ( 
            <div>
                <ul className="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <span className="nav-link active pointercursor"  data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="true" onClick={()=>this.changeActivity(0)} >Reviews</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link pointercursor" data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="false" onClick={()=>this.changeActivity(1)} >Comment</span>
                    </li>
                </ul>
                
                <div className="tab-content mb-1" id="pills-tabContent">
                    {this.renderSwitch(this.state.ActivitiesState)}
                </div>
            </div>
         );
    }
}


class ReviewDetail extends Component {
    state = {  }
    render() { 
        return ( <div>
          <div className="row align-items-center">
                      <div className="col-3 text-center">
                        <span className="circle circle-lg bg-light">
                          <i className="fe fe-user fe-24 text-primary"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div>
                          <h3 className="h5 mt-4 mb-1">This movie is so such</h3>
                          <small>12/12/2019</small>
                        </div>
                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus.</p>
                        
                        <p className="text-warning">Rating: 2/5</p>
                        <a href="#"><small>by Mr.Dat</small></a>
                        <p href="#" className="text-danger text-right"><small>Remove</small></p>
                        <hr/>
                      </div> 
                  </div>
        </div>  );
    }
}

class CommentDetail extends Component {
    state = {  }
    render() { 
        return ( <div>
          <div className="row align-items-center">
                      <div className="col-3 text-center">
                        <span className="circle circle-lg bg-light">
                          <i className="fe fe-user fe-24 text-primary"></i>
                        </span>
                      </div>
                      <div className="col">
                        <div>
                          <h3 className="h5 mt-4 mb-1">This movie is so such</h3>
                          <small>12/12/2019</small>
                        </div>
                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus.</p>
                        <a href="#"><small>by Mr.Dat</small></a>
                        <p href="#" className="text-danger text-right"><small>Remove</small></p>
                        <hr/>
                      </div> 
                  </div>
        </div>);
    }
}
 
export default UserInfo;