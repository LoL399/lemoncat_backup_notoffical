import React, { Component } from 'react';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { Modal } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import createtable from '../common/datatable';

class TopMovies extends Component {
    state = { tableType: 0 }
      
    componentDidMount(){
      createtable()
    }
    setModalState=()=>{
      this.state.modalState===false ? this.setState({modalState: true}) : this.setState({modalState: false})
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
        return ( 
            <div className="row justify-content-center">
            <div className="col-12">
              <div className="row mb-4 items-align-center">
                <h2 className="mb-2 page-title">Top Movies control</h2>
                  <div className="col-md-auto ml-auto text-right">
                    <button type="button" className="btn"><span className="fe fe-refresh-ccw fe-24 text-muted" ></span></button>
                    <button type="button" className="btn" onClick={()=>this.setModalState(0, false)}><span className="fe fe-plus fe-24 text-muted text-primary" ></span></button>
                  </div>
                </div>
              <div className="row my-4">
                <div className="col-md-12">
                  <div className="card shadow">
                    <div className="card-body">
                    <div className="tab-content mb-1">
                    <table className="display table datatables ">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Year release</th>
            <th>Rating</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          <tr>

            <td>368</td>
            <td>Vinamilk: Rise of Dutch Lady </td>
            <td>2021</td>
            <td>2.5/5 (Average)</td>


            <td><button className="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="text-muted sr-only">Action</span>
              </button>
              <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item text-danger pointercursor" onClick={()=>this.removeConfirm(1)}>Disable</a>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
                    </div>
                    </div>
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
              Add a new excellent movie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTop/>
        </Modal.Body>
      </Modal>
      {/* Dialog remove */}
      <Dialog ref={(el) => { this.dialog = el }} />
      </div>
        );
    }
} 
 class AddTop extends Component {
   state = {  }
   render() { 
     return (             
     <form>
        <div className="form-group mb-3">
       <label for="Trailerlink">Select a movie </label>
       <select className="custom-select">
           <option selected="">Open this select menu</option>
           <option value="1">One</option>
           <option value="2">Two</option>
           <option value="3">Three</option>
         </select>
     </div>
      <button type="submit" className="btn btn-primary">Add</button>
       <button type="submit" className="btn btn-danger">Cancel</button>
     <small> The movie will be added manually without checking the rating score. </small>
     </form>
 );
   }
 }
  

 
export default TopMovies;