const path = require('path');
const express = require('express');
const postsController = require('../controllers/posts.js');
const router = express.Router();

router.post('/posts/add-post', postsController.postAddProduct);

router.get('/get-posts', postsController.getPosts);

module.exports = router;
