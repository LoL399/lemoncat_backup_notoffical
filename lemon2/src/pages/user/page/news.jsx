import React, { Component } from 'react';
import cover from '../common/images/covers-cover.jpg';
import newsservice from '../service/newsservice';
import renderHTML from 'react-render-html';
import Wait from '../../Other/LoadingScreen';
import userservice from '../service/userservice';
import commentservice from '../service/commentservice';
class NewsDetail extends Component {
	state = { isLogin: true, newsInfo: null, date: "" }


	componentDidMount(){

		newsservice.getOne(this.props.match.params.id).then(res=> 
			{
				this.setState({newsInfo: res.data}, 
					 ()=>{
						 console.log(res.data)
						let date = new Date(String(this.state.newsInfo.createdAt));
						this.setState({year: String(date.getFullYear()) })
						this.setState({month: String(date.getMonth()+1)})
						this.setState({dt: String(date.getDate()) })
					}
				
					)
			}
			).catch((err)=>alert(`Toang rồi đại ca, mạng mất hoặc server có vấn đề. Chi tiết: \n ${err}`))
		// console.log(this.props.match.params.id)
	}
    render() { 
        return ( 
            <div className="h-100">
                <section className="section details homecolor border-0 ">
                <div className="container">
                    <div className="row">
                    <div className="col-12 col-lg-8 col-xl-8 content__head container">
					{this.state.newsInfo===null? <div className="d-block mx-auto container"><Wait/></div>:

					<div>
					
                        <h2 className="content__title">{this.state.newsInfo.name}</h2>
                            <div className="container">
                            <div className="card card--details card--series homecolor border-0">
                            <div className="row">
                            <div className="col-12">
                            </div>
                                
                                    <div className="card__content">
                                        <div className="card__wrap">
                                            <ul className="card__list">
                                                <li>Tác giả: {this.state.newsInfo.byUser.name} </li>
                                                <li>Ngày đăng: {this.state.dt + '/'+this.state.month+'/'+this.state.year}</li>
                                            </ul>
                                        </div>
                                        <div className="b-description_readmore_wrapper js-description_readmore_wrapper" ><div className="card__description card__description--details b-description_readmore_ellipsis" >
											<div  dangerouslySetInnerHTML={{__html: this.state.newsInfo.content}}></div>
                                        </div>

                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                            </div>
					</div>}
                            <hr className="newshr"/>
							{
								this.state.newsInfo === null ? null : <CommentNews newsInfo={this.state.newsInfo}/>
							}
                            

                        </div>
                        <div className="col-12 col-lg-3 col-xl-3 ">
						<div className="col-12">
							<h2 className="section__title section__title--sidebar">You may also like...</h2>
						</div>
						{/* Item */}
						<div className=" col-sm-7 col-lg-12 mx-auto">
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
						<div className="col-sm-7 col-lg-12 mx-auto">
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
                <div className="container">
				<h2 className="section__title">Tin tức mới nhất</h2>
					<NewsSection/>
				</div>
				</section>
                
            </div>

         );
    }
}

class NewsSection extends Component {
	state = {  }
	render() { 
		return (         
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
		</div> );
	}
}


class CommentNews extends Component {
	state = { logIn: true, newsInfo: null, content: "" }

	componentDidMount(){
		userservice.getInfo().then(()=>{
			this.setState({logIn: true})
		}).catch(()=>{this.setState({logIn: false})})
		this.setState({newsInfo: this.props.newsInfo})
	}
	

	submit(){
		if(this.state.content !== "" && this.state.logIn ) 
		{
			const data = {
				byUser: localStorage.getItem("personId"),
				content: this.state.content
			}
			console.log(data);
			commentservice.add(data).then(res =>{
				let commentlist = this.state.newsInfo
				let comment = {
					comment: res.data,
					like: [], 
					subComment: []
				}
					commentlist.comment.push(comment)
					newsservice.update(commentlist._id,commentlist ).then(res => {window.location.reload(0)})
			})


		}
	}

	render() { 
		return ( 							
		<div className="ml-1 p-3">
            <h4 className="text-light mb-3">Bình luận</h4>
		<div className="comments">
			{/* Hey listen */}

				{
					this.state.logIn === true ? 				
					<div className="form">
					<textarea id="text" name="text" className="form__textarea" placeholder="Bình luận ..." onChange={(e)=>{  this.setState({content: e.target.value},()=>{console.log(e.target.value)})}}>{this.state.content}</textarea>
					<button type="button" className="form__btn" onClick={()=>this.submit()}>Đăng</button>
					</div>
					:
					<button className="sign__btn" type="button">Đăng nhập để có thể bình luận</button>

				}

		</div>
		{this.state.newsInfo === null ? null :		
		<ul className="comments__list">
			{this.state.newsInfo.comment.map((comment)=>{
				return(
					<li className="comments__item">
						<CommentItem comment={comment}/>
				</li>
				)

			})}


					
		</ul> }


	</div> );
	}
}
class CommentItem extends Component {
	state = { name: "", photo: "" }

	componentDidMount(){
		userservice.getUserInfo(this.props.comment.comment.byUser).then(res => {this.setState({name: res.data.name, photo: res.data.photo})})
	}


	
	render() { 
		let date = new Date(String(this.props.comment.comment.createdAt));
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let dt = date.getDate();
		if (dt < 10) {
		dt = '0' + dt;
		}
		if (month < 10) {
		month = '0' + month;
		}
		return ( 
			<div>
			<div class="comments__autor">
				<img class="comments__avatar" src={this.state.photo} alt=""/>
				<span class="comments__name">{this.state.name}</span>
				<span className="comments__time">{dt+'/' + month + '/'+year}</span>
			</div>
			
			<p class="comments__text">{this.props.comment.comment.content}</p>
			</div>
 );
	}
}


 
export default NewsDetail;