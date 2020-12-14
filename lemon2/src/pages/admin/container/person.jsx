import React, { Component } from 'react';

import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { ModalBody, Modal,Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import createtable from '../common/datatable';
import Wait from '../../Other/LoadingScreen';
import peopleservice from '../service/peopleservice';

class Person extends Component {
    state = { peoplelist: null }

    componentDidMount(){
      this.loadData();
      }
    
      loadData(){
        peopleservice.list().then(res => {this.setState({peoplelist: res.data}); console.log(res)})
      }  
      
  
    render() { 
        return ( 
            <div className="row justify-content-center">
            {this.state.peoplelist === null ? <Wait/> : <LoadData peoplelist={this.state.peoplelist}/>}
          </div>
        );
    }
}

class LoadData extends Component {
  state = { modalState: false, viewFlag: false, person: {} }
  componentDidMount(){
    createtable();
  }
  setModalState=(addModal, data)=>{
    this.setState({viewFlag: addModal})

    if(data === null)
  
      this.setState({person: {}})
    else
      this.setState({person: data})
    this.state.modalState===false ? this.setState({modalState: true}) : this.setState({modalState: false})
  }

removeConfirm=person=>{
    this.dialog.show({
      title: 'Confimation',
      body: 'Are you want to delete this major?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          peopleservice.remove()
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
                <h2 className="mb-2 page-title">People control</h2>
                  <div className="col-md-auto ml-auto text-right">
                    <button type="button" className="btn"><span className="fe fe-refresh-ccw fe-24 text-muted" ></span></button>
                    <button type="button" className="btn" onClick={()=>this.setModalState(false,{})}><span className="fe fe-plus fe-24 text-muted text-primary" ></span></button>
                  </div>
                </div>
              <div className="row my-4">
    
                <div className="col-md-12">
                  <div className="card shadow">
                    <div className="card-body">
    
                    <table className="table datatables display">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Birth date</th>
                            {/* <th>Status</th> */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          this.props.peoplelist.map((person,idx)=>{
                            return (
                            <tr key={idx}>
                            <td>{person._id}</td>
                            <td> <img className="avatar d-flex justify-content-center" src={person.poster} /></td>
                            <td>{person.name}</td>
                            <td>{person.birthDate}</td>
                            <td><button className="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="text-muted sr-only">Action</span>
                              </button>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item text-warning pointercursor" onClick={()=>this.setModalState(true, person)}>Edit</a>
                                <a className="dropdown-item text-danger pointercursor" onClick={()=>this.removeConfirm(person)}>Disable</a>
                                <a className="dropdown-item text-primary pointercursor" onClick={()=>this.setModalState(1,false)}>Activities</a>

                              </div>
                            </td>
                            </tr>
                            )
                          })
                        }

                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> 
              </div> 
              <Modal
        size="lg"
        show={this.state.modalState}
        onHide={this.setModalState}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
              Person's details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <PersonDetail viewDetails={this.state.viewFlag} persondetail={this.state.person}/>
        </Modal.Body>
      </Modal>
      {/* Dialog remove */}
      <Dialog ref={(el) => { this.dialog = el }} />
            </div> 


     );
  }
}


class PersonDetail extends Component {
    state = { viewDetails: true, id: "", photos: {}, name: "", birthDate: "", bornIn: "", poster: "",  summary: "", isEdit: false}
    componentDidMount(){
      this.setState({viewDetails : this.props.viewDetails});
      this.loadData(this.props.persondetail)
      console.log(this.props.viewDetails)
    }
    toEdit(){
        this.state.viewDetails===false? this.setState({viewDetails: true}): this.setState({viewDetails: false});
        if(!this.state.viewDetails)
        {
          this.loadData(this.props.persondetail);
        }
        else
        {
          this.setState({isEdit: true});
        }
    }
    submitForm(id){
      const data = {
        name : this.state.name,
        birthDate : this.state.birthDate,
        photos : this.state.photos,
        bornIn : this.state.bornIn,
        poster : this.state.poster,
        summary : this.state.summary
      }
      if(this.state.isEdit)
      {
        console.log("Only edit")
        // console.log(data)
        peopleservice.update(id,data).then(res => { 
          window.location.reload();
        }).catch(err => console.log(err))
      }
      else
      {
        peopleservice.add(data).then(res => {
          if(res.status === 200)
          {
            window.location.reload();
          }
          else
          {
            alert(res.data); 
          }
        }).catch(err => alert(err))
      }
    }
    
  handleChange = event => {
    if(event.target.name === "poster")
    {
      console.log(event.target.files[0])
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = function () {
        this.setState({[event.target.name]:(reader.result)})}.bind(this)
    }
    else if(event.target.name === "photos")
    {
      let collection = [];
      (Array.isArray(this.state.photos) && this.state.photos.length) === false ? collection = [] : collection = this.state.photos;

      Array.from(event.target.files).forEach(element => {
        const reader = new FileReader();
        reader.readAsDataURL(element)
        reader.onload = function () {
          collection.push(reader.result)}.bind(this)}
        );
        this.setState({photos: collection});
      console.log(collection)

    }
    else
    this.setState({[event.target.name]: event.target.value});
    console.log(event.target.value)
		// this.validateForm();
  }
  removePhoto(idx){
    const collection = this.state.photos;
    collection.splice(idx,1);
    this.setState({photos: collection});
  }

    loadData(props){
      this.setState({id : props._id})
      this.setState({name : props.name});
      this.setState({birthDate : props.birthDate});
      this.setState({photos : props.photos});
      this.setState({bornIn : props.bornIn});
      this.setState({poster : props.poster});
      this.setState({summary : props.summary});
    }   
    render() { 
        return ( 
            <form>
            <fieldset disabled={this.state.viewDetails}>
            <div className="form-group">
              <label >Person's Name</label>
              <input name="name" className="form-control" placeholder="Enter the name" value={this.state.name} onChange={this.handleChange} required/>
            </div>
            <div className="form-row">
              { this.state.viewDetails === true ?                        
                  <div className="form-group col-md-6">
                  <label>Country</label>
                        <input type="text" className="form-control" name="birthDate" value={this.state.birthDate} onChange={this.handleChange}/>
                  </div> :
                  <div className="form-group col-md-6">
                  <label >Birthday</label>
                  <input className="form-control" placeholder="dd/mm/yyyy" name="birthDate" type="date" value={this.state.birthDate} onChange={this.handleChange}/>
                  </div>
                }

              <div className="form-group col-md-6">
              <label>Country</label>
                    <input type="text" className="form-control" name="bornIn" value={this.state.bornIn} onChange={this.handleChange}/>
              </div>
            </div>
            <div className="form-row">
                                
              < div className="form-group col-md-6">
                <label >Poster</label>
                {this.state.viewDetails === false ? 
                <input type="file" accept="image/x-png,image/gif,image/jpeg" name="poster" className="form-control-file" onChange={this.handleChange} /> 
                : null
                }
                {
                  this.state.poster === "" ? null :
                  <img className="avatar d-flex justify-content-center" src={this.state.poster} name="poster"  />
                }


              </div>                                     
                <div className="form-group col-md-6">
                <label>Photo</label>
                {this.state.viewDetails=== false ? 
                <input type="file" accept="image/x-png,image/gif,image/jpeg" name="photos" className="form-control-file" multiple onChange={this.handleChange}/>  :  null
                }  
                {
                  (Array.isArray(this.state.photos) && this.state.photos.length) === false ? null                  
                  :                   
                  this.state.photos.map((photo,idx)=>{
                    return(
                      <div>
                        <img className="avatar d-flex justify-content-center" src={photo} alt={idx+1}  />
                        {this.state.viewDetails=== false ?<small className="text-danger pointercursor" onClick={()=>this.removePhoto(idx)}>Remove</small>: null}
                      </div>
                    )
                  })
                }

                </div>                      


            </div>
            {/* <div className="form-group">
            <label >Role</label>
                <select className="custom-select" name="role">
                  <option selected="">Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
            </div> */}
            </fieldset>
            {this.state.viewDetails===true?<a className="btn btn-warning text-light" onClick={()=>this.toEdit()}>Edit</a>:<a onClick={()=>this.submitForm(this.state.id)} className="btn btn-primary text-light">Submit</a>}
          {this.state.viewDetails===true?<a className="btn btn-danger text-light" onClick={()=>this.toEdit()}>Disable</a>:<a className="btn btn-danger text-light" onClick={()=>this.toEdit()}>Cancel</a>}
          </form>
            );
    }
}
 
export default Person;