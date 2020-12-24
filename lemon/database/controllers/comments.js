let Comment = require("../models/comments");

const create = (req, res) => {
  var comment = {
    byUser: req.body.byUser,
    content: req.body.content,
  };

  const newComment = new Comment(comment);

  newComment
    .save()
    .then((nComment) => res.json(nComment._id))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getAll = (req, res) => {
  Comment.find()
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getById = (req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => res.json(comment))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateById = (req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      comment.content = req.body.content;

      comment
        .save()
        .then(() => res.json("Comment updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteById = (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Comment deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = { create, getAll, getById, updateById, deleteById };
