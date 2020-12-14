import React, { Component } from 'react';
import cover from '../common/images/covers-cover.jpg';
class SearchPage extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <section className="section section--first section--bg homecolor p-3 mb-3 w-50 mx-auto d-block" ><div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section__wrap">
                                    <h2 className="section__title">Tìm kiếm mục phim: </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

        <div class="catalog">
            <div class="container">
                <div class="row">
                    {/* Item */}
                    <div class="col-6 col-sm-4 col-lg-3 col-xl-2 homecolor">
                        <div class="card border-0 homecolor">
                            <div class="card__cover" >
                                <img src={cover} alt=""/><a href="#" class="card__play">
                                    <i class="icon ion-ios-play"></i>
                                </a>
                            </div>
                            <div class="card__content">
                                <h3 class="card__title "><a href="#">Blindspotting</a></h3>
                                <span class="card__category">
                                    <a href="#">Comedy</a>
                                    <a href="#">Drama</a>
                                </span>
                                <span class="card__rate"><i class="icon ion-ios-star"></i>7.9</span>
                            </div>
                        </div>
                    </div>
        

                    {/* <!-- paginator --> */}
                    <div class="col-12">
                        <ul class="paginator"><li class="paginator__item paginator__item--prev">
                                <a href="#"><i class="icon ion-ios-arrow-back"></i></a>
                            </li>
                            <li class="paginator__item paginator__item--active"><a href="#">1</a></li>
                            <li class="paginator__item "><a href="0#">2</a></li>
                            <li class="paginator__item"><a href="#">3</a></li>
                            <li class="paginator__item"><a href="#">4</a></li>
                            <li class="paginator__item paginator__item--next">
                                <a href="#"><i class="icon ion-ios-arrow-forward"></i></a>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
            <section className="section section--first section--bg homecolor p-3 mb-3 w-50 mx-auto d-block" ><div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section__wrap">
                                    <h2 className="section__title">Tìm kiếm mục tin: </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

        <div class="catalog">
            <div class="container">
                <div class="row">
                    {/* Item */}
                    <div class="col-sm-6">
                <div class="card homecolor border-0 mr-2">
                <div class="row">
                    <div class=" col-sm-6">
                        <img src={cover} className=" mx-auto d-block w-75 h-75"/>
                        
                    </div>
                    <div class=" col-sm-6">  
                    <div class="card-body">
                       
                        <div className="text-light" >
                            <h3 className="text-light">It is a long established fact that a reader.</h3>
							<small className="text-light">09/09/2020</small>
                        </div>

						<button className="sign__btn" type="button">Đọc thêm →</button>

                    </div>
                    </div>
 
                    </div>
                </div>
            </div>
        

                    {/* <!-- paginator --> */}
                    <div class="col-12">
                        <ul class="paginator"><li class="paginator__item paginator__item--prev">
                                <a href="#"><i class="icon ion-ios-arrow-back"></i></a>
                            </li>
                            <li class="paginator__item paginator__item--active"><a href="#">1</a></li>
                            <li class="paginator__item "><a href="0#">2</a></li>
                            <li class="paginator__item"><a href="#">3</a></li>
                            <li class="paginator__item"><a href="#">4</a></li>
                            <li class="paginator__item paginator__item--next">
                                <a href="#"><i class="icon ion-ios-arrow-forward"></i></a>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>






            </div>
         );
    }
}
 
export default SearchPage;