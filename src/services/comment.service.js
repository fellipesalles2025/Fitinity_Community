const commentRepository = require('../repositories/comment.repository');
const postRepository = require('../repositories/post.repository');

async function create(userId, postId, content) {
  if (!content || !content.trim()) {
    throw Object.assign(
      new Error('O comentário não pode estar vazio.'),
      { status: 400 }
    );
  }

  const post = await postRepository.findById(postId);
  if (!post) {
    throw Object.assign(
      new Error('Publicação não encontrada.'),
      { status: 404 }
    );
  }

  return commentRepository.create(userId, postId, content.trim());
}

async function findByPost(postId) {
  const post = await postRepository.findById(postId);
  if (!post) {
    throw Object.assign(
      new Error('Publicação não encontrada.'),
      { status: 404 }
    );
  }

  return commentRepository.findByPost(postId);
}

async function update(id, userId, content) {
  if (!content || !content.trim()) {
    throw Object.assign(
      new Error('O comentário não pode estar vazio.'),
      { status: 400 }
    );
  }

  const comment = await commentRepository.findById(id);
  if (!comment) {
    throw Object.assign(
      new Error('Comentário não encontrado.'),
      { status: 404 }
    );
  }

  if (comment.user_id !== userId) {
    throw Object.assign(
      new Error('Você não pode editar este comentário.'),
      { status: 403 }
    );
  }

  return commentRepository.update(id, content.trim());
}

async function deleteComment(id, userId) {
  const comment = await commentRepository.findById(id);
  if (!comment) {
    throw Object.assign(
      new Error('Comentário não encontrado.'),
      { status: 404 }
    );
  }

  if (comment.user_id !== userId) {
    throw Object.assign(
      new Error('Você não pode excluir este comentário.'),
      { status: 403 }
    );
  }

  await commentRepository.delete(id);
  return { message: 'Comentário excluído com sucesso.' };
}

module.exports = {
  create,
  findByPost,
  update,
  deleteComment
};
