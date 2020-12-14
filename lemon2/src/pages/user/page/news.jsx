import React, { Component } from 'react';
import cover from '../common/images/covers-cover.jpg';
class NewsDetail extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="h-100">
                <section className="section details homecolor border-0 ">
                <div className="container">
                    <div className="row">
                    <div className="col-12 col-lg-8 col-xl-8 content__head container">
                        <h2 className="content__title">Tựa</h2>
                            <div className="container">
                            <div className="card card--details card--series homecolor border-0">
                            <div className="row">
                            <div className="col-12">
                            </div>
                                
                                    <div className="card__content">
                                        <div className="card__wrap">
                                            <ul className="card__list">
                                                <li>By: Hello</li>
                                                <li>10/10/2010</li>
                                            </ul>
                                        </div>
                                        <div className="b-description_readmore_wrapper js-description_readmore_wrapper" ><div className="card__description card__description--details b-description_readmore_ellipsis" >
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                        </div>

                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                            </div>
                            <hr className="newshr"/>
                            <CommentNews/>

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
	state = { logIn: true }
	render() { 
		return ( 							
		<div className="ml-1 p-3">
            <h4 className="text-light mb-3">Bình luận</h4>
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
						<div className="comments__actions">
						</div>
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

 
export default NewsDetail;