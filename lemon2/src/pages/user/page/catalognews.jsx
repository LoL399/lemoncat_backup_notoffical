import React, { Component } from 'react';
import cover from '../common/images/covers-cover.jpg';
import { Link } from "react-router-dom";
import newsservice from '../service/newsservice';
import Wait from '../../Other/LoadingScreen';

// class cardSlide extends Component {
//     state = {  }
//     render() { 
//         const cardStyle={
//             backgroundImage : `url(${this.props})`
//         }
//         return ( 
//             <div class="card3" style={cardStyle}>a</div>
//          );
//     }
// }


class NewsCatalog extends Component {
    state = { listNews: {}, page: 1  }

    
	componentDidMount(){

        this.loadData();

	}
	
	loadData(){
		newsservice.list(this.state.page).then(res => {this.setState({listNews: res.data}); console.log(this.state.listNews)})
	}

	setPage(bool,where){
		this.setState({listNews: {}})
		if(bool)
		{

			this.setState({page: this.state.page + where},()=>{newsservice.list(this.state.page).then(res => {this.setState({listNews: res.data}); console.log(this.state.listNews)})})
			

		}
		else
		{
			this.setState({page: where},()=>{newsservice.list(this.state.page).then(res => {this.setState({listNews: res.data}); console.log(this.state.listNews)})})
		}

    }
    
    render() { 
        return ( 
            <div>
            <section className="section section--first section--bg homecolor p-3" ><div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section__wrap">
                            <h2 className="section__title">Tin mới nhất hôm nay</h2>
                            <ul className="breadcrumb homecolor"><li className="breadcrumb__item"><Link to="/home/">Trang chủ</Link></li>
                                <li className="breadcrumb__item breadcrumb__item--active">Tin tức mới</li>
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
								<span class="filter__item-label">PHÂN LOẠI:</span>

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
        {/* <div className="row">
            <div className="col-lg-6 col-sm-12">
                <div class="card bg-dark text-white homecolor border-0 mt-5">
                <img class="card-img newest-news h-75 img-fluid" src={cover} alt="Card image cap"/>
                <div class="">
                    <p class="card-text font-weight-bold">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
            </div>
            <div className="col-lg-6 ">
                <div className="col col-sm-12">
                <div class="card bg-dark text-white homecolor border-0">
                <img class="card-img newest-news2 mx-auto d-block img-fluid w-75" src={cover} alt="Card image cap"/>
                <div class=" mx-auto d-block w-75">
                    <p class="card-text font-weight-bold">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
                </div>
                <div className="col col-sm-12">
                <div class="card bg-dark text-white  homecolor border-0">
                <img class="card-img newest-news2 mx-auto d-block img-fluid w-75" src={cover} alt="Card image cap"/>
                <div class="mx-auto d-block w-75">
                    <p class="card-text font-weight-bold">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
                </div>  
                
            </div>

        </div> */}
            {/* <section class="animated-grid">
            <div class="card3" style={cardStyle}>a</div>
            <div class="card3">b</div>
            <div class="card3">c</div>
            <div class="card3">d</div>
            <div class="card3">e</div>
            <div class="card3">f</div>
            <div class="card3">g</div>
            <div class="card3">h</div>
            <div class="card3">i</div>
            <div class="card3">j</div>
            <div class="card3">k</div>
            <div class="card3">l</div>
            <div class="card3">main</div>
            </section> */}

        <h2 className="section__title">Tin tức mới nhất</h2>
        

            {/* Item */}
            {Object.keys(this.state.listNews).length === 0 ? <div className="d-block mx-auto"><Wait/></div>:
			<div>

				<NewsItem page={this.state.page} list={this.state.listNews}/>
                <div class="col-12">
					<ul class="paginator">
						{this.state.page > 1 ?
						<li class="paginator__item paginator__item--prev">
						<a a className="pointercursor" onClick={()=> this.setPage(true,-1)}><i class="icon ion-ios-arrow-back"></i></a>
						</li> : null
						 }
						{this.state.page - 1 > 0 ? <li class="paginator__item "><a  className="pointercursor" onClick={()=> this.setPage(false,this.state.page-1)}>{this.state.page - 1}</a></li> : null }
						
						<li class="paginator__item paginator__item--active"><a href="#">{this.state.page}</a></li>
						{this.state.page === this.state.listNews.page ? null : <li class="paginator__item "><a onClick={()=> this.setPage(false,this.state.page+1)} className="pointercursor">{this.state.page + 1}</a></li> }
						{this.state.page < this.state.listNews.page ?
						<li class="paginator__item paginator__item--next">
						<a className="pointercursor" onClick={()=> this.setPage(true,1)}><i class="icon ion-ios-arrow-forward"></i></a>
						</li>: null
						 }

					</ul>
				</div> 
			</div>}
            
        </div>
    </div>
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
			
			{this.props.list.news.map((news,idx)=>{
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
 

export default NewsCatalog;