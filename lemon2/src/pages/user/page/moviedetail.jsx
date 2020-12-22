import React, { Component } from 'react';
import cover from '../common/images/covers-cover.jpg';
import '../common/css/costumecss.css'
import ReactPlayer from 'react-player'
import Rating  from 'material-ui-rating'
import bg from '../common/images/home-home__bg.jpg'
import movieservice from '../service/movieservice';
import Wait from '../../Other/LoadingScreen';
import { Link } from 'react-router-dom';
import reviewservice from '../../admin/service/reviewservice';
import userservice from '../service/userservice';
import { Next } from 'react-bootstrap/esm/PageItem';

class MovieDetail extends Component {
	state = {  readMore: false, movieInfo: null }
	componentDidMount(){
		movieservice.getOne(this.props.match.params.id).then(res=> 
			{
				this.setState({movieInfo: res.data},  () => console.log(res.data));
			}
			).catch((err)=>alert(`Toang rồi đại ca, mạng mất hoặc server có vấn đề. Chi tiết: \n ${err}`))
			

		// console.log(this.props.match.params.id)

	}

	
	readMoreBtn(){
		this.state.readMore === false ? this.setState({readMore: true}) : this.setState({readMore: false})
	}

    render() { 


        return ( 
			<div className="h-100">
            <section className="home homecolor border-0 ">
				<div className="detail__bg gbMovie">

				</div>
				{this.state.movieInfo===null? <div className="d-block mx-auto container"><Wait/></div>:

                <div className="container">

					<div className="card card--details card--series homecolor border-0">
						<div className="row">
						<div className="col-12">
					    <h1 className="details__title ">{this.state.movieInfo.name}</h1>

				    	</div>
							<div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3">
								<div className="card__cover">
									<img src={this.state.movieInfo.poster} alt=""/>
								</div>
							</div>
							<div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-9">
								<div className="card__content">
									{/* <div className="card__wrap">
										<span className="card__rate"> {(this.state.movieInfo.userScore + this.state.movieInfo.lemonScore)/2  } <i className="icon ion-ios-star"></i></span>
									</div> */}
									<div className="col-12 col-xl-12 col-sm-12 ">
										<div className="row">
										<div className = "col-12 col-md-6 col-xl-6">
										<div class="card w-100">
										<div class="card-body homecolor borderGradient">
											<h5 className="card-title text-light">Điểm người dùng: {this.state.movieInfo.userScore}/10 <i className="icon ion-ios-star"></i> </h5>
											<div className="score metaReview" style={{width: `${this.state.movieInfo.userScore*10}%`}}></div>

										</div>
										</div>

										</div>
										<div className = "col-12 col-md-6 col-xl-6">
										<div class="card">
										<div class="card-body homecolor borderGradient">
											<h5 className="card-title text-light">Điểm lemon đánh giá: {this.state.movieInfo.lemonScore}/10 <i className="icon ion-ios-star"></i></h5>
											<div className="score metaReview" style={{width: `${this.state.movieInfo.lemonScore*10}%`}}></div>

										</div>
										</div>
										</div>
										</div>


									</div>
									<h1 className="text-light">Thông tin phim:</h1>

									<div className="col-12 col-xl-12 col-sm-12 ">

									<ul className="card__meta">
										<li><span>Genre:</span> 
										{this.state.movieInfo.genres.map((genre,idx)=>{
											return(
												<Link>{genre}</Link>
											)

										})}
										</li>
										{/* <li><span>Release year:</span> 2017</li>
										<li><span>Running time:</span> 120 min</li> */}
										<li><span>Đạo diễn: </span> {this.state.movieInfo.director.name}</li>
										<li><span>Tác giả:</span> {this.state.movieInfo.writer.name}</li>
										{/* <div class="details__devices">
											<span class="details__devices-title">Available on devices:</span>
											<ul class="details__devices-list">
												<li><i class="icon ion-logo-apple"></i><span>IOS</span></li>
												<li><i class="icon ion-logo-android"></i><span>Android</span></li>
												<li><i class="icon ion-logo-windows"></i><span>Windows</span></li>
												<li><i class="icon ion-md-tv"></i><span>Smart TV</span></li>
											</ul>
										</div> */}

									</ul>

									</div>


									<h2 className="card__rate mt-5">Tóm tắt phim: </h2>
									<p className="text-light">( Có thể sẽ có lộ 1 tí cốt truyện của bộ phim)</p>
									<div className="b-description_readmore_wrapper js-description_readmore_wrapper" ><div className={ this.state.readMore === false ? "card__description card__description--details b-description_readmore_ellipsis detailReadmore":"card__description card__description--details b-description_readmore_ellipsis" }  >
										
										{this.state.movieInfo.summary }
									</div>
									<div className="b-description_readmore_button" onClick={()=>this.readMoreBtn()}></div>
									</div>
								</div>
							</div>
						</div>
						<h3 className="content__title">Trailer</h3>
						<div className=" d-flex justify-content-center">
						<ReactPlayer url={this.state.movieInfo.trailer[0]}/>
						</div>
					</div>
					


				</div>
	}


            </section>
			<section className="content">
			<div className="content__head container">
			<div className="container">
				<div className="row">
					<div className="col-12">

						<h2 className="content__title">Khám phá</h2>

						<ul className="nav nav-tabs content__tabs border-0" id="content__tabs" role="tablist">
							{/* <li className="nav-item">
								<a className="nav-link active" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Bình luận</a>
							</li> */}

							<li className="nav-item">
								<a className="nav-link active" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Đánh giá</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">Photos</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">Diễn viên/Đạo diễn</a>
							</li>
						</ul>

						<div className="content__mobile-tabs" id="content__mobile-tabs">
							<div className="content__mobile-tabs-btn dropdown-toggle" role="navigation" id="mobile-tabs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<input type="button" value="Comments"/>
								<span></span>
							</div>

							<div className="content__mobile-tabs-menu dropdown-menu" aria-labelledby="mobile-tabs">
								<ul className="nav nav-tabs" role="tablist">
									<li className="nav-item" data-value="comments"><a className="nav-link active" id="1-tab" data-toggle="tab" href="#tab-1" role="tab" aria-controls="tab-1" aria-selected="true">Bình luận</a></li>
									<li className="nav-item" data-value="reviews"><a className="nav-link" id="2-tab" data-toggle="tab" href="#tab-2" role="tab" aria-controls="tab-2" aria-selected="false">Đánh giá</a></li>
									<li className="nav-item" data-value="photos"><a className="nav-link" id="3-tab" data-toggle="tab" href="#tab-3" role="tab" aria-controls="tab-3" aria-selected="false">Photos</a></li>
									<li className="nav-item" data-value="photos"><a className="nav-link" id="4-tab" data-toggle="tab" href="#tab-4" role="tab" aria-controls="tab-4" aria-selected="false">Diễn viên/ Đạo diễn</a></li>
								</ul>
							</div>
						</div>

					</div>
				</div>
			</div>
			<div className="container mt-4">
				<div className="row">
					<div className="col-12 col-lg-8 col-xl-8">
						<div className="tab-content" id="myTabContent">
							{/* <div className="tab-pane fade active show" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
								<CommentArea login={true}/>
							</div> */}
							<div className="tab-pane fade active show " id="tab-2" role="tabpanel" aria-labelledby="2-tab">
							{/* Hey listen */}
								<ReviewArea id={this.props.match.params.id}/>
							</div>
							<div className="tab-pane fade " id="tab-3" role="tabpanel" aria-labelledby="3-tab">
							{/* Hey listen */}
								{
									// this.state.movieInfo.photo ? <PhotoList /> :
									// <div>
									// 	<h1 className="details__title ">Không có hình ảnh thêm</h1>
									// </div>
								}
							</div>
							<div className="tab-pane fade " id="tab-4" role="tabpanel" aria-labelledby="4-tab">
							{/* Hey listen */}
								<PersonInvol casts={this.state.movieInfo} />
							</div>
				
						</div>
					</div>
					<div className="col-12 col-lg-4 col-xl-4">
						<div className="col-12">
							<h2 className="section__title section__title--sidebar">Bạn nên xem qua ...</h2>
						</div>
						{/* Item */}
						<div className="col-sm-7 col-lg-9 mx-auto">
							<div className="card homecolor border-0">
								<div className="card__cover">
									<img src={cover} alt=""/>
									<a href="#" className="card__play">
										<i className="icon ion-ios-play"></i>
									</a>
								</div>
								<div className="card__content">
									<h3 className="card__title"><a href="#">I Dream in Another Language</a></h3>
									<span className="card__category">
										<a href="#">Action</a>
										<a href="#">Triler</a>
									</span>
									<span className="card__rate"><i className="icon ion-ios-star"></i>8.4</span>
								</div>
							</div>
						</div>
					</div>

					</div>
			</div>
		</div>		
			</section>
		</div>
         );
    }
}

class CommentArea extends Component {
	state = { logIn: this.props.login }
	render() { 
		return ( 							
		<div className="row">
		<div className="comments">
			{/* Hey listen */}
			<ul className="comments__list">
					<li className="comments__item">
						<div className="comments__autor">
							<img className="comments__avatar" src={cover} alt=""/>
							<span className="comments__name">John Doe</span>
							<span className="comments__time">30.08.2018, 17:53</span>
						</div>
						<p className="comments__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
						<div className="comments__actions">

							<button type="button"><i className="icon ion-ios-trash"></i>Xóa</button>

						</div>
					</li>
					<li className="comments__item">
						<div className="comments__autor">
							<img className="comments__avatar" src="images/img-user.svg" alt=""/>
							<span className="comments__name">John Doe</span>
							<span className="comments__time">30.08.2018, 17:53</span>
						</div>
						<p className="comments__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>

					</li>

					
				</ul>
				{
					this.state.logIn === true ? 				
					<form action="#" className="form">
					<textarea id="text" name="text" className="form__textarea" placeholder="Bình luận ..."></textarea>
					<button type="button" className="form__btn">Đăng</button>
					</form>
					:
					<button className="sign__btn" type="button">Đăng nhập để có thể bình luận</button>

				}

		</div>

	</div> );
	}
}

class ReviewArea extends Component {

	state={reviewList: null, isLogin: false, userId: "", name: "", content: "", starNumber: -1, already: false }

	componentDidMount(){
		this.loadData();

	}
	loadData(){
		let arr = []
		reviewservice.getByMovie(this.props.id).then(res => {
				this.setState({reviewList: res.data,});
				userservice.getInfo().then((res) => {
					if(res.data && res.data !=null)
					{
						this.setState({userId: res.data._id}, ()=>console.log(this.state.userId));
						this.setState({isLogin: true})
						this.state.reviewList.forEach(element => {
							if(element.byUser._id === res.data._id)
							{
								this.setState({already: true});
							}

							
						});
					}
				}).catch(()=> this.setState({isLogin: false}))
		})
		console.log(this.props.isLogin) 

	}

	handleChange = event => {
		this.setState({[event.target.name]: event.target.value});
		console.log(event.target.value)
	}


	handleRatingChange = (value)=> {
		this.setState({starNumber: value})
	}

	submit(){
		if(this.state.name !== "" && this.state.content !=="" && this.state.starNumber > 0)
		{
			const data ={
				name: this.state.name,
				content: this.state.content,
				byUser: this.state.userId,
				forMovie: this.props.id,
				userScore: this.state.starNumber

			}
			console.log(data)
			// reviewservice.add(data).then(res => console.log(res))
		}

	}



	render() { 
		return ( 							
		<div className="row">

		<div className="col-12">

			
		<div className="reviews">
					{this.state.isLogin === true ?	

					<div>
						{this.state.already === true ? <button className="sign__btn" type="button">
							Bạn đã đánh giá rồi! Xin cảm ơn bạn dã để lại ý kiến
						</button>
						:<div className="form">
							<input type="text" className="form__input" placeholder="Tựa đề bài đánh giá" name="name" onChange={this.handleChange} required/>
							<textarea className="form__textarea" placeholder="Đánh giá"  name="content" onChange={this.handleChange} required></textarea>
							<div className="form__slider">
							<Rating
								name="simple-controlled"
								value={this.state.starNumber}
								max={10}
								onChange={this.handleRatingChange}
								// onChangeActive={(event, newHover) => {
								//   setHover(newHover);
								// }}
								/>
							{this.state.starNumber < 0 ? <span className="text-danger font-italic">Xin hãy cho điểm trước khi đăng nhé</span> : null}
							</div>
							<button type="button" className="form__btn" onClick={()=>this.submit()}>Đăng</button>
						</div>}
					</div>

					: <Link to="/home/login" className="sign__btn" type="button">Đăng nhập để có thể đánh giá</Link>
					}


					</div>

			<div className="reviews">
				

				{this.state.reviewList===null? <div className="d-block mx-auto container"><Wait/></div>:
				<div>
					{this.state.reviewList.map((review)=>{
						let date = new Date(String(review.createdAt));
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
							
				<ul className="reviews__list">
				<li className="reviews__item">
					<div className="reviews__autor">
						<img className="reviews__avatar" src={review.byUser && review.byUser.photo} alt=""/>
						<span className="reviews__name">{review.name}</span>
						<span className="reviews__time">{dt+'/' + month + '/'+year} by {review.byUser && review.byUser.name} </span>

						<span className="reviews__rating"><i className="icon ion-ios-star"></i>{review.userScore}</span>
					</div>
					<p className="reviews__text">{review.content}.</p>
				</li>
				<div class="comments__actions">
				{review.byUser === localStorage.getItem('personId')	 ? <button type="button"><i class="icon ion-ios-bin"></i>Xóa</button> : null}
				<button type="button"><i class="icon ion-ios-share-alt"></i>Phản hồi</button>

				</div>
				{/* Reply */}
				{/* <li class="comments__item comments__item--answer">
					<div class="comments__autor">
						<img class="comments__avatar" src="images/img-user.svg" alt=""/>
						<span class="comments__name">John Doe</span>
						<span class="comments__time">24.08.2018, 16:41</span>
					</div>
					<p class="comments__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
					<div class="comments__actions">

						<button type="button"><i class="icon ion-ios-share-alt"></i>Xóa</button>
					</div>
				</li> */}

				</ul>
						)
					})}
				</div>
				}
			

		</div>
		</div>

	</div> );
	}
}

class  PhotoList extends Component {
	state = {  }
	render() { 
		return ( 
			<div class="gallery" itemscope="" data-pswp-uid="1">
				<div class="row">

					<figure class="col-12 col-sm-6 col-xl-4" itemprop="associatedMedia" itemscope="">
						<a href="images/gallery-project-1.jpg" itemprop="contentUrl" data-size="1920x1280">
							<img src={cover} itemprop="thumbnail" alt="Image description"/>
						</a>
						<figcaption itemprop="caption description">Some image caption 1</figcaption>
					</figure>
				</div>
			</div>
		 );
	}
}
class PersonInvol extends Component {
	state = { casts: [], director: {}, writer: {} }
	render() { 
		return ( 
			<div className="container">
				<h4 className="content__title">Diễn viên tham gia</h4>
				<div className="row">
				
				<div class="col-sm-6">
                <div class="card homecolor border-0 mr-2">
                <div class="row">
                    <div class=" col-sm-6">
                        <img src={cover} className="img-thumbnail mx-auto d-block w-75 h-75"/>
                        
                    </div>
                    <div class=" col-sm-6">  
                    <div class="card-body">
                       
                        <div className=" text-light" >
                            It is a long established fact that a reader.
                        </div>
                        <small className="text-light">09/09/2020</small>
                    </div>
                    </div>
 
                    </div>
                </div>
            	</div>

			</div>
			<h4 className="content__title">Đạo diễn</h4>
			<div className="row">
				
				<div class="col-sm-6">
                <div class="card homecolor border-0 mr-2">
                <div class="row">
                    <div class=" col-sm-6">
                        <img src={cover} className="img-thumbnail mx-auto d-block w-75 h-75"/>
                        
                    </div>
                    <div class=" col-sm-6">  
                    <div class="card-body">
                       
                        <div className="text-light" >
                            It is a long established fact that a reader.
                        </div>
                        <small className="text-light">09/09/2020</small>
                    </div>
                    </div>
 
                    </div>
                </div>
            </div>
			</div>
			</div>
		 );
	}
}


export default MovieDetail;
