const login = require("../controllers/login");
const comments = require("../../../database/controllers/comments");
const reviews = require("../../../database/controllers/reviews");
const news = require("../../../database/controllers/news");
const movies = require("../../../database/controllers/movies");
const users = require("../../../database/controllers/users");
const router = require("express").Router();
const jwtcheck = require("../../auth/auth")

router.post("/login", login.login);
router.post("/reset-password", login.sendPasswordToMail);
router.post("/signin", login.signIn);
router.get("/userData/:id", login.getUserData);
router.get("/getInfo", jwtcheck.authenticateUser , login.getInfo);
router.post("/userupdate", jwtcheck.authenticateUser , login.updateByUser);
router.post("/updatePass", jwtcheck.authenticateUser , login.updatePass);

router.post("/comments/create", jwtcheck.authenticateUser, comments.create);
router.get("/comments/get", comments.getAll);
router.get("/comments/get-by-id/:id", comments.getById);
router.put("/comments/update/:id", jwtcheck.authenticateUser, comments.updateById);
router.delete("/comments/delete/:id", jwtcheck.authenticateUser, comments.deleteById);

router.post("/reviews/create", jwtcheck.authenticateUser, reviews.create);
router.get("/reviews/get", reviews.getAll);
router.get("/reviews/get-by-id/:id", reviews.getById);
router.get("/reviews/get-by-movie/:id", reviews.getByMovie);
router.get("/reviews/getUserScore/:id", reviews.getUserScore);
router.post("/reviews/update/:id", jwtcheck.authenticateUser, reviews.updateById);
router.delete("/reviews/delete/:id", jwtcheck.authenticateUser, reviews.deleteById);
router.get("/reviews/byUser/:id", reviews.getByUser);

router.post("/news/create", news.create);
router.get("/news/get", news.getAll);

router.get("/news/search/:search", news.searchByName);
router.get("/news/getNewest", news.getNewest);
router.get("/news/getActive/:page", news.getAllActive);
router.get("/news/get-by-id/:id", news.getById);
router.post("/news/update/:id", jwtcheck.authenticateUser, news.updateById);
router.delete("/news/delete/:id", jwtcheck.authenticateUser, news.deleteById);



router.get("/users/get-by-id/:id", jwtcheck.authenticateUser, users.clientgetByID);

router.post("/movies/create", jwtcheck.authenticateUser, movies.create);
router.get("/movies/search/:search", movies.searchByName);
router.get("/movies/getActive/:page", movies.getAllActive);
router.post("/movies/byGenres/:page", movies.searchByGenres);
router.get("/movies/getHot", movies.getAllHot);
router.get("/movies/getNewest", movies.getNewest);

// router.get("/movies/get", movies.getAll);
router.get("/movies/get-by-id/:id", movies.getById);
router.post("/movies/update/:id", jwtcheck.authenticateUser, movies.updateById);
router.delete("/movies/delete/:id", movies.deleteById);


module.exports = router;
