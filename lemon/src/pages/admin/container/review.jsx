import React, { Component } from 'react';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { ModalBody, Modal,Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import { Editor } from '@tinymce/tinymce-react';
import createtable from '../common/datatable';
import reviewservice from '../service/reviewservice';
import Wait from '../../Other/LoadingScreen';
import movieservice from '../service/movieservice';
import Cookies from "js-cookie";
import jwt from 'jwt-simple';
import Select from 'react-select';
class Review extends Component {
    state = { reviewlist: null }


    componentDidMount(){
      this.loadData();
      }
    
      loadData(){
        reviewservice.list().then(res => {this.setState({reviewlist: res.data}); console.log(res)}).catch(err => this.setState({reviewlist: []}))
      }  
      

    render() { 
        return ( 
            <div className="row justify-content-center">
               {this.state.reviewlist === null ? <Wait/> : <LoadData reviewlist={this.state.reviewlist}/>}
        </div>
         );
    }
}

class LoadData extends Component {
  state = { modalState: false ,modalType: 0, viewFlag: false, review:{}, reviewList: null }
  componentDidMount(){
    this.setState({reviewList: this.props.reviewlist}, ()=> createtable())
  }
        
  setModalState=(addModal, data, type)=>{
    this.setState({viewFlag: addModal})
    this.setState({modalType: type})

    if(data === null)
  
      this.setState({review: {}})
    else
      this.setState({review: data})
    this.state.modalState===false ? this.setState({modalState: true}) : this.setState({modalState: false})
  }

  removeConfirm=review=>{
    this.dialog.show({
      title: 'Confimation',
      body: 'Are you want to change the status of this review?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          review.active = !review.active;
          console.log(review)
          reviewservice.update(review._id,review).then(() => { 
            const index = this.state.reviewList.findIndex((element)=>{return element._id == review._id})  
            let item = this.state.reviewList;
            item[index] = review;
            this.setState({reviewList: item})
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
        <h2 className="mb-2 page-title">Review control</h2>
        </div>
      <div className="row my-4">

        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-body">
            <table className="table datatables display">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Header</th>
                        <th>For movie</th>
                        <th>By User</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                          this.state.reviewList !== null ? this.state.reviewList.map((review,idx)=>{
                            return (
                            <tr key={idx}>
                            <td>{review._id}</td>
                            <td>{review.name}</td>
                            <td>{review.forMovie.name}</td>
                            <td>{review.byUser.name}</td>
                            <td>{review.userScore}</td>
                            <td>{review.active === true ? <span class="badge badge-pill badge-success text-light">Active</span>: <span class="badge badge-pill badge-danger">Inactive</span> }</td>
                            <td><button className="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="text-muted sr-only">Action</span>
                              </button>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item text-warning pointercursor" onClick={()=>this.setModalState(true, review,0)}>Detail</a>
                                <a className="dropdown-item text-danger pointercursor" onClick={()=>this.removeConfirm(review)}>{review.active === true ? "Disabled" : "Enable"  }</a>
                                <a className="dropdown-item text-primary pointercursor" onClick={()=>this.setModalState(true,review,1)}>Activities</a>

                              </div>
                            </td>
                            </tr>
                            )
                          }) : null
                        }


                    </tbody>
                  </table>
            </div>
          </div>
        </div> 
      </div> 
          {/*  */}
          <Modal
            size="lg"
            show={this.state.modalState}
            onHide={this.setModalState}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                  Review's Detail
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {this.state.modalType === 0 ? <ReviewModal viewDetails={this.state.viewFlag} reviewDetails={this.state.review}/> : <CommentModal reviewDetails={this.state.review}/>}
                
            </Modal.Body>
          </Modal>
          {/* Dialog remove */}
          <Dialog ref={(el) => { this.dialog = el }} />
            </div> 

     );
  }
}
 


class CommentModal extends Component {
  state = { review: null }

  componentDidMount(){
    if(this.props.reviewDetails)
    {
      this.setState({review: this.props.reviewDetails})
    }
    else
    {
      this.setState({review: []})
    }

  }

  
  removeConfirm=comment=>{
    this.dialog.show({
      title: 'Confimation',
      body: 'Do you want to edit this review?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          let item = this.state.review;
          item.comment.pop((e)=> {return e._id=== comment._id}) 
          this.setState({review: item},()=>reviewservice.update(this.state.review._id,this.state.review).then(res => console.log(res)
          ).catch(err => console.log(err)))
          
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
        {this.state.review === null || this.state.review.length === 0 ? <h5>No comment yet</h5> : this.state.review.comment.map((comment)=>{
          return(                
            <div className="row align-items-center">
            <div className="col">

              <p className="text-muted"> Comment: {comment.comment.content}</p>
              <div>
              <small>by userID: {comment.comment.byUser}</small>
              </div>
              
              <p  className="text-danger text-right pointercursor" onClick={()=>this.removeConfirm(comment)}><small>Remove</small></p>
              <hr/>
              <Dialog ref={(el) => { this.dialog = el }} />
            </div> 
        </div>)
        })
 }
      </div>
     );
  }
}

class ReviewModal extends Component {


  state={ id:"", byUser: "", name: "", content: "", forMovie: {}, userScore: 0, listMovie:[], listUser: [], viewDetails: true, isEdit: false }


  componentDidMount(){
    
    this.setState({viewDetails: this.props.viewDetails});
    this.getMovieName();
    this.loadData(this.props.reviewDetails);

  }

  getMovieName(){

    let list=[]
    movieservice.list().then(res => {
      Object.values(res.data).forEach(val => {
        list.push({value: val._id, label: val.name})
      });    
      this.setState({listMovie: list});


    }).catch(err => this.setState({listMovie: []}))
  }

  loadData(props){
    this.setState({content: props.content});
    this.setState({id : props._id});
    this.setState({name : props.name});
    this.setState({userScore: props.userScore});
    if(this.state.isEdit)
    {
      this.getSelect(props.forMovie,"forMovie");
    }
  } 

  getSelect(data, name){
    let movie = {};
        movieservice.getOne(data).then(res => {
            movie = ({value: res.data._id, label: res.data.name});
            this.setState({[name]: movie}); 
          });

  }

  submitForm(id){
    const data = {
      name : this.state.name,
      byUser: localStorage.getItem("user"),
      content: this.state.content,
      userScore: this.state.userScore,
      forMovie: this.state.forMovie.value,
    }

    console.log(data)
    if(this.state.isEdit)
    {
      console.log("Only edit")
      // console.log(data)
      reviewservice.update(id,data).then(() => { 
        window.location.reload();
      }).catch(err => alert(err))
    }
    else
    {
      reviewservice.add(data).then(res => {
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


  handleMovie = forMovie => {
    this.setState({ forMovie });
    console.log(`Option selected:`, forMovie);
  };
  toEdit(){
    this.state.viewDetails===false? this.setState({viewDetails: true}): this.setState({viewDetails: false});
    if(!this.state.viewDetails)
    {
      this.loadData(this.props.reviewDetails);
    }
    else
    {
      this.setState({isEdit: true});
    }
}

  
  handleChange = event => {
    if(event.target.name === "userScore")
    {
      if(event.target.value > 10 )
        this.setState({userScore: 10})
      else if(event.target.value < 0 )
        this.setState({userScore: 0})
      else
      {
        this.setState({[event.target.name]: event.target.value});
        console.log(event.target.value)
      }

    }
    else
    {
      this.setState({[event.target.name]: event.target.value});
      console.log(event.target.value)

    }
  }
    render() { 
        return ( 
        <form>
            <fieldset disabled={true}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Header</label>
                    <input name="name" className="form-control" placeholder="Enter the name" value={this.state.name} onChange={this.handleChange} required/>
                </div>
                <div className="form-group col-md-6">
                    <label>Rating</label>
                    <div className="input-group mb-3">
                      <input type="number" className="form-control" value={this.state.userScore} name="userScore" onChange={this.handleChange} aria-label="ratingInput" aria-describedby="basic-addon2"/>
                      <div className="input-group-append">
                        <span className="input-group-text">/10</span>
                      </div>
                    </div>
                  </div>
            </div>

            <div className="form-group mb-3">
                <label for="example-textarea">Review:</label>
                <textarea class="form-control" rows="3" name="content" value={this.state.content} onChange={this.handleChange}>{this.state.content}</textarea>
 

            </div>
              </fieldset>
    
          {this.state.viewDetails===true?null:<a className="btn btn-danger text-light" onClick={()=>this.toEdit()}>Cancel</a>}
 
          </form> );
    }
}

export default Review;