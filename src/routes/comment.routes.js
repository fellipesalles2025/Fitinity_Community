const express = require('express');
const commentController = require('../controllers/comment.controller');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.patch(
  '/:commentId',
  authenticateToken,
  commentController.update
);

router.delete(
  '/:commentId',
  authenticateToken,
  commentController.deleteComment
);

module.exports = router;
