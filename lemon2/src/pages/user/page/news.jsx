import React, { Component } from 'react';
import cover from '../common/images/covers-cover.jpg';
import newsservice from '../service/newsservice';
import renderHTML from 'react-render-html';
import Wait from '../../Other/LoadingScreen';
import userservice from '../service/userservice';
import commentservice from '../service/commentservice';
import Dialog from 'react-bootstrap-dialog';
import { Link } from 'react-router-dom';
import movieservice from '../service/movieservice';
class NewsDetail extends Component {
	state = { isLogin: true, newsInfo: null, date: "", recommedList: null, listNews: null }


	componentDidMount(){
		movieservice.list(this.state.page).then(res => {this.setState({recommedList: res.data.movies}); console.log(this.state.recommedList)})
		newsservice.list(this.state.page).then(res => {this.setState({listNews: res.data.news}); console.log(this.state.listNews)})

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
				<div className="details__bg bgMovie">

				</div>
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
							<h2 className="section__title section__title--sidebar">Các phim được đề xuất...</h2>
						</div>
						{/* Item */}
						{
							this.state.recommedList === null ? <div className="d-block mx-auto container"><Wait/> </div> :
							<div>
							<div className="col-sm-7 col-lg-9 mx-auto">
							<div className="card homecolor border-0">
								<div className="card__cover">
									<img src={this.state.recommedList[0].poster} alt=""/>
									<a href="#" className="card__play">
										<i className="icon ion-ios-play"></i>
									</a>
								</div>
								<div className="card__content">
									<h3 className="card__title cardheader"><Link to={`/home/detail/${this.state.recommedList[0]._id}`}>{this.state.recommedList[0].name}</Link></h3>
								</div>
							</div>
							</div>


							<div className="col-sm-7 col-lg-9 mx-auto">
							<div className="card homecolor border-0">
								<div className="card__cover">
									<img src={this.state.recommedList[1].poster} alt=""/>
									<a href="#" className="card__play">
										<i className="icon ion-ios-play"></i>
									</a>
								</div>
								<div className="card__content">
									<h3 className="card__title cardheader"><Link to={`/home/detail/${this.state.recommedList[1]._id}`}>{this.state.recommedList[1].name}</Link></h3>
								</div>
							</div>
							</div>
							</div>



						}
					</div>
                    </div>
                </div>
                <div className="container">
				<h2 className="section__title">Tin tức mới nhất</h2>
				{this.state.listNews=== null ? <div className="d-block mx-auto container"><Wait/></div> :<NewsItem  list={this.state.listNews}/>}
				</div>
				</section>
                
            </div>

         );
    }
}

class NewsItem extends Component {

	state = { }



	render() { 
		return ( 
			<div class="row">
			{/* Item */}
			
			{this.props.list.map((news,idx)=>{
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





			</div>

		 );
	}
}

class CommentNews extends Component {
	state = { logIn: true, newsInfo: null, content: "", recommedList: null  }

	componentDidMount(){
		movieservice.list(this.state.page).then(res => {this.setState({recommedList: res.data.movies}); console.log(this.state.recommedList)})
		userservice.getInfo().then(()=>{
			this.setState({logIn: true})
		}).catch(()=>{this.setState({logIn: false})})
		this.setState({newsInfo: this.props.newsInfo})
	}
	removeConfirm=comment=>{
		this.dialog.show({
		  title: 'Xác nhận',
		  body: 'Bạn có muốn xóa bài bình luận ?',
		  actions: [
			Dialog.CancelAction(),
			Dialog.OKAction(() => {
				let item = this.state.newsInfo;
				item.comment.pop((e)=> {return e._id=== comment._id}) 
				this.setState({newsInfo: item},()=>newsservice.update(this.state.newsInfo._id,this.state.newsInfo).then(res => console.log(res)
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
						<div class="comments__actions">
						{comment.comment.byUser=== localStorage.getItem('personId')	 ? <button type="button" onClick={()=>this.removeConfirm()}><i class="icon ion-ios-bin" ></i>Xóa</button> : null}

						</div>
						<Dialog ref={(el) => { this.dialog = el }} />
			
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