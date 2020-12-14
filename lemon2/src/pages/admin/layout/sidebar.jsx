import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../common/CatlogoAdmin.png"
class SibeBar extends Component {
    state = {  }
    render() { 
        return ( 


          <nav className="vertnav navbar navbar-light">
          <div className="w-100 mb-4 d-flex">
            <a className="navbar-brand mx-auto mt-2 flex-fill text-center pointercursor">
            <img src={logo} className="navbar-brand-img brand-sm  logoLemon "/>
            </a>
          </div>
          <ul className="navbar-nav flex-fill w-100 mb-2">
            <li className="nav-item ">
              <Link to={"/admin"} className=" nav-link">
                <i className="fe fe-home fe-16"></i>
                <span className="ml-3 item-text">DASHBOARD</span><span className="sr-only">(current)</span>
              </Link>

            </li>
          </ul>
          <p className="text-muted nav-heading mt-4 mb-1">
            <span>USERS</span>
          </p>
          <ul className="navbar-nav flex-fill w-100 mb-2">
            <li className="nav-item dropdown">
              <Link to="/admin/userInfo" className="nav-link">
                <i className="fe fe-box fe-16"></i>
                <span className="ml-3 item-text">INFO</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="/admin/news" className="nav-link">
                <i className="fe fe-credit-card fe-16"></i>
                <span className="ml-3 item-text">NEWS</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/review" className="nav-link">
                <i className="fe fe-grid fe-16"></i>
                <span className="ml-3 item-text">REVIEWS</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/comment" className="nav-link">
                <i className="fe fe-grid fe-16"></i>
                <span className="ml-3 item-text">COMMENT</span>
              </Link>
            </li>
          </ul>
          <p className="text-muted nav-heading mt-4 mb-1">
            <span>MOVIES</span>
          </p>
          <ul className="navbar-nav flex-fill w-100 mb-2">
            <li className="nav-item dropdown">
              <Link to="/admin/movie" className="nav-link">
                <i className="fe fe-book fe-16"></i>
                <span className="ml-3 item-text">MOVIES</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="/admin/person" className="nav-link">
                <i className="fe fe-user fe-16"></i>
                <span className="ml-3 item-text">PERSONS</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="/admin/role" className="nav-link">
                <i className="fe fe-user fe-16"></i>
                <span className="ml-3 item-text">ROLES</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="/admin/top" className="nav-link">
                <i className="fe fe-folder fe-16"></i>
                <span className="ml-3 item-text">TOP MOVIES</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="/admin/award" className="nav-link">
                <i className="fe fe-star fe-16"></i>
                <span className="ml-3 item-text">AWARD</span>
              </Link>
            </li>
          </ul>
        </nav>


         );
    }
}
 
export default SibeBar;