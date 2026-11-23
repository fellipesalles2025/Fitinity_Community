const express = require('express');
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

// Rotas públicas
router.get('/', postController.findAll);
router.get('/:id', postController.findById);

// Rotas privadas
router.post(
  '/',
  authenticateToken,
  upload.single('image'),
  postController.create
);

router.patch(
  '/:id',
  authenticateToken,
  upload.single('image'),
  postController.update
);

router.delete(
  '/:id',
  authenticateToken,
  postController.deletePost
);

// Curtidas
router.post(
  '/:id/likes',
  authenticateToken,
  postController.likePost
);

router.delete(
  '/:id/likes',
  authenticateToken,
  postController.unlikePost
);

// Comentários
router.post(
  '/:id/comments',
  authenticateToken,
  commentController.create
);

router.get(
  '/:id/comments',
  commentController.findByPost
);

module.exports = router;
