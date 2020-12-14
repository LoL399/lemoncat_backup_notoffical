let Person = require("../models/persons");

const create = (req, res) => {
  var person = {
    name: req.body.name,
    birthDate: req.body.birthDate,
    bornIn: req.body.bornIn,
    summary: req.body.summary,
    poster: req.body.poster,
    photos: req.body.photos,
  };

  const newPerson = new Person(person);

  newPerson
    .save()
    .then(() => res.json("Person added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getAll = (req, res) => {
  Person.find()
    .then((Persons) => res.json(Persons))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getById = (req, res) => {
  Person.findById(req.params.id)
    .then((Person) => res.json(Person))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateById = (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      person.name = req.body.name;
      person.birthDate = req.body.birthDate;
      person.bornIn = req.body.bornIn;
      person.summary = req.body.summary;
      person.poster = req.body.poster;
      person.photos = req.body.photos;

      person
        .save()
        .then(() => res.json("Person updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteById = (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.json("Person deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = { create, getAll, getById, updateById, deleteById };
