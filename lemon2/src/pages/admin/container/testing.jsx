import React, { Component } from 'react';

class Testing extends Component {
    state = {  }
    render() { 
        return (
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">As</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Mr A</td>
                    <td> Remove </td>
                    </tr>
                </tbody>
                </table>
          );
    }
}
 
export default Testing;