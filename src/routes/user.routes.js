const express = require('express');
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

router.use(authenticateToken);

router.get('/me', userController.getProfile);
router.patch('/me', userController.updateProfile);

router.post(
  '/me/avatar',
  upload.single('avatar'),
  userController.updateAvatar
);

router.delete('/me/avatar', userController.deleteAvatar);

module.exports = router;
