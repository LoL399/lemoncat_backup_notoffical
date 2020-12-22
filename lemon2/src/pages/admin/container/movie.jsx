
import React, { Component,useState } from 'react';
import ReactPlayer from 'react-player'
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { ModalBody, Modal,Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import createtable from '../common/datatable';
import movieservice from '../service/movieservice';
import Wait from '../../Other/LoadingScreen';
import peopleservice from '../service/peopleservice';
import reviewservice from '../service/reviewservice';
class Movies extends Component {
    state = {  listmovie: null}

    componentDidMount(){
      this.loadData();

    }

    loadData(){
      movieservice.list().then(res => {this.setState({listmovie: res.data});    console.log(this.state.listmovie)}).catch(err => this.setState({listmovie: []}))

    }

    render() { 
        return (  
        <div className="row justify-content-center">
            {this.state.listmovie === null ? <Wait/> : <LoadData listmovie={this.state.listmovie}/>}

      </div> );
    }
}

class ReviewModal extends Component {
  state = { listReview: [],  }

  componentDidMount(){

    this.loadData();
  }

  loadData(){
    console.log("here")
    reviewservice.getByMovie(this.props.movieId).then(res => {this.setState({listReview: res.data});  
    console.log(res.data);  console.log(this.setState.listReview)}).catch(err => console.log(err));

  }


  removeConfirm=review=>{
    let flag = review.active
    this.dialog.show({
      title: 'Confimation',
      body: 'Do you want to edit this review?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          review.active = !review.active;
          console.log(review)
          reviewservice.update(review._id,review).then(() => { 

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
          this.state.listReview.map((review)=>{
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

                </div>
                <div>
                <small>{review.updatedAt}</small>
                </div>
                <div>
                <small>by user Id: {review.byUser}</small>
                </div>
                <p className="text-muted">{review.content}</p>
                <small>Rating: {review.userScore}/10</small>
                <p  className="text-danger text-right" onClick={()=>this.removeConfirm(review)}><small>{review.active === true ? "Disabled" : "Enable"  }</small></p>
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

class LoadData extends Component {
  state = { modalState: false,modalType: 0, viewFlag: false, movie: {}, getReviewId:"", listmovie: []}

  componentDidMount(){
    this.setState({listmovie: this.props.listmovie},()=>{ createtable();});

  }

  setModalState=(type,addModal,data)=>{
    this.setState({viewFlag: addModal})
    this.setState({modalType: type})
    if(data === null)
  
      this.setState({movie: {}})
    else
      this.setState({movie: data})
    this.state.modalState===false ? this.setState({modalState: true}) : this.setState({modalState: false})
  }

  setActivityModal=(type,data)=>{
    this.setState({modalType: type})
    if(data === null)
  
      this.setState({getReviewId: ""})
    else
      this.setState({getReviewId: data})
    this.state.modalState===false ? this.setState({modalState: true}) : this.setState({modalState: false})
  }
  promoteMovie=movie=>{
    this.dialog.show({
      title: 'Confimation',
      body: 'Are you want to change the status this movie?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          movie.hot = !movie.hot;
          console.log(movie)
          movieservice.update(movie._id,movie).then((res) => { 
              console.log(res)   
                          
            const index = this.state.listmovie.findIndex((element)=>{return element._id == movie._id})    
            let item = this.state.listmovie;
            item[index] = movie;
            this.setState({listmovie: item})
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

  removeConfirm=movie=>{
    this.dialog.show({
      title: 'Confimation',
      body: 'Are you want to change this movie?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          movie.status = !movie.status;
          console.log(movie)
          movieservice.update(movie._id,movie).then(() => { 
            const index = this.state.listmovie.findIndex((element)=>{return element._id == movie._id})    
            let item = this.state.listmovie;
            item[index] = movie;
            this.setState({listmovie: item})
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
      <h2 className="mb-2 page-title">Movies control</h2>
        <div className="col-md-auto ml-auto text-right">
          <button type="button" className="btn"><span className="fe fe-refresh-ccw fe-24 text-muted" ></span></button>
          <button type="button" className="btn" onClick={()=>this.setModalState(0, false,{})}><span className="fe fe-plus fe-24 text-muted text-primary" ></span></button>
        </div>
      </div>
    <div className="row my-4">

      <div className="col-md-12">
        <div className="card shadow">
          <div className="card-body">

            <table className="table datatables display" >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>lemonScore</th>
                  <th>UserScore</th>
                  <th>Active</th>
                  <th>🔥 HOT 🔥</th>
                  <th>Action</th>
                  
                </tr>
              </thead>
              <tbody>
                
                {
                  this.state.listmovie.map((movie,idx)=>{
                    return (
                      <tr key={idx}>

                    <td>{movie._id}</td>
                    <td>{movie.name}</td>
                    <td>{movie.rating}</td>
                    <td>{movie.lemonScore}</td>
                    <td>{movie.userScore}</td>
                    <td>{movie.status === true ? <span class="badge badge-pill badge-success text-light">Active</span>: <span class="badge badge-pill badge-danger">Inactive</span> }</td>
                    <td> {movie.hot === true ? "🔥" : "" } </td>
                      <td><button className="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span className="text-muted sr-only">Action</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item text-warning pointercursor" onClick={()=>this.setModalState(0, true, movie)}>Edit</a>
                          <a className="dropdown-item text-danger pointercursor" onClick={()=>this.removeConfirm(movie)}>{movie.status === true ? "Disabled" : "Enable"  }</a>
                          <a className="dropdown-item text-danger pointercursor" onClick={()=>this.promoteMovie(movie)}>{movie.hot === true ? "Demote" : "Promote"  }</a>
                          <a className="dropdown-item text-primary pointercursor" onClick={()=>this.setActivityModal(1,movie._id)}>Activities</a>

                        </div>
                      </td>
                    </tr>
                    )
                  })
                }
                </tbody>
                </table>
                      <Modal
                  size="lg"
                  show={this.state.modalState}
                  onHide={this.setModalState}
                  aria-labelledby="example-modal-sizes-title-lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {this.state.modalType === 0 ? "Movie's Detail" : "Activities's Detail"}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {this.state.modalType === 0 ? <MoviesDetails viewDetails={this.state.viewFlag} movieDetail={this.state.movie}/> : <ReviewModal movieId={this.state.getReviewId}/>}
                  </Modal.Body>
                </Modal>
                {/* Dialog remove */}
                <Dialog ref={(el) => { this.dialog = el }} />

           
          </div>
        </div>
      </div> 
    </div> 
  </div>  );
  }
}

const ratingOption = ["G","PG","PG13","R","NC-17"];
const genersOption = ["Action","Comedy","Drama","Horror","Romance","Thriller","Fantasy"];


class MoviesDetails extends Component {
 
  state = { viewDetails: true, Datepick: new Date, id:"",  name:"", summary: "", poster:"",trailer:"", studio:"", rating: "", genres: "", theater: "", casts:[], director:{},
   writer: {}, images: {}, userScore: 0, lemonScore: 0, isEdit: false, listPeople: [] }
  
  componentDidMount(){
    this.setState({viewDetails : this.props.viewDetails});
    this.loadData(this.props.movieDetail)
    // console.log(this.props.viewDetails)
  }

  getPeople(){
    let people = []
    peopleservice.list().then(res => {
      Object.values(res.data).forEach(val => {
        people.push({value: val._id, label: val.name})
      });    
      this.setState({listPeople: people});
    })

    // console.log(this.state.listPeople)
    // console.log(people)
  }
  getSelect(data, name){
    if(typeof data !== "undefined")
    {
      
      if(name==="director" || name === "writer" )
      { 
        let people = {};
        peopleservice.getOne(data).then(res => {
            people = ({value: res.data._id, label: res.data.name});
            this.setState({[name]: people}); 
          });
      }
      else
      {
        let people = [];
        data.forEach(val => {
          peopleservice.getOne(val.person).then(res => {
            people.push({value: res.data._id, label: res.data.name, roleName: val.characterName});
            this.setState({[name]: people}); 
          });
        });  
  
      }
    }

  }



  loadData(props){
    this.setState({id : props._id})
    this.setState({name : props.name});
    this.setState({summary : props.summary});
    this.setState({poster : props.poster});
    this.setState({trailer : props.trailer});
    this.setState({studio : props.studio});
    this.setState({rating : props.rating});
    this.setState({genres : props.genres});
    this.setState({theater : props.theater});
    // this.setState({casts : props.casts});
    this.getSelect(props.casts,"casts")
    this.getSelect(props.director,"director")
    this.getSelect(props.writer,"writer")
    this.setState({images : props.images});
    this.setState({userScore: props.userScore});
    this.setState({lemonScore: props.lemonScore});
    this.getPeople();
  }

  toEdit(){
    this.state.viewDetails===false? this.setState({viewDetails: true}): this.setState({viewDetails: false})
    if(!this.state.viewDetails)
    {
      this.loadData(this.props.movieDetail);
    }
    else
    {
      this.setState({isEdit: true});
    }
  }
  handleCasts = casts => {
    this.setState({ casts });
    console.log(`Option selected:`, casts);
  };

  handleWriter = writer => {
    this.setState({ writer });
    console.log(`Option selected:`, writer);
  };
  handleDirector = director => {
    this.setState({ director });
    console.log(`Option selected:`, director);
  };


  handleChange = event => {
    // if(event.target.name === "poster")
    // {
    //   console.log(event.target.files[0])
    //   const reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0])
    //   reader.onload = function () {
    //     this.setState({[event.target.name]:(reader.result)})}.bind(this)
    // }
    if(event.target.name === "images")
    {
      let collection = [];
      (Array.isArray(this.state.images) && this.state.images.length) === false ? collection = [] : collection = this.state.images;

      Array.from(event.target.files).forEach(element => {
        const reader = new FileReader();
        reader.readAsDataURL(element)
        reader.onload = function () {
          collection.push(reader.result)}.bind(this)}
        );
        this.setState({images: collection});
      console.log(collection)

    }
    else
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state,[event.target.name])

		// this.validateForm();
  }
  removePhoto(idx){
    const collection = this.state.images;
    collection.splice(idx,1);
    this.setState({images: collection});
  }
  submitForm(id){
    const tempData = [];
    Object.values(this.state.casts).forEach(val => {
      tempData.push({person: val.value, characterName: val.roleName})
    });   
    const data = {
      name : this.state.name,
      summary : this.state.summary,
      photos : this.state.photos,
      trailer : this.state.trailer,
      poster : this.state.poster,
      studio : this.state.studio,
      rating : this.state.rating,
      genres : this.state.genres,
      theater : this.state.theater,
      director : this.state.director.value,
      writer : this.state.writer.value,
      images: this.state.images,
      casts: tempData,
      lemonScore : this.state.lemonScore,
      userScore : this.state.userScore,
    }
    console.log(data)
    if(this.state.isEdit)
    {
      console.log("Only edit")
      // console.log(data)
      movieservice.update(id,data).then(res => { 
          window.location.reload();
        }).catch(err => console.log(err))

    }
    else
    {
      movieservice.add(data).then(res => {
        if(res.status === 200)
        {
          window.location.reload();
        }
        else
        {
          alert(res.data); 
        }
      }).catch(err => {alert(err)})
    }
  }

  render() { 
    return ( 
      
      <form >
        <fieldset disabled={this.state.viewDetails}>
          <div className="form-group">
              <label >Movie's Name</label>
              <input name="name" className="form-control" placeholder="Enter the name" name="name" value={this.state.name} onChange={this.handleChange}  required/>
          </div>
          <div className="form-group">
              <label >Description</label>
              <input name="summary" className="form-control" placeholder="Enter the descript (summary)" value={this.state.summary} onChange={this.handleChange} />
          </div>

          <div className="form-row">

              <div className="form-group col-md-6">
                <label>Rating</label>
                <select class="form-control" name="rating" onChange={this.handleChange} >
                  {
                    ratingOption.map((option,idx)=>{
                      return(
                        <option value={option} selected={this.state.rating === option}>{option}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Trailer</label>
                <input className="form-control" name="trailer" placeholder="Enter trailer link" value={this.state.trailer} onChange={this.handleChange} />
                <label>Preview</label>
                <div className="player-wrapper">
                  <ReactPlayer url={this.state.trailer} width="100%" height="200%" />

                </div>

              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group col-md-6">
              <label >User Score</label>
                <div className="input-group mb-3">
                  <input name="userScore" type="number" className="form-control" placeholder="Enter rating" min="1" max="10" value={this.state.userScore} onChange={this.handleChange} />
                  <div className="input-group-append">
                    <span className="input-group-text">/10</span>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label>Lemon Score</label>
                <div className="input-group mb-3">
                  <input name="lemonScore" type="number" className="form-control" placeholder="Enter rating"  min="1" max="10" value={this.state.lemonScore} onChange={this.handleChange} />
                  <div className="input-group-append">
                    <span className="input-group-text">/10</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
              <label >Genres</label>
              <select class="form-control" name="genres" onChange={this.handleChange} >
                  {
                    genersOption.map((option,idx)=>{
                      return(
                        <option value={option} selected={this.state.genres === option}>{option}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Studio</label>
                <div className="input-group mb-3">
                  <input name="studio" type="text" className="form-control" placeholder="Enter studio" value={this.state.studio} onChange={this.handleChange}/>
                </div>
              </div>
            </div>

              <div className="form-row"> 
                <div className="form-group col-md-6">
                <label>Poster</label>
                <input className="form-control" name="poster" placeholder="Enter trailer link" value={this.state.poster} onChange={this.handleChange} />
                <img className="avatar d-flex justify-content-center"  src={this.state.poster} />
                </div >
                <div className="form-group col-md-6">
                  <label>Images:</label>
                <input type="file" accept="image/x-png,image/gif,image/jpeg" name="images" className="form-control-file" multiple onChange={this.handleChange}/> 
                {
                  (Array.isArray(this.state.images) && this.state.images) === false ? null                  
                  :                   
                  this.state.images.map((photo,idx)=>{
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
              <div className="form-group">
                <label >Actor(s)/Actress(es):</label>
                <table className="table">
                <thead className="thead-dark">
                    <tr>

                    <th scope="col">Name</th>
                    <th scope="col">As</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    this.state.casts !== null ? 
                    this.state.casts.map((cast,idx)=>{
                      return(
                        <tr>
                        <th scope="row">{cast.label}</th>
                        {
                          this.state.viewDetails === false ?                       
                           <th><input type="text" onChange={(e)=>{cast.roleName=e.target.value;}} name="roleName"/></th>:
                           <th>{cast.roleName}</th>
                        }

                        </tr>
                      )

                    }): null
                  }

                </tbody>
                </table>
              <Select
                value={this.state.casts}
                isMulti
                onChange={this.handleCasts}
                isDisabled={this.state.viewDetails}
                className="basic-multi-select"
                classNamePrefix="select"
                options={this.state.listPeople}
                name="cast"/>
              </div> 
              <div className="form-group">
                <label >Writer:</label>
              <Select
                value={this.state.writer}
                onChange={this.handleWriter}
                className="basic-multi-select"
                classNamePrefix="select"
                isDisabled={this.state.viewDetails}
                options={this.state.listPeople}
                name="cast"/>
              </div>

              <div className="form-group">
              <label >Director:</label>
              <Select
                isSearchable={true}
                value={this.state.director}
                onChange={this.handleDirector}
                className="basic-multi-select"
                classNamePrefix="select"
                isDisabled={this.state.viewDetails}
                options={this.state.listPeople}
                name="director"/>
              </div>

        </fieldset>
        {this.state.viewDetails===true?<a className="btn btn-warning text-light" onClick={()=>this.toEdit()}>Edit</a>:<a onClick={()=>this.submitForm(this.state.id)} className="btn btn-primary text-light">Submit</a>}
          {this.state.viewDetails===true?null:<a className="btn btn-danger text-light" onClick={()=>this.toEdit()}>Cancel</a>}
        </form>

     );
  }
}


 
export default Movies;