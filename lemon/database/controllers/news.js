let News = require("../models/news");

const create = (req, res) => {
  var news = {
    byUser: req.body.byUser,
    name: req.body.name,
    content: req.body.content,
    category: req.body.categoryforMovie,
    tag: req.body.tag,
    comment: [],
  };

  const newNews = new News(news);

  newNews
    .save()
    .then(() => res.json("News added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getAll = (req, res) => {
  News.find()
    .then((news) => res.json(news))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getById = (req, res) => {
  News.findById(req.params.id)
    .then((news) => res.json(news))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateById = (req, res) => {
  News.findById(req.params.id)
    .then((news) => {
      news.name = req.body.name;
      news.content = req.body.content;
      news.category = req.body.category;
      news.tag = req.body.tag;

      movie
        .save()
        .then(() => res.json("Movie updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const adminUpdateById = (req, res) => {
  News.findById(req.params.id)
    .then((news) => {
      news.name = req.body.name;
      news.content = req.body.content;
      news.category = req.body.category;
      news.tag = req.body.tag;
      news.active = req.body.active;
      news.tag = req.body.tag;
      news.hot = req.body.hot;

      movie
        .save()
        .then(() => res.json("Movie updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteById = (req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then(() => res.json("News deleted."))
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
