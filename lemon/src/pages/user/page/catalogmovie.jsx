import React, { Component } from 'react';
import cover from '../common/images/covers-cover.jpg';
import { Link } from "react-router-dom";
import movieservice from '../service/movieservice';
import Wait from '../../Other/LoadingScreen';
import MovieItem from './MovieItem';

const genersOption = [{name:"Hành động",value:"Action"},{name:"Hài kịch",value:"Comedy"},{name:"Kịch",value:"Dramma"}
,{name:"Kinh dị",value:"Horror"},{name:"Tình cảm",value:"Romance"},{name:"Kinh dị - hành động",value:"Thriller"},{name:"Viễn tưởng",value:"Fantasy"}]

class MovieCatalog extends Component {
	state = { listMovie: {}, page: 1, genre: "" }

	componentDidMount(){
		this.loadData();
	}
	
	loadData(){
		movieservice.list(this.state.page).then(res => {this.setState({listMovie: res.data}); console.log(this.state.listMovie)})
	}

	setPage(bool,where){
		this.setState({listMovie: {}})
		if(bool)
		{
			if(this.state.genre === "")
			{
				this.setState({page: this.state.page + where},()=>{movieservice.list(this.state.page).then(res => {this.setState({listMovie: res.data}); console.log(this.state.listMovie)})})

			}
			else
			{
				this.setState({page: this.state.page + where},()=>{movieservice.searchByGenres(this.state.page).then(res => {this.setState({listMovie: res.data}); console.log(this.state.listMovie)})})
			}
			

		}
		else
		{
			if(this.state.genre === "")
			{
				this.setState({page: where},()=>{movieservice.list(this.state.page).then(res => {this.setState({listMovie: res.data}); console.log(this.state.listMovie)})})

			}
			else
			{
				this.setState({page: where},()=>{movieservice.searchByGenres(this.state.page).then(res => {this.setState({listMovie: res.data}); console.log(this.state.listMovie)})})
			}
			
		}

	}
	selectHandler = (e)=>{
		this.setState({genre: e.target.value}, ()=> {

			this.setState({listMovie: {}})

			if(this.state.genre === "")
			{
				this.loadData()

			}
			else
			{
				movieservice.searchByGenres(1,{genres : this.state.genre}).then(res => this.setState({listMovie: res.data}))

			}


		})

	}

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
            <div className="filter">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<div className="filter__content">
						<div className="filter__items ">
						<div className="input-group mb-3 ">
						<div className="input-group-prepend">
							<label className="input-group-text" for="inputGroupSelect01">Options</label>
						</div>
						<select className="custom-select" name="genre" onChange={this.selectHandler}>
						<option selected={this.state.genre === ""} value="">Chọn thể loại...</option>
							{genersOption.map((genre)=>{
								return(<option value={genre.value} selected={this.state.genre === genre.value}>{genre.name}</option>)
							})}
							{/* <option selected>Choose...</option>
							<option value="1" >One</option>
							<option value="2">Two</option>
							<option value="3">Three</option> */}
						</select>
						</div>



						</div>
{/* 
						<button className="filter__btn" type="button">Tìm kiếm</button> */}

					</div>
				</div>
			</div>
		</div>
	</div>
    <div className="catalog">
		<div className="container">	
			{Object.keys(this.state.listMovie).length === 0 ? <div className="d-block mx-auto"><Wait/></div>:
			<div>
				{this.state.listMovie.movies.length < 1 ? <h2 className="text-light">không tìm thấy kết quả nào hết</h2> : null}
				<MovieItem  list={this.state.listMovie}/>

				<div className="col-12">
					<ul className="paginator">
						{this.state.page > 1 ?
						<li className="paginator__item paginator__item--prev">
						<a a className="pointercursor" onClick={()=> this.setPage(true,-1)}><i className="icon ion-ios-arrow-back"></i></a>
						</li> : null
						 }
						{this.state.page - 1 > 0 ? <li className="paginator__item "><a  className="pointercursor" onClick={()=> this.setPage(false,this.state.page-1)}>{this.state.page - 1}</a></li> : null }
						<li className="paginator__item paginator__item--active"><a href="#">{this.state.page}</a></li>
						{this.state.page === this.state.listMovie.page ? null : <li className="paginator__item "><a onClick={()=> this.setPage(false,this.state.page+1)} className="pointercursor">{this.state.page + 1}</a></li> }
						{this.state.page < this.state.listMovie.page ?
						<li className="paginator__item paginator__item--next">
						<a className="pointercursor" onClick={()=> this.setPage(true,1)}><i className="icon ion-ios-arrow-forward"></i></a>
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

export default MovieCatalog;