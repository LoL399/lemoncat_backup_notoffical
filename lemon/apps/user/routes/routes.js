const login = require("../controllers/login");
const comments = require("../../../database/controllers/comments");
const reviews = require("../../../database/controllers/reviews");
const news = require("../../../database/controllers/news");

const router = require("express").Router();

router.post("/login", login.login);
router.post("/reset-password", login.sendPasswordToMail);
router.post("/signin", login.signIn);

router.post("/comments/create", comments.create);
router.get("/comments/get", comments.getAll);
router.get("/comments/get-by-id/:id", comments.getById);
router.put("/comments/update/:id", comments.updateById);
router.delete("/comments/delete/:id", comments.deleteById);

router.post("/reviews/create", reviews.create);
router.get("/reviews/get", reviews.getAll);
router.get("/reviews/get-by-id/:id", reviews.getById);
router.put("/reviews/update/:id", reviews.updateById);
router.delete("/reviews/delete/:id", reviews.deleteById);

router.post("/news/create", news.create);
router.get("/news/get", news.getAll);
router.get("/news/get-by-id/:id", news.getById);
router.put("/news/update/:id", news.updateById);
router.delete("/news/delete/:id", news.deleteById);

module.exports = router;
