const login = require("../controllers/login");
const movies = require("../../../database/controllers/movies");
const persons = require("../../../database/controllers/persons");
const users = require("../../../database/controllers/users");
const comments = require("../../../database/controllers/comments");
const reviews = require("../../../database/controllers/reviews");
const news = require("../../../database/controllers/news");
const best = require("../../../database/controllers/best-movies");
const jwtcheck = require("../../auth/auth")

const router = require("express").Router();

router.post("/login", login.login);

router.post("/users/create",jwtcheck.authenticateAdmin, users.create);
router.get("/users/get",jwtcheck.authenticateAdmin, users.getAll);
router.get("/users/get-by-id/:id",jwtcheck.authenticateAdmin, users.getById);
router.post("/users/update/:id",jwtcheck.authenticateAdmin, users.adminUpdateById);
router.delete("/users/delete/:id",jwtcheck.authenticateAdmin, users.deleteById);

router.post("/persons/create",jwtcheck.authenticateAdmin, persons.create);
router.get("/persons/get",jwtcheck.authenticateAdmin, persons.getAll);
router.get("/persons/get-by-id/:id",jwtcheck.authenticateAdmin, persons.getById);
router.post("/persons/update/:id",jwtcheck.authenticateAdmin, persons.updateById);
router.delete("/persons/delete/:id",jwtcheck.authenticateAdmin, persons.deleteById);

router.post("/movies/create",jwtcheck.authenticateAdmin, movies.create);
router.get("/movies/get",jwtcheck.authenticateAdmin, movies.getAll);
router.get("/movies/get-by-id/:id",jwtcheck.authenticateAdmin, movies.getById);
router.post("/movies/update/:id",jwtcheck.authenticateAdmin, movies.updateById);
router.delete("/movies/delete/:id",jwtcheck.authenticateAdmin, movies.deleteById);

router.post("/comments/create",jwtcheck.authenticateAdmin, comments.create);
router.get("/comments/get",jwtcheck.authenticateAdmin, comments.getAll);
router.get("/comments/get-by-id/:id",jwtcheck.authenticateAdmin, comments.getById);
router.post("/comments/update/:id",jwtcheck.authenticateAdmin, comments.updateById);
router.delete("/comments/delete/:id",jwtcheck.authenticateAdmin, comments.deleteById);

router.post("/reviews/create",jwtcheck.authenticateAdmin, reviews.create);
router.get("/reviews/get",jwtcheck.authenticateAdmin, reviews.getAll);
router.get("/reviews/get-by-id/:id",jwtcheck.authenticateAdmin, reviews.getById);
router.get("/reviews/byMovie/:id",jwtcheck.authenticateAdmin, reviews.getByMovieAdmin);
router.get("/reviews/byUser/:id",jwtcheck.authenticateAdmin, reviews.getByUser);
router.post("/reviews/update/:id",jwtcheck.authenticateAdmin, reviews.adminUpdateById);
router.delete("/reviews/delete/:id",jwtcheck.authenticateAdmin, reviews.deleteById);

router.post("/news/create",jwtcheck.authenticateAdmin, news.create);
router.get("/news/get",jwtcheck.authenticateAdmin, news.getAll);
router.get("/news/get-by-id/:id",jwtcheck.authenticateAdmin, news.getById);
router.post("/news/update/:id",jwtcheck.authenticateAdmin, news.adminUpdateById);
router.delete("/news/delete/:id",jwtcheck.authenticateAdmin, news.deleteById);

router.post("/best/create",jwtcheck.authenticateAdmin, best.create);
router.get("/best/get",jwtcheck.authenticateAdmin, best.getAll);
router.get("/best/get-by-id/:id",jwtcheck.authenticateAdmin, best.getById);
router.post("/best/update/:id",jwtcheck.authenticateAdmin, best.updateById);
router.delete("/best/delete/:id",jwtcheck.authenticateAdmin, best.deleteById);

module.exports = router;
