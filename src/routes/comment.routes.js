
const express = require('express');
const commentController = require('../controllers/comment.controller');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Comentários
 *     description: Gerenciamento de comentários
 */

/**
 * @swagger
 * /api/comments/{commentId}:
 *   patch:
 *     summary: Atualizar um comentário
 *     tags: [Comentários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
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
 *                 example: Comentário atualizado!
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Sem permissão para atualizar este comentário
 *       404:
 *         description: Comentário não encontrado
 */
router.patch(
  '/:commentId',
  authenticateToken,
  commentController.update
);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Excluir um comentário
 *     tags: [Comentários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário excluído com sucesso
 *       401:
 *         description: Token ausente ou inválido
 *       403:
 *         description: Sem permissão para excluir este comentário
 *       404:
 *         description: Comentário não encontrado
 */
router.delete(
  '/:commentId',
  authenticateToken,
  commentController.deleteComment
);

module.exports = router;
