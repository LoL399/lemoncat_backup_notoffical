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
    .catch((err) => console.log(err));
};

const getById = (req, res) => {
  News.findById(req.params.id).populate("byUser", "name").populate("comment.comment", "byUser content createdAt")
    .then((news) => res.json(news))
    .catch((err) => res.status(400).json("Error: " + err));
};

const updateById = (req, res) => {
  console.log(req.body.comment)
  News.findById(req.params.id)
    .then((news) => {
      news.name = req.body.name;
      news.content = req.body.content;
      news.category = req.body.category;
      news.tag = req.body.tag;
      news.comment = req.body.comment;

      news
        .save()
        .then(() => res.json("Movie updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};


const searchByName = (req, res) => {
  var results = new RegExp('.*' + req.params.search  + '.*', 'i')

  News.find({name: results}).select("-content -tag -comment -like")
  .then((news) => res.json(news))
  .catch((err) => res.status(400).json("Error: " + err));
}

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
      news.poster = req.body.poster;
      news.comment = req.body.comment;

      news
        .save()
        .then(() => res.json("Movie updated!"))
        .catch((err) => console.log(err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

const deleteById = (req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then(() => res.json("News deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

const getNewest = (req,res) => {
  News.find({active: true}).limit(6).then(data => res.json(data)).catch((err) => res.status(400).json("Error: " + err));
}



const getAllActive = (req, res) => {
  let perPage = 8; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.params.page ; 
  let allItem = 0
  let allpage = 0

  console.log(page)

  
  News.find({active: true}).then(data => {
    allItem = data.length; 
    if(allItem%perPage > 0)
    {
      allpage = Math.floor(allItem/perPage) + 1

    }
    else
    {
      allpage = Math.floor(allItem/perPage)
    };    
    
    News.find({active: true}).skip((perPage * page) - perPage).limit(perPage)
    .then((news) => res.json({
        news: news,
        page: allpage}))
    .catch((err) => res.status(400).json("Error: " + err));})

  

  

};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  adminUpdateById,
  getAllActive,  getNewest, searchByName
};
