import React, { Component } from 'react';
import cover from '../common/images/covers-cover.jpg';
import { Link } from "react-router-dom";
class MovieCatalog extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <section className="section section--first section--bg homecolor p-3" ><div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section__wrap">
                                <h2 className="section__title">Danh sách phim</h2>
                                <ul className="breadcrumb homecolor"><li className="breadcrumb__item"><Link to="/home/">Trang chủ</Link></li>
                                    <li className="breadcrumb__item breadcrumb__item--active">Danh sách phim</li>
                                </ul></div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="filter">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="filter__content">
						<div class="filter__items">

							<div class="filter__item">
								<span class="filter__item-label">IMBd:</span>

								<div class="filter__item-btn dropdown-toggle" role="button"data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<div class="filter__range">
										<div id="filter__imbd-start"></div>
										<div id="filter__imbd-end"></div>
									</div>
									<span></span>
								</div>

								<div class="filter__item-menu filter__item-menu--range dropdown-menu" aria-labelledby="filter-rate">
									<div></div>
								</div>
							</div>

							<div class="filter__item" >
								<span class="filter__item-label">NĂM SẢN XUẤT:</span>

								<div class="filter__item-btn dropdown-toggle" role="button" id="filter-year" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<div class="filter__range">
										<div id="filter__years-start"></div>
										<div id="filter__years-end"></div>
									</div>
									<span></span>
								</div>

								<div class="filter__item-menu filter__item-menu--range dropdown-menu" aria-labelledby="filter-year">
									<div id="filter__years"></div>
								</div>
							</div>
							
							<div class="filter__item">
								<span class="filter__item-label">THỂ LOẠI:</span>

								<div class="filter__item-btn dropdown-toggle" role="button" id="filter-year" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<div class="filter__range">
										<div id="filter__years-start"></div>
										<div id="filter__years-end"></div>
									</div>
									<span></span>
								</div>

								<div class="filter__item-menu filter__item-menu--range dropdown-menu" aria-labelledby="filter-year">
									<div id="filter__years"></div>
								</div>
							</div>
							
							<div class="filter__item" >
								<span class="filter__item-label">GIẢI THƯỞNG:</span>

								<div class="filter__item-btn dropdown-toggle" role="button" id="filter-year" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<div class="filter__range">
										<div id="filter__years-start"></div>
										<div id="filter__years-end"></div>
									</div>
									<span></span>
								</div>

								<div class="filter__item-menu filter__item-menu--range dropdown-menu" aria-labelledby="filter-year">
									<div id="filter__years"></div>
								</div>
							</div>

						</div>

						<button class="filter__btn" type="button">Tìm kiếm</button>

					</div>
				</div>
			</div>
		</div>
	</div>
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
	</div>

         );
    }
}
 
export default MovieCatalog;