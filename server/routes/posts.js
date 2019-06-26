const path = require('path');
const express = require('express');
const postsController = require('../controllers/posts.js');
const router = express.Router();

router.post('/posts/add-post', postsController.postAddProduct);

router.get('/get-posts', postsController.getPosts);

router.post('/posts/edit-post', postsController.editPost);

router.post('/posts/delete-one', postsController.deletePost)

module.exports = router;
