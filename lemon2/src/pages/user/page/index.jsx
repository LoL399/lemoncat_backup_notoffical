import React, { Component } from 'react';
import cover from '../common/images/covers-cover.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import movieservice from '../service/movieservice';
import Wait from '../../Other/LoadingScreen';
import { Link } from 'react-router-dom';
class MainPage extends Component {
	state = { hotList: null, movieList: null, newsList: null }
	
	componentDidMount(){
		this.loadData()

	}

	loadData(){
		movieservice.listHot().then(res => {this.setState({hotList: res.data});console.log(res.data)}).catch((err)=>alert(`Toang rồi đại ca, mạng mất hoặc server có vấn đề. Chi tiết: \n ${err}`))
		movieservice.listNew().then(res => {this.setState({movieList: res.data});console.log(res.data)}).catch((err)=>alert(`Toang rồi đại ca, mạng mất hoặc server có vấn đề. Chi tiết: \n ${err}`))
	}


    render() { 
		
        return ( 	
		<div>
        <section className="home p-3">
		<div className="container">
			<div className="row">
				<div class="col-12">
					<h1 class="home__title">CHƯƠNG TRÌNH MỚI CỦA MÙA</h1>
				</div>

				{/* {this.state.hotList===null? <div className="d-block mx-auto"><Wait/></div>:<MovieDeck list={this.state.hotList}/>}
				 */}
				{this.state.hotList===null? <div className="d-block mx-auto"><Wait/></div>:	<div className="col-12">
					<div className=" owl-carousel home__carousel owl-loaded">
						
						<div className="owl-stage-outer ">
							<div className="owl-stage">
							<CarouselManager list={this.state.hotList}/>
							</div>


						</div>
						
					</div>
				</div>} 	
		</div>
	</div>
	</section>
	<section className="content homecolor">
	<div className="content__head">
			<div className="container">
				<div className="row">
					<div className="col-12">

						<h2 className="content__title">MỚI - NÓNG - SỐT DẺO</h2>

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
		<div className="container">
			<div className="tab-content" id="myTabContent">
				<div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
				{this.state.hotList===null? <div className="d-block mx-auto"><Wait/></div>:<MovieList list={this.state.hotList}/>}
				</div>
				
				<div class="tab-pane fade" id="tab-2" role="tabpanel" aria-labelledby="2-tab">
				<div class="col-sm-6">
                <div class="card homecolor border-0 mr-2">
                <div class="row">
                    <div class=" col-sm-6">
                        <img src={cover} className=" mx-auto d-block w-75 h-75"/>
                        
                    </div>
                    <div class=" col-sm-6">  
                    <div class="card-body">
                       
                        <div className="card__description card__description--details b-description_readmore_ellipsis text-light" >
                            <h3 className="text-light">It is a long established fact that a reader.</h3>
							<small className="text-light">09/09/2020</small>
                        </div>

						<button className="sign__btn" type="button">Đọc thêm →</button>

                    </div>
                    </div>
 
                    </div>
                </div>
            </div>
				</div>
			</div>
		</div>

	</section>
	</div>);
    }
}

class MovieList extends Component {
	state = {  }
	render() { 
		return ( 					
		<div className="row">
		{/* item */}
		{this.props.list.map((movie,idx) => {
			return(
				<div className="col-6 col-sm-12 col-lg-6">
				<div className="card card--list homecolor border-0">
					<div className="row">
						<div className="col-12 col-sm-4">
							<div className="card__cover">
								<img src={movie.poster} className="imgCard" alt="poster"/><a href="#" className="card__play">
									<i className="icon ion-ios-play"></i>
								</a>
							</div>
						</div>
	
						<div className="col-12 col-sm-8">
							<div className="card__content">
								<h3 className="card__title cardheader"><Link to={`/home/detail/${movie._id}`} href="#">{movie.name}</Link></h3>
								<span className="card__category">
									{movie.genres.map((genre,idx)=>{
										return(
											<a href="#">{genre}</a>
										)

									})}


								</span>
	
								{/* <div className="card__wrap">
									<span className="card__rate"><i className="icon ion-ios-star"></i>8.4</span>
	
									<ul className="card__list"><li>HD</li>
										<li>16+</li>
									</ul></div> */}
	
								<div className="card__description ">
									<p className="text-justify">{movie.summary}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
		})}

		



	</div> );
	}
}


class MovieDeck extends Component {
	state = {  }



	render() { 
		return ( 				
		<section className="card-list">

			{this.props.list.map((movie,idx)=>{
				if(movie.hot)
				{
					return(					
					<article className="card2">
					<header className="border-0">
						<Link to={`/home/detail/${movie._id}`} className="pointercursor"> <h4 className=" text-light cardheader">{movie.name}</h4></Link>
					</header>
					<img  className="posterImg mt-3 " src={movie.poster} alt="1"/>

		
					</article>)

				}
			})}
	

{/* 

			<article className="card2">
			<header className="border-0">
				<a className="pointercursor"> <h2 className=" text-light cardheader">Tên phim</h2></a>
			</header>
			<img  className="posterImg mt-3" src={cover} alt="1"/>

			</article> */}
			


		</section>
	 );
	}
}
class  CarouselManager extends Component {
	state = {  }
	render() { 
		const responsive = {
			superLargeDesktop: {
			  // the naming can be any, depends on you.
			  breakpoint: { max: 4000, min: 3000 },
			  items: 5
			},
			desktop: {
			  breakpoint: { max: 3000, min: 1024 },
			  items: 3
			},
			tablet: {
			  breakpoint: { max: 1024, min: 464 },
			  items: 2
			},
			mobile: {
			  breakpoint: { max: 464, min: 0 },
			  items: 1
			}
		  };
		return ( 
		<Carousel responsive={responsive} className="owl-stage">
			{/* item */}
			{this.props.list.map((movie,idx)=>{
				if(movie.hot)
				{
				  return(
					<div className="owl-item cloned owlSlide">
					<div className="item">
						<div className="card card--big homecolor border-0">
							<div className="card__cover">
								<img className="slideshow" src={movie.poster} alt="1" /><a href="#" className="card__play">
									<i className="icon ion-ios-play"></i></a>
							</div>
							<div className="card__content text-center homecolor">
							<Link to={`/home/detail/${movie._id}`} className="pointercursor"><h3 className="card__title">{movie.name}</h3></Link>
								<span className="card__rate "><i className="icon ion-ios-star text-right"></i>4.4</span>
							</div>
						</div>
	
					</div>
	
				</div>
				  )
				}
			})}


			</Carousel> );
	}
}

export default MainPage;