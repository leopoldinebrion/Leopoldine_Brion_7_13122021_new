const express = require('express');

const postController = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, multer, postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', auth, postController.getOnePost);
router.put('/:id', auth, multer, postController.modifyPost);
router.delete('/:id', auth, multer, postController.deletePost);
module.exports = router;