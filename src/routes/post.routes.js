
const express = require('express');
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Publicações
 *     description: Gerenciamento de publicações
 */

/**
 * @swagger
 * tags:
 *   - name: Curtidas
 *     description: Interações de curtidas nas publicações
 */

/**
 * @swagger
 * tags:
 *   - name: Comentários
 *     description: Comentários nas publicações
 */

// Rotas públicas

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Listar todas as publicações
 *     tags: [Publicações]
 *     responses:
 *       200:
 *         description: Lista de publicações retornada com sucesso
 */
router.get('/', postController.findAll);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Buscar publicação por ID
 *     tags: [Publicações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da publicação
 *     responses:
 *       200:
 *         description: Publicação encontrada
 *       404:
 *         description: Publicação não encontrada
 */
router.get('/:id', postController.findById);

// Rotas privadas

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Criar uma publicação
 *     tags: [Publicações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Minha primeira publicação!
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagem da publicação
 *     responses:
 *       201:
 *         description: Publicação criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 */
router.post(
  '/',
  authenticateToken,
  upload.single('image'),
  postController.create
);

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Atualizar uma publicação
 *     tags: [Publicações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da publicação
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Conteúdo atualizado
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Publicação atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Sem permissão para atualizar esta publicação
 *       404:
 *         description: Publicação não encontrada
 */
router.patch(
  '/:id',
  authenticateToken,
  upload.single('image'),
  postController.update
);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Excluir uma publicação
 *     tags: [Publicações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da publicação
 *     responses:
 *       200:
 *         description: Publicação excluída com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Sem permissão para excluir esta publicação
 *       404:
 *         description: Publicação não encontrada
 */
router.delete(
  '/:id',
  authenticateToken,
  postController.deletePost
);

// Curtidas

/**
 * @swagger
 * /api/posts/{id}/likes:
 *   post:
 *     summary: Curtir uma publicação
 *     tags: [Curtidas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da publicação
 *     responses:
 *       201:
 *         description: Curtida registrada com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Publicação não encontrada
 *       409:
 *         description: Publicação já curtida pelo usuário
 */
router.post(
  '/:id/likes',
  authenticateToken,
  postController.likePost
);

/**
 * @swagger
 * /api/posts/{id}/likes:
 *   delete:
 *     summary: Remover curtida de uma publicação
 *     tags: [Curtidas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da publicação
 *     responses:
 *       200:
 *         description: Curtida removida com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Publicação ou curtida não encontrada
 */
router.delete(
  '/:id/likes',
  authenticateToken,
  postController.unlikePost
);

// Comentários

/**
 * @swagger
 * /api/posts/{id}/comments:
 *   post:
 *     summary: Adicionar comentário a uma publicação
 *     tags: [Comentários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da publicação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Excelente publicação!
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *       400:
 *         description: Conteúdo inválido
 *       401:
 *         description: Token ausente ou inválido
 *       404:
 *         description: Publicação não encontrada
 */
router.post(
  '/:id/comments',
  authenticateToken,
  commentController.create
);

/**
 * @swagger
 * /api/posts/{id}/comments:
 *   get:
 *     summary: Listar comentários de uma publicação
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da publicação
 *     responses:
 *       200:
 *         description: Lista de comentários retornada com sucesso
 *       404:
 *         description: Publicação não encontrada
 */
router.get(
  '/:id/comments',
  commentController.findByPost
);

module.exports = router;
