import React, { Component } from 'react';

import cover from '../common/images/covers-cover.jpg';
class newsPaper extends Component {
    state = {  }
    render() { 
        return ( 
          <section className="home">
            <div class="container " >
              <div className="row">
                <div className="col-xl-12">
                  <div className ="col-xl-4">
                  <div class="card">
                    <img class="card-img-top" src="..." alt="Card image cap"/>
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                  </div>
                  <div className ="col-xl-4">
                  <div class="card">
                    <img class="card-img-top" src="..." alt="Card image cap"/>
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

         );
    }
}
 
export default newsPaper;