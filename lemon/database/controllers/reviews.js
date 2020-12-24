let Review = require("../models/reviews");

const create = (req, res) => {
  console.log(req.body)
  var review = {
    byUser: req.body.byUser,
    name: req.body.name,
    content: req.body.content,
    forMovie: req.body.forMovie,
    userScore: req.body.userScore,
    // tag: req.body.tag,
    comment: [],
  };

  const newReview = new Review(review);

  newReview
    .save()
    .then(() => res.json("Reviews added!"))
    .catch((err) => console.log(err));
};

const getAll = (req, res) => {
  // console.log("here")
  Review.find().populate("comment.comment", "content byUser")
    .catch((err) => res.status(400).json("Error: " + err));
};

const getByMovie= (req, res) => {
  Review.find({forMovie: req.params.id, active: true}).populate("byUser","name photo").populate("comment.comment", "content byUser createAt")
  .then((reviews) => {res.json(reviews)})
  .catch((err) => res.status(400).json("Error: " + err));
}

const getById = (req, res) => {
  Review.findById(req.params.id)
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateById = (req, res) => {
  console.log(req.body.like)
  Review.findById(req.params.id)
    .then((review) => {
      review.name = req.body.name;
      review.content = req.body.content;
      review.forMovie = req.body.forMovie;
      review.userScore = req.body.userScore;
      review.tag = req.body.tag;
      review.comment = req.body.comment;
      review.like = req.body.like
      review
        .save()
        .then(() => res.json("review updated!"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const adminUpdateById = (req, res) => {
  Review.findById(req.params.id)
    .then((review) => {
      review.name = req.body.name;
      review.content = req.body.content;
      review.forMovie = req.body.forMovie;
      review.userScore = req.body.userScore;
      review.active = req.body.active;
      review.tag = req.body.tag;
      review.hot = req.body.hot;

      review
        .save()
        .then(() => res.json("Review updated!"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const deleteById = (req, res) => {
  Review.findByIdAndDelete(req.params.id)
    .then(() => res.json("Review deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  adminUpdateById,
  getByMovie,
};
