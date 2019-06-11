const Post = require('../models/posts');

exports.getPosts = (req, res, next) => {
  Post.fetchPosts()
    .then(posts => {
      res.send({posts})
    })
    .catch(err => console.log(err))
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const author = req.body.author;
  const updateDate = req.body.updateDate || new Date();

  const post = new Post(title, imageUrl, description, author, updateDate);
  post.save()
    .then(result => {
      console.log('Created product');
      res.redirect('/posts');
    })
    .catch(err => {
      console.log(err);
    });
};
