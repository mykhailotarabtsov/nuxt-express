const Post = require('../models/posts');

exports.getPosts = (req, res, next) => {
  Post.fetchPosts()
    .then(posts => {
      res.send({posts, user: req.user})
    })
    .catch(err => console.log(err))
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const previewText = req.body.previewText;
  const author = req.body.author;
  const updateDate = req.body.updateDate || new Date();
  const userId = req.body._id

  const post = new Post(title, imageUrl, description, previewText, author, updateDate, userId);
  post.save()
    .then(result => {
      console.log('Created product');
      res.status(200).send({ _id: result });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.editPost = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const previewText = req.body.previewText;
  const author = req.body.author;
  const updateDate = req.body.updateDate || new Date();
  const editId = req.body.editId;

  const post = new Post(title, imageUrl, description, previewText, author, updateDate, '', editId);
  post.editPost()
    .then(result => {
      console.log('Updated');
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
    });
}

exports.deletePost = (req, res, next) => {
  Post.deletePost(req.body.postId)
    .then(result => {
      console.log('Deleted from DB');
      res.status(200).end();
    })
    .catch(err => console.log(err))
}
