import React, { Component } from 'react';
import $ from 'jquery';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { ModalBody, Modal,Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import { Editor } from '@tinymce/tinymce-react';
import createtable from '../common/datatable';
class Award extends Component {
    state = { modalState: false,modalType: 0, viewFlag: false }

    componentDidMount(){
      createtable()
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
    setModalState=(type,addModal)=>{
        this.setState({viewFlag: addModal})
        this.setState({modalType: type})
        this.state.modalState===false ? this.setState({modalState: true}) : this.setState({modalState: false})
      }
    render() { 
        return (  <div className="row justify-content-center">
        <div className="col-12">
          <div className="row mb-4 items-align-center">
            <h2 className="mb-2 page-title">Awards control</h2>
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
                    <th>Award name</th>
                    <th>Action</th>

                </tr>
                </thead>
                <tbody>
                <tr>

                    <td>368</td>
                    <td>Oscar</td>


                    <td><button className="btn btn-sm dropdown-toggle more-horizontal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="text-muted sr-only">Action</span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item text-warning pointercursor" onClick={()=>this.setModalState(0, true)}>Edit</a>
                    <a className="dropdown-item text-danger pointercursor"  onClick={()=>this.removeConfirm(1)}>Disable</a>
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
          Add a new award
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <RewardModal viewDetails={this.state.viewFlag}/>
    </Modal.Body>
  </Modal>
  {/* Dialog remove */}
  <Dialog ref={(el) => { this.dialog = el }} />
  </div> );
    }
}
class RewardModal extends Component {
    state = { viewDetails: true }
    constructor(props)
    {super(props);
      this.state.viewDetails = this.props.viewDetails;
      console.log(this.props.viewDetails)
    }
  
    toEdit(){
      this.state.viewDetails===false? this.setState({viewDetails: true}): this.setState({viewDetails: false})
    }
      render() { 
          return ( 
          <form>
              <fieldset disabled={this.state.viewDetails}>
                <div className="form-group mb-3">
                <label for="Trailerlink">Enter new role </label>
                <input type="text" className="form-control"/>
                </div>
                </fieldset>
                {this.state.viewDetails===true?<button type="submit" className="btn btn-warning text-light" onClick={()=>this.toEdit()}>Edit</button>:<button type="submit" className="btn btn-primary">Add</button>}
                {this.state.viewDetails===true?<button type="submit" className="btn btn-danger" onClick={()=>this.toEdit()}>Disable</button>:<button type="submit" className="btn btn-danger">Cancel</button>}
  
   
            </form> );
    }
}

export default Award;