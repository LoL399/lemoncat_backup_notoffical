let Movie = require("../models/movies");

const create = (req, res) => {
  var movie = {
    name: req.body.name,
    summary: req.body.summary,
    poster: req.body.poster,
    trailer: req.body.trailer,
    studio: req.body.studio,
    rating: req.body.rating,
    genres: req.body.genres,
    theater: req.body.theater,
    images: req.body.images,
    casts: req.body.casts,
    director: req.body.director,
    writer: req.body.writer,
  };

  const newMovie = new Movie(movie);

  newMovie
    .save()
    .then(() => res.json("Movie added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getAll = (req, res) => {
  Movie.find()
    .then((movies) => res.json(movies))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getAllActive = (req, res) => {
  let perPage = 12; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.params.page || 1 ; 
  let allItem = 0
  let allpage = 0
  console.log(req.body)
    Movie.find({status: true }).then(data => {
    allItem = data.length; 
    if(allItem%perPage > 0)
    {
      allpage = Math.floor(allItem/perPage) + 1

    }
    else
    {
      allpage = Math.floor(allItem/perPage)
    };    
    Movie.find({status: true }).select("name poster genres").skip((perPage * page) - perPage).limit(perPage)
    .then((movies) => res.json({
        movies: movies,
        page: allpage}))
    .catch((err) => res.status(400).json("Error: " + err));})
};


const searchByGenres = (req, res) => {
  let perPage = 8; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.params.page || 1 ; 
  let allItem = 0
  let allpage = 0
  console.log(req.body.genres)
    Movie.find({status: true, genres: req.body.genres }).then(data => {
    allItem = data.length; 
    if(allItem%perPage > 0)
    {
      allpage = Math.floor(allItem/perPage) + 1

    }
    else
    {
      allpage = Math.floor(allItem/perPage)
    };    
    Movie.find({status: true, genres: req.body.genres }).select("name poster genres").skip((perPage * page) - perPage).limit(perPage)
    .then((movies) => res.json({
        movies: movies,
        page: allpage}))
    .catch((err) => res.status(400).json("Error: " + err));})
};

const getAllHot = (req, res) => {
  Movie.find({hot: true, status: true}).select("name poster genres hot lemonScore")
    .then((movies) => res.json(movies))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getNewest = (req,res) => {
  Movie.find({status: true, sort: { 'created_at' : -1 }} ).select("name poste genres").limit(6).then(data => res.json(data)).catch((err) => res.status(400).json("Error: " + err));
}

const getById = (req, res) => {
  console.log(req.params);
  Movie.findById(req.params.id).populate("director", "name poster").populate("writer ", "name poster").populate("casts.person", "name poster")
    .then((movie) => res.json(movie))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateById = (req, res) => {

  console.log(req.body.genres)

  Movie.findById(req.params.id)
    .then((movie) => {
      movie.name = req.body.name;
      movie.summary = req.body.summary;
      movie.poster = req.body.poster;
      movie.trailer = req.body.trailer;
      movie.studio = req.body.studio;
      movie.rating = req.body.rating;
      movie.genres = req.body.genres;
      movie.theater = req.body.theater;
      movie.images = req.body.images;
      movie.casts = req.body.casts;
      movie.director = req.body.director;
      movie.writer = req.body.writer;
      movie.hot = req.body.hot;
      movie.userScore = req.body.userScore;
      movie.status = req.body.status;
      movie.lemonScore = req.body.lemonScore;


      movie
        .save()
        .then(() => res.json("Movie updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const adminUpdateById = (req, res) => {
  console.log(req.body.genres)
  Movie.findById(req.params.id)
    .then((movie) => {
      movie.name = req.body.name;
      movie.summary = req.body.summary;
      movie.poster = req.body.poster;
      movie.trailer = req.body.trailer;
      movie.studio = req.body.studio;
      movie.rating = req.body.rating;
      movie.genres = req.body.genres;
      movie.theater = req.body.theater;
      movie.images = req.body.images;
      movie.casts = req.body.casts;
      movie.director = req.body.director;
      movie.writer = req.body.writer;
      movie.hot = req.body.hot;
      movie.status = req.body.status;
      movie.lemonScore = req.body.lemonScore;
      
      movie
        .save()
        .then(() => res.json("Movie updated!"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const deleteById = (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json("Movie deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};
const searchByName = (req, res) => {

  console.log(req.params.search)
  var results = new RegExp('.*' + req.params.search  + '.*', 'i')
  Movie.find({name: results, status: true}).select("name poster userScore genres")
  .then((movie) => res.json(movie))
  .catch((err) => res.status(400).json("Error: " + err));
}


module.exports = {
  create,
  getAll,
  getAllHot,
  getAllActive,
  getById,
  updateById,
  deleteById,
  adminUpdateById,
  getNewest, searchByName, searchByGenres
};
