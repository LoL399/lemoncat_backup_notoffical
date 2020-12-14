import React, { Component } from 'react';
import "./costumecss.css"
import { Link } from "react-router-dom";
class NoAuth extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="Noauthpage h-100">
                <div class="h-100 row align-items-center message">
                    <div class="col text-center text-light w-50 ">
                        <h1 className="text-light">401</h1>
                        <span>Oh wao! Bạn không đủ quyền truy cập vào trang này</span>
                        <div>
                            <small className="text-muted">"Hải, quay xe?" - Lợi Tô</small>
                        </div>
                        <Link to="/home">Về trang chủ</Link>

                    </div>
                </div>
            </div>

        );
    }
}
 
export default NoAuth;