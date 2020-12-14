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

const getById = (req, res) => {
  console.log(req.params);
  Movie.findById(req.params.id)
    .then((movie) => res.json(movie))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateById = (req, res) => {



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


      movie
        .save()
        .then(() => res.json("Movie updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const adminUpdateById = (req, res) => {
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

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  adminUpdateById,
};