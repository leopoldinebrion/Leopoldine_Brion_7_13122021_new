const express = require('express');
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

const router = express.Router();

router.post("/comment/:id", auth, commentCtrl.createComment);
router.delete("/comment/:commentId", auth, commentCtrl.deleteComment);

module.exports = router;