const login = require("../controllers/login");
const movies = require("../../../database/controllers/movies");
const persons = require("../../../database/controllers/persons");
const users = require("../../../database/controllers/users");
const comments = require("../../../database/controllers/comments");
const reviews = require("../../../database/controllers/reviews");
const news = require("../../../database/controllers/news");
const best = require("../../../database/controllers/best-movies");

const router = require("express").Router();

router.post("/login", login.login);

router.post("/users/create", users.create);
router.get("/users/get", users.getAll);
router.get("/users/get-by-id/:id", users.getById);
router.post("/users/update/:id", users.adminUpdateById);
router.delete("/users/delete/:id", users.deleteById);

router.post("/persons/create", persons.create);
router.get("/persons/get", persons.getAll);
router.get("/persons/get-by-id/:id", persons.getById);
router.post("/persons/update/:id", persons.updateById);
router.delete("/persons/delete/:id", persons.deleteById);

router.post("/movies/create", movies.create);
router.get("/movies/get", movies.getAll);
router.get("/movies/get-by-id/:id", movies.getById);
router.post("/movies/update/:id", movies.updateById);
router.delete("/movies/delete/:id", movies.deleteById);

router.post("/comments/create", comments.create);
router.get("/comments/get", comments.getAll);
router.get("/comments/get-by-id/:id", comments.getById);
router.post("/comments/update/:id", comments.updateById);
router.delete("/comments/delete/:id", comments.deleteById);

router.post("/reviews/create", reviews.create);
router.get("/reviews/get", reviews.getAll);
router.get("/reviews/get-by-id/:id", reviews.getById);
router.get("/reviews/get-by-movie/:id", reviews.getByMovie);
router.post("/reviews/update/:id", reviews.adminUpdateById);
router.delete("/reviews/delete/:id", reviews.deleteById);

router.post("/news/create", news.create);
router.get("/news/get", news.getAll);
router.get("/news/get-by-id/:id", news.getById);
router.post("/news/update/:id", news.adminUpdateById);
router.delete("/news/delete/:id", news.deleteById);

router.post("/best/create", best.create);
router.get("/best/get", best.getAll);
router.get("/best/get-by-id/:id", best.getById);
router.post("/best/update/:id", best.updateById);
router.delete("/best/delete/:id", best.deleteById);

module.exports = router;
