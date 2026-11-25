
const express = require('express');
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de perfis de usuários
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Consultar perfil do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil retornado com sucesso
 *       401:
 *         description: Token ausente ou inválido
 */
router.get('/me', userController.getProfile);

/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     summary: Atualizar perfil do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@email.com
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 */
router.patch('/me', userController.updateProfile);

/**
 * @swagger
 * /api/users/me/avatar:
 *   post:
 *     summary: Enviar ou atualizar foto de perfil
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem do perfil
 *     responses:
 *       200:
 *         description: Foto de perfil atualizada com sucesso
 *       400:
 *         description: Arquivo inválido ou não enviado
 *       401:
 *         description: Token ausente ou inválido
 */
router.post(
  '/me/avatar',
  upload.single('avatar'),
  userController.updateAvatar
);

/**
 * @swagger
 * /api/users/me/avatar:
 *   delete:
 *     summary: Remover foto de perfil
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foto de perfil removida com sucesso
 *       401:
 *         description: Token ausente ou inválido
 */
router.delete('/me/avatar', userController.deleteAvatar);

module.exports = router;
