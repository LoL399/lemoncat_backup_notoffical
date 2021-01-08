  let User = require("../models/users");

const create = (req, res) => {
  console.log(req.body)
  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    photo: req.body.photo,
    role: req.body.role || "user",
    status: true,
    review: [],
    news: [],
  };

  const newUser = new User(user);

  newUser
    .save()
    .then(() => res.status(201).json("User added!"))
    .catch((err) => console.log(err));
};

const getAll = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

const clientgetByID = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.json({
        name: user.name,
        poster: user.photo
      })
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.password = req.body.password;
      user.name = req.body.name;
      user.photo = req.body.photo;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteById = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

const adminUpdateById = (req, res) => {

  console.log(req.body)
  User.findById(req.params.id)
    .then((user) => {
      user.password = req.body.password;
      user.name = req.body.name;
      user.photo = req.body.photo;
      user.status = req.body.status;
      user.role = req.body.role;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  adminUpdateById,clientgetByID
};
