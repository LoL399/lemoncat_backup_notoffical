import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wait from '../../Other/LoadingScreen';
import cover from '../common/images/covers-cover.jpg';
import movieservice from '../service/movieservice';
import newsservice from '../service/newsservice';
import MovieItem from './MovieItem';
class SearchPage extends Component {
    state = { searchFor: "", listMovie: null, listReview: null}

    componentDidMount(){
        console.log(this.props.match.params.search)
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.search !== this.props.match.params.search) {
          this.loadData();
        }
      }

    loadData(){
        this.setState({searchFor: this.props.match.params.search }, () =>{
            movieservice.searchFor(this.state.searchFor).then(res => this.setState({listMovie: res.data}));
            newsservice.searchFor(this.state.searchFor).then(res => this.setState({listReview: res.data}))
        })

    }

    render() { 
        return ( 
            <div>
                {/* <section className="section section--first section--bg homecolor p-3 mb-3 w-50 mx-auto d-block" ><div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section__wrap">
                                    <h2 className="section__title">Tìm kiếm mục phim: </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
    <section className="section home homecolor p-0 mb-0 d-block content">
	<div className="content__head">
			<div className="container">
				<div className="row">
					<div className="col-12">

						<h2 className="content__title">Tìm kiếm: {this.state.searchFor}</h2>

						<ul className="nav nav-tabs content__tabs border-0" id="content__tabs" role="tablist">
							<li className="nav-item">
								<a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Phim ảnh</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Tin tức</a>
							</li>
						</ul>
						<div className="content__mobile-tabs" id="content__mobile-tabs">
							<div className="content__mobile-tabs-btn dropdown-toggle" role="navigation" id="mobile-tabs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<input type="button" value="New items"/><span></span>
							</div>

							<div className="content__mobile-tabs-menu dropdown-menu" aria-labelledby="mobile-tabs">
								<ul className="nav nav-tabs border-0" role="tablist"><li className="nav-item" data-value="new releases"><a className="nav-link active" id="1-tab" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Phim ảnh</a></li>

									<li className="nav-item" data-value="movies"><a className="nav-link" id="2-tab" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Tin tức</a></li>
								</ul></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="container well">
			<div className="tab-content" id="myTabContent">
				<div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
				{this.state.listMovie===null ? <div className="d-block mx-auto"><Wait/></div>:
                <div className="row">

                    {this.state.listMovie.length < 1 ? <h2 className="text-light">không tìm thấy kết quả nào hết</h2> : null}


                    {this.state.listMovie.map((movie, idx)=>{
                        return(
                            <div class="col-6 col-sm-4 col-lg-3 col-xl-2 homecolor">
                            <div class="card border-0 homecolor">
                                <div class="card__cover" >
                                    <img src={movie.poster} alt=""/><Link to={`/home/detail/${movie._id}`} class="card__play">
                                        <i class="icon ion-ios-play"></i>
                                    </Link>
                                </div>
                                <div class="card__content">
                                    <h3 class="card__title "><Link to={`/home/detail/${movie._id}`}>{movie.name}</Link></h3>
                                    <span class="card__category">
                                        {movie.genres.map((genre,idx)=>{
                                            
                                        return(
                                            <a href="#">{genre}</a>
                                        )
        
                                        })}
                                        
                                    </span>
                                    <span class="card__rate"><i class="icon ion-ios-star"></i>{movie.userScore}</span>
                                </div>
                            </div>
                            </div>
                        )
                    })}
                    </div>}
				</div>
				
				<div class="tab-pane fade" id="tab-2" role="tabpanel" aria-labelledby="2-tab">
                {this.state.listReview===null ? <div className="d-block mx-auto"><Wait/></div>:
                <div class="row">
                    {this.state.listReview.length < 1 ? <h2 className="text-light">không tìm thấy kết quả nào hết</h2> : null}
                {this.state.listReview.map((news,idx)=>{
                let date = new Date(String(news.createdAt));
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let dt = date.getDate();
                
                if (dt < 10) {
                  dt = '0' + dt;
                }
                if (month < 10) {
                  month = '0' + month;
                }
				return(
					<div class="col-sm-6">
                <div class="card homecolor mr-2">
                <div class="row">
                    <div class=" col-sm-6">
                        <img src={news.poster} className=" mt-4 mx-auto d-block w-75 h-75"/>
                        
                    </div>
                    <div class=" col-sm-6">     
                    <div class="card-body">
                       
                        <div className="text-light" >
                            <h3 className="text-light">{news.name}.</h3>
							<small className="text-light">{dt+'/' + month + '/'+year}</small>
                        </div>

						<Link to={`/home/news/${news._id}`}><button className="sign__btn" type="button">Đọc thêm →</button></Link>

                    </div>
                    </div>
 
                    </div>
                </div>
            </div>
				)
			})}
                
                
                
                
                </div>}
                    


				</div>
			</div>
		</div>

	</section>
                




            </div>
         );
    }
}
 
export default SearchPage;