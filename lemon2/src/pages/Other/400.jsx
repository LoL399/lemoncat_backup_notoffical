import React, { Component } from 'react';
import "./costumecss.css"
import { Link } from "react-router-dom";
class ServerError extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="Noauthpage h-100">
                <div class="h-100 row align-items-center message">
                    <div class="col text-center text-light w-50 ">
                        <h1 className="text-light">400</h1>
                        <span>Oh wao! Server có vấn đề rồi bạn!</span>
                        <div>
                            <small className="text-muted">"Đạt, sao server không chayJy?" - Lợi Tô</small>
                        </div>
                        <Link to="/home">Về trang chủ</Link>

                    </div>
                </div>
            </div>

        );
    }
}
 
export default ServerError;