const express = require('express');
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

const router = express.Router();

router.post("/comment/:postId", auth, commentCtrl.createComment);
router.delete("/comment/:commentId", auth, commentCtrl.deleteComment);
router.get("/comment/:postId", auth, commentCtrl.getComments);

module.exports = router;