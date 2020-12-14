import React, { Component } from 'react';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { ModalBody, Modal,Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import { Editor } from '@tinymce/tinymce-react';
import createtable from '../common/datatable';
import commentsevice from '../service/commentsevice';
import Wait from '../../Other/LoadingScreen';
class CommentInfo extends Component {
    state = { listcomment: null }

    componentDidMount(){
      this.loadData();
    }

    loadData(){
      commentsevice.list().then(res => {this.setState({listcomment: res.data});    console.log(this.state.listcomment)}).catch(err => this.setState({listcomment: []}))

    }

    render() { 
        return ( 
            <div className="row justify-content-center">
              {this.state.listcomment === null ? <Wait/> : <LoadData listcomment={this.state.listcomment}/>}
            </div>
      
         );
    }
}


class LoadData extends Component {
  state = { modalState: false, comment: {}}
  componentDidMount(){
    createtable()
    }
    
  setModalState=(comment)=>{
      this.state.modalState===false ? this.setState({modalState: true}) : this.setState({modalState: false});
      this.setState({comment: comment});
    }

    removeConfirm=id=>{
      this.dialog.show({
        title: 'Confimation',
        body: 'Are you want to delete this major?',
        actions: [
          Dialog.CancelAction(),
          Dialog.OKAction(() => {
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
    return (  <div className="col-12">
    <div className="row mb-4 items-align-center">
      <h2 className="mb-2 page-title">Comments control</h2>
        <div className="col-md-auto ml-auto text-right">
        <button type="button" className="btn" onClick={()=>this.setModalState({})}><span className="fe fe-plus fe-24 text-muted text-primary" ></span></button>
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
                      <th>User</th>
                      <th>Time</th>

                      <th>Action</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr>

                      <td>368</td>
                      <td>Mr.Dat</td>
                      <td>31/10/2020 13:00:01</td>



                      <td><button className="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span className="text-muted sr-only">Action</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item text-warning pointercursor" onClick={()=>this.setModalState()}>View</a>
                          <a className="dropdown-item text-danger pointercursor"  onClick={()=>this.removeConfirm(1)}>Remove review</a>
                        </div>
                      </td>
                    </tr>

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
              Comment's Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CommentModal commentdetail={this.state.comment}/>
             
        </Modal.Body>
      </Modal>
      {/* Dialog remove */}
      <Dialog ref={(el) => { this.dialog = el }} />
    </div> );
  }
}
 



class CommentModal extends Component {
  state = {  }


  componentDidMount(){
    // this.setState({viewDetails : this.props.viewDetails});
    // this.loadData(this.props.commentdetail)
    // console.log(this.props.viewDetails)
  }

  render() { 
    return ( 
      <div>
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
                      <small>by Mr.Dat </small><a href="#"><small>(Go to post's location)</small></a>
                      <p href="#" className="text-danger text-right"><small>Remove</small></p>
                      <hr/>
                    </div> 
                </div>
      </div>
     );
  }
}



export default CommentInfo;