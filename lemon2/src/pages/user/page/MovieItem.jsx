import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MovieItem extends Component {

	state = { }
	render() { 
		return ( 
			<div class="row">
			{/* Item */}
			{this.props.list.movies.map((movie,idx)=>{
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





			</div>

		 );
	}
}

export default MovieItem;