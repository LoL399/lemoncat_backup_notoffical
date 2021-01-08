let Best = require("../models/best-movies");

const create = (req, res) => {
  var best = {
    name: req.body.name,
    movie: req.body.movie,
  };

  const newBest = new Best(best);

  newBest
    .save()
    .then(() => res.json("Best added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getAll = (req, res) => {
  Best.find()
    .then((results) => res.json(results))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getById = (req, res) => {
  Best.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateById = (req, res) => {
  Best.findById(req.params.id)
    .then((result) => {
      result.name = req.body.name;
      result.movie = req.body.movie;

      result
        .save()
        .then(() => res.json("Best updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteById = (req, res) => {
  Best.findByIdAndDelete(req.params.id)
    .then(() => res.json("Best deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = { create, getAll, getById, updateById, deleteById };
