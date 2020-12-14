import React, { Component } from 'react';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { Modal } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import { Editor } from '@tinymce/tinymce-react'
import createtable from '../common/datatable';
import Wait from '../../Other/LoadingScreen';
import newsservice from '../service/newsservice';
class News extends Component {
  state = { newslist: null }

  componentDidMount(){
    this.loadData();

    
    }
  
    loadData(){
      newsservice.list().then(res => {this.setState({newslist: res.data}); console.log(res)})

    }  
    

  render() { 
      return ( 
          <div className="row justify-content-center">
          {this.state.newslist === null ? <Wait/> : <LoadData newslist={this.state.newslist}/>}
      </div>
      );
  }
}

class LoadData extends Component {
  state = { modalState: false,modalType: 0, viewFlag: false, newsdetail: {} }
  componentDidMount(){

    createtable();
  }
  


  setModalState=(addModal, data)=>{
    this.setState({viewFlag: addModal})

    if(data === null)
  
      this.setState({newsdetail: {}})
    else
      this.setState({newsdetail: data})
    this.state.modalState===false ? this.setState({modalState: true}) : this.setState({modalState: false})
  }


  removeConfirm=news=>{
    this.dialog.show({
      title: 'Confimation',
      body: 'Are you want to delete this major?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          news.active = !news.active;
          console.log(news)
          newsservice.update(news._id,news).then((res) => { 
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
      <h2 className="mb-2 page-title">News control</h2>
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
                      <th>Header</th>
                      <th>Author</th>
                      <th>Create date</th>
                      <th>Active</th>
                      <th>Action</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.props.newslist.map((news,idx)=>{
                            return (
                            <tr  key={idx}>
                            <td>{news._id}</td>
                            <td>{news.name}</td>
                            <td>{news.byUser}</td>
                            <td>{news.createdAt}</td>
                            <td>{news.active === true ? <span class="badge badge-pill badge-success text-light">Active</span>: <span class="badge badge-pill badge-danger">Inactive</span> }</td>
                            <td><button className="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="text-muted sr-only">Action</span>
                              </button>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item text-warning pointercursor" onClick={()=>this.setModalState(true, news)}>Edit</a>
                                <a className="dropdown-item text-danger pointercursor" onClick={()=>this.removeConfirm(news)}>{news.active === true ? "Disabled" : "Enable"  }</a>
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
      {/*  */}
      <Modal
        size="lg"
        show={this.state.modalState}
        onHide={this.setModalState}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
              {this.state.modalType === 0 ? "News's Detail" : "Activities's Detail"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.modalType === 0 ? <NewsDetail viewDetails={this.state.viewFlag} airdrop={this.state.newsdetail}/>  : <ActivitiesDetail/>}
        </Modal.Body>
      </Modal>
      {/* Dialog remove */}
      <Dialog ref={(el) => { this.dialog = el }} /> 
        </div> 
      );
  }
}

class NewsDetail extends Component {
  state = { viewDetails: true, 
            byUser:"",
            name: "",
            content: "",
            category: "",
            // like: [],
            active: "",
            //tag:"",
            isEdit: false}

  componentDidMount(){
    this.setState({viewDetails : this.props.viewDetails});
    this.loadData(this.props.airdrop)
    console.log(this.props.viewDetails)
  }
  toEdit(){
      this.state.viewDetails===false? this.setState({viewDetails: true}): this.setState({viewDetails: false});
      if(!this.state.viewDetails)
      {
        this.loadData(this.props.airdrop);
      }
      else
      {
        this.setState({isEdit: true});
      }
  }
  submitForm(id){
    const data = {
      byUser: this.state.byUser,
      name: this.state.name,
      content: this.state.content,
      category: this.state.category,
      active: this.state.active,
    }
    if(this.state.isEdit)
    {
      console.log("Only edit")
      // console.log(data)
      newsservice.update(id,data).then(res => { 

          window.location.reload();}).catch(()=>alert("Something went wrong???"))
    }
    else
    {
      console.log("New",data)
      newsservice.add(data).then(res =>{
        if(res.status === 200)
        {
          window.location.reload();
        }
        else
        {
          alert(res.data); 
        } })

    }
  }
  handleEditorChange=e=>{
    console.log('Content was updated:', e.target.getContent());
    this.setState({content: e.target.getContent()});
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
  loadData(props){
    this.setState({id : props._id})
    this.setState({byUser : props.byUser});
    this.setState({name : props.name});
    this.setState({content : props.content});
    this.setState({category : props.category});
    this.setState({active : props.active});
    // this.setState({summary : props.summary});
  }   
  
    render() { 
        return ( 
            <form>
            <fieldset disabled={this.state.viewDetails}>
            <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Article's header </label>
                        <input className="form-control" placeholder="Enter the head description" name="name" value={this.state.name} onChange={this.handleChange}/>
                      </div>
                      <div className="form-group col-md-6">
                        <label for="Trailerlink">Author </label>
                        <input className="form-control" placeholder="Enter the head description" name="byUser" value={this.state.byUser} onChange={this.handleChange}/>
                      </div>
                    </div>


            <div className="form-group mb-3">
                <label for="example-textarea">Review:</label>
                <div className="ql-container ql-snow" >
                <Editor
                    disabled={this.state.viewDetails}
                    initialValue={this.state.content}
                    onChange={this.handleEditorChange}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                    }}
                />
                </div>
 

            </div>
              </fieldset>
              {this.state.viewDetails===true?<a className="btn btn-warning text-light" onClick={()=>this.toEdit()}>Edit</a>:<a onClick={()=>this.submitForm(this.state.id)} className="btn btn-primary text-light">Submit</a>}
          {this.state.viewDetails===true?null:<a className="btn btn-danger text-light" onClick={()=>this.toEdit()}>Cancel</a>}

          </form>
         );
    }
}
 
class ActivitiesDetail extends Component {
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
          </div> );
    }
}

 
export default News;