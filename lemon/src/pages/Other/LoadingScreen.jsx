import React, { Component } from 'react';
import "./costumecss.css"

class Wait extends Component {
    state = {  }
    render() { 
        return ( <div class="spinner-border text-primary d-flex justify-content-center " role="status">
        <span class="sr-only">Loading...</span>
      </div> );
    }
  }
   
 
export default Wait ;