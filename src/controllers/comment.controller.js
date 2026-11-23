const commentService = require('../services/comment.service');

async function create(req, res, next) {
  try {
    const { content } = req.body;
    const comment = await commentService.create(
      req.user.id,
      req.params.id,
      content
    );
    return res.status(201).json({
      message: 'Comentário criado com sucesso.',
      comment
    });
  } catch (error) {
    next(error);
  }
}

async function findByPost(req, res, next) {
  try {
    const comments = await commentService.findByPost(
      req.params.id
    );
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const comment = await commentService.update(
      req.params.commentId,
      req.user.id,
      req.body.content
    );
    return res.status(200).json({
      message: 'Comentário atualizado com sucesso.',
      comment
    });
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const result = await commentService.deleteComment(
      req.params.commentId,
      req.user.id
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  findByPost,
  update,
  deleteComment
};
