import React, { Component } from 'react';
import "./costumecss.css"
import { Link } from "react-router-dom";
class NoFound extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="Nofoundpage h-100">
                <div class="h-100 row align-items-center message">
                    <div class="col text-center text-light w-50 ">
                        <h1 className="text-light">404</h1>
                        <span>Oh wao! Trang bạn cần tìm không thấy đâu cả</span>
                        <div>
                            <small className="text-muted">"Lợi, sao trang này không có vậy ba ?" - Đạt Lý</small>
                        </div>
                        <Link to="/home">Về trang chủ</Link>

                    </div>
                </div>
            </div>

        );
    }
}
 
export default NoFound;