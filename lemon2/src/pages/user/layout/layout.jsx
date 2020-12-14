import React, { Component } from 'react';
import NavBar from './navbar';
import "../common/css/css-bootstrap-reboot.min.css"
import "../common/css/css-bootstrap-grid.min.css"
import "../common/css/css-owl.carousel.min.css"
import "../common/css/css-jquery.mCustomScrollbar.min.css"
import "../common/css/css-nouislider.min.css"
import "../common/css/css-ionicons.min.css"
import "../common/css/css-plyr.css"
import "../common/css/css-photoswipe.css"
import "../common/css/css-default-skin.css"
import "../common/css/css-main.css"
import 'bootstrap/dist/js/bootstrap.js';
import FooterSection from './footer';
import { Route, Switch, Redirect } from "react-router-dom";
import routes from"../common/route"


class ClientPage extends Component {
    state = {  }
    render() { 
        return ( 
        <div className="homecolor">
            <NavBar/>

                <Switch>
                    {routes.map((route,idx)=>{
                            return route.component ? (       //toan tu 3 ngoi
                                <Route 
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    component={route.component}
                                />
                            ):null;
                        })
                        }
                    <Redirect exact to="/404"/> 
                </Switch>

            <FooterSection/>
        </div> );
    }
}
 
export default ClientPage;