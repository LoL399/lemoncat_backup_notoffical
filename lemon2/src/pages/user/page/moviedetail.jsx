import React, { Component } from 'react';
import cover from '../common/images/covers-cover.jpg';
import '../common/css/costumecss.css'
import ReactPlayer from 'react-player'
import Rating  from 'material-ui-rating'
import bg from '../common/images/home-home__bg.jpg'
import movieservice from '../service/movieservice';
import Wait from '../../Other/LoadingScreen';
import { Link } from 'react-router-dom';

import userservice from '../service/userservice';
import Dialog from 'react-bootstrap-dialog';
import { Next } from 'react-bootstrap/esm/PageItem';
import commentservice from '../service/commentservice';
import reviewservice from '../service/reviewservice'

class MovieDetail extends Component {
	state = {  readMore: false, movieInfo: null }
	componentDidMount(){
		movieservice.getOne(this.props.match.params.id).then(res=> 
			{
				this.setState({movieInfo: res.data},()=>{console.log(res.data)});
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
				
				{this.state.movieInfo === null ? <div className="d-block mx-auto container"><Wait/></div>:

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
										<li><span className="font-weight-bold">Thể loại:</span> 
										{this.state.movieInfo.genres.map((genre,idx)=>{
											return(
												<Link>{genre}</Link>
											)

										})}
										</li>
										{/* <li><span>Release year:</span> 2017</li>
										<li><span>Running time:</span> 120 min</li> */}
										<li><span className="font-weight-bold">Đạo diễn: </span> {this.state.movieInfo.director.name}</li>
										<li><span className="font-weight-bold">Tác giả:</span> {this.state.movieInfo.writer.name}</li>
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


									<h2 className="card__rate mt-5 font-weight-bold">Tóm tắt phim: </h2>
									<p className="text-light font-italic">( Có thể sẽ có lộ 1 tí cốt truyện của bộ phim)</p>
									<div className="b-description_readmore_wrapper js-description_readmore_wrapper" ><div className={ this.state.readMore === false ? "card__description card__description--details b-description_readmore_ellipsis detailReadmore text-justify":"card__description card__description--details b-description_readmore_ellipsis text-justify" }  >
										
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
							{this.state.movieInfo === null ? null : 	
							<ReviewArea id={this.props.match.params.id}/>
}
							</div>
							<div className="tab-pane fade " id="tab-3" role="tabpanel" aria-labelledby="3-tab">
							{/* Hey listen */}
							{this.state.movieInfo === null ? null : <PhotoList photoList={this.state.movieInfo.images}/>}
							</div>
							<div className="tab-pane fade " id="tab-4" role="tabpanel" aria-labelledby="4-tab">
							{/* Hey listen */}
							{this.state.movieInfo === null ? null : 
								<PersonInvol movie={this.state.movieInfo} />}
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
	state = { isLogin: false, listComment: null, content: "" }

	componentDidMount(){
		this.loadData();

	}

	loadData(){

		userservice.getInfo().then(()=>{
			this.setState({isLogin: true})
		}).catch(()=>{this.setState({isLogin: false})})
		this.setState({listComment: this.props.review},()=>console.log(this.state.listComment.comment))
	}

	repopulateState(comment){
		const index = this.state.listComment.comment.findIndex((element)=>{return element._id == comment._id}) 
		let item = this.state.listComment;
		item.comment[index] = comment;
		this.setState({listComment: item},()=>reviewservice.update(this.state.listComment._id,this.state.listComment).then(res => console.log(res)
		).catch(err => console.log(err)))

	}
	removeConfirm=comment=>{
		this.dialog.show({
		  title: 'Xác nhận',
		  body: 'Bạn có muốn xóa bài bình luận ?',
		  actions: [
			Dialog.CancelAction(),
			Dialog.OKAction(() => {
				let item = this.state.listComment;
				item.comment.pop((e)=> {return e._id=== comment._id}) 
				this.setState({listComment: item},()=>reviewservice.update(this.state.listComment._id,this.state.listComment).then(res => console.log(res)
				).catch(err => console.log(err)))
				
				// let item = this.state.listComment;
				// item.comment[index] = comment;
				// this.setState({listComment: item},()=>reviewservice.update(this.state.listComment._id,this.state.listComment).then(res => console.log(res)
				// ).catch(err => console.log(err)))

			})
		  ],
		  bsSize: 'small',
		  onHide: (dialog) => {
			dialog.hide()
			console.log('closed by clicking background.')
		  }
		})
		
	  }

	checkLike(comment){
		if(this.state.isLogin)
		{
			console.log("Hi",comment)
			
			if(comment.like.length == 0){
				console.log("Empty")
				comment.like.push(localStorage.getItem('personId'))
				this.repopulateState(comment)
				console.log(comment.like)
	
				return ;
			}
			if( comment.like.indexOf(localStorage.getItem('personId'))>= 0)
			{
				console.log("Already", comment.like.indexOf(localStorage.getItem('personId')))
				comment.like.pop(localStorage.getItem('personId'))
				console.log(comment.like)
				this.repopulateState(comment)
				// reviewservice.update(review._id,review).then(res => this.repopulateState(review)
				// ).catch(err => console.log(err))
				return ;
			}
			else
			{
				comment.like.push(localStorage.getItem('personId'))
				console.log(comment.like)
				this.repopulateState(comment)
				// reviewservice.update(review._id,review).then(res => this.repopulateState(review)
				// ).catch(err => console.log(err))
				return ;
			}
	
		}
	}

	submit(){
		if(this.state.content !== "" ) 
		{
			const data = {
				byUser: localStorage.getItem("personId"),
				content: this.state.content
			}
			console.log(data);
			commentservice.add(data).then(res =>{
				let commentlist = this.state.listComment
				let comment = {
					comment: res.data,
					like: [], 
					subComment: []
				}
				
				if(commentlist.comment.length==0)
				{
					commentlist.push(comment)
					reviewservice.update(commentlist._id,commentlist ).then(res => {window.location.reload(0)})
				}
				else
				{
					commentlist.comment.push(comment)
					reviewservice.update(commentlist._id,commentlist ).then(res => {window.location.reload(0)})
				}
				
			})


			console.log(this.state.listComment)

		}
	}


	render() { 
		return ( 	
			<li class="comments__item comments__item--quote border-left border-light">
				{
					this.state.isLogin === true ? <div class="header__search-content homecolor p-3 mb-5 ">
					<img src={localStorage.getItem("avatar")} className="reviews__avatar ml-3"/>
					<input type="text" className="ml-5 border-bottom border-light" placeholder=" Viết bình luận..." value={this.state.content} onChange={(e)=>{  this.setState({content: e.target.value})}}/>
					<button type="button" onClick={async ()=> await this.submit()}>Đăng</button>
					</div>: null
				}
				{
					this.state.listComment === null ? <h1>Wait...</h1> : this.state.listComment.comment.map((comment)=>{
						return (
							<div className="ml-3">
							<CommentItem comment={comment}/>
							<div class="comments__actions">
								<div class="comments__rate">
									<button type="button" onClick={()=>this.checkLike(comment)}><i class="icon ion-md-thumbs-up"></i>{comment.like.length}</button>
								</div>
								{comment.comment.byUser === localStorage.getItem('personId')	 ? <button type="button" onClick={()=>this.removeConfirm()}><i class="icon ion-ios-bin" ></i>Xóa</button> : null}
							</div>
							<Dialog ref={(el) => { this.dialog = el }} />
						</div>
						)
					})

				}

			


			</li>
		 );
	}
}

class CommentItem extends Component {
	state = { name: "", photo: "" }

	componentDidMount(){
		userservice.getUserInfo(this.props.comment.comment.byUser).then(res => {this.setState({name: res.data.name, photo: res.data.photo})})
	}


	
	render() { 
		return ( 
			<div>
			<div class="comments__autor">
				<img class="comments__avatar" src={this.state.photo} alt=""/>
				<span class="comments__name">{this.state.name}</span>
			</div>
			
			<p class="comments__text">{this.props.comment.comment.content}</p>
			</div>
 );
	}
}


class ReviewArea extends Component {

	state={reviewList: null, isLogin: false, userId: "", name: "", content: "", starNumber: -1, already: false, readMore: false, message: "Đọc thêm" }
	readMoreBtn(){
		this.state.readMore === false ? this.setState({readMore: true, message: "Thu gọn"}) : this.setState({readMore: false,message: "Đọc thêm"  })
	}

	componentDidMount(){
		this.loadData();

	}
	loadData(){
		reviewservice.getByMovie(this.props.id).then(res => {console.log(res.data)
				this.setState({reviewList: res.data});
				userservice.getInfo().then((res) => {
					if(res.data && res.data !=null)
					{
						this.setState({userId: res.data._id});
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
				userScore: this.state.starNumber,

			}
			console.log(data)
			reviewservice.add(data).then(res => {
				window.location.reload(0);

			})
		}

	}
	
	removeConfirm=review=>{
		this.dialog.show({
		  title: 'Xác nhận',
		  body: 'Bạn có muốn xóa bài đánh giá ?',
		  actions: [
			Dialog.CancelAction(),
			Dialog.OKAction(() => {
			  review.active = !review.active;
			  console.log(review)
			  reviewservice.update(review._id,review).then(() => { 
				  // console.log(res)         
				window.location.reload();
				}).catch(err => console.log(err))
			})
		  ],
		  bsSize: 'small',
		  onHide: (dialog) => {
			dialog.hide()
			console.log('closed by clicking background.')
		  }
		})
		
	  }
	repopulateState(review){
		const index = this.state.reviewList.findIndex((element)=>{return element._id == review._id}) 
		let item = this.state.reviewList;
		item[index] = review;
		this.setState({reviewList: item})

	}
	checkLike(review){
		if(this.state.isLogin)
		{
			if(review.like.length == 0){
				console.log("Empty")
				review.like.push(localStorage.getItem('personId'))
				reviewservice.update(review._id,review).then(res => this.repopulateState(review)
				).catch(err => console.log(err))
				console.log(review.like)
	
				return ;
			}
			if( review.like.indexOf(localStorage.getItem('personId'))>= 0)
			{
				console.log("Already", review.like.indexOf(localStorage.getItem('personId')))
				review.like.pop(localStorage.getItem('personId'))
				reviewservice.update(review._id,review).then(res => this.repopulateState(review)
				).catch(err => console.log(err))
				return ;
			}
			else
			{
				review.like.push(localStorage.getItem('personId'))
				reviewservice.update(review._id,review).then(res => this.repopulateState(review)
				).catch(err => console.log(err))
				return ;
			}
	
		}
	}
	
	render() { 
		return ( 							
		<div className="row">

		<div className="col-12">
		<div className="b-description_readmore_wrapper js-description_readmore_wrapper" ><div className={ this.state.readMore === false ? "card__description card__description--details b-description_readmore_ellipsis reviewReadmore":"card__description card__description--details b-description_readmore_ellipsis" }  >

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
				<div class="comments__rate">
						<button type="button" onClick={()=>this.checkLike(review)}><i class="icon ion-md-thumbs-up"></i>{review.like.length}</button>
					</div>
				{review.byUser._id === localStorage.getItem('personId')	 ? <button type="button" onClick={()=>this.removeConfirm(review)}><i class="icon ion-ios-bin" ></i>Xóa</button> : null}
				<button type="button"><i class="icon ion-ios-share-alt"></i>Phản hồi</button>

				</div>
				<CommentArea review={review}/>


				</ul>
						)
					})}
					<Dialog ref={(el) => { this.dialog = el }} />
				</div>
				}
			

		</div>
		</div>

		<div className="b-description_readmore_button" onClick={()=>this.readMoreBtn()}></div>
		<h5 className= " text-light cardheader pointercursor text-center"  onClick={()=>this.readMoreBtn()}>{this.state.message}</h5> 

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
					{this.props.photoList.map((photo,idx)=>{
						return(
							<figure class="col-12 col-sm-6 col-xl-4" itemprop="associatedMedia" itemscope="">
							<img src={photo} itemprop="thumbnail" alt="Image description"/>
								<figcaption itemprop="caption description">Hình {idx}</figcaption>
							</figure>
						)
						


					})}

				</div>
			</div>
		 );
	}
}
class PersonInvol extends Component {
	state = { casts: null, director: null, writer: null }

	componentDidMount(){
		this.loadData();
	}


	loadData()
	{
		this.setState({casts: this.props.movie.casts})
		this.setState({director: this.props.movie.director})
		this.setState({writer: this.props.movie.writer})
	}


	render() { 
		return ( 
			<div className="container">
				<h4 className="content__title">Diễn viên tham gia</h4>

				{this.state.casts === null ? <div className="d-block mx-auto container"><Wait/></div>: 
					<div className="row">
						{this.state.casts.map((cast,idx)=>{
							return(
								<div class="col-sm-6">
								<div class="card homecolor border-0 mr-2">
								<div class="row">
									<div class=" col-sm-6">
										<img src={cast.person.poster} className="img-thumbnail mx-auto d-block"/>
										
									</div>
									<div class=" col-sm-6">  
									<div class="card-body">
									
										<div className=" text-light" >
											{cast.person.name}
										</div>
										<small className="text-light">Trong vai: {cast.characterName}</small>
									</div>
									</div>
				
									</div>
								</div>
								</div>
							)
								

						})}

				</div>}

			<h4 className="content__title">Các nhân vật khác</h4>
			<div className="row">
				{this.state.director === null ? <div className="d-block mx-auto container"><Wait/></div> :
								
								<div class="col-sm-6">
								<div class="card homecolor border-0 mr-2">
								<div class="row">
									<div class=" col-sm-6">
										<img src={this.state.director.poster} className="img-thumbnail mx-auto d-block"/>
										
									</div>
									<div class=" col-sm-6">  
									<div class="card-body">
									   
										<div className="text-light" >
											{this.state.director.name}
										</div>
									</div>
									</div>
				 
									</div>
								</div>
							</div>}
						{this.state.writer === null ? <div className="d-block mx-auto container"><Wait/></div> :
							
							<div class="col-sm-6">
							<div class="card homecolor border-0 mr-2">
							<div class="row">
								<div class=" col-sm-6">
									<img src={this.state.writer.poster} className="img-thumbnail mx-auto d-block"/>
									
								</div>
								<div class=" col-sm-6">  
								<div class="card-body">
									
									<div className="text-light" >
										{this.state.writer.name}
									</div>
								</div>
								</div>
				
								</div>
							</div>
						</div>}


			</div>
			</div>
		 );
	}
}


export default MovieDetail;
