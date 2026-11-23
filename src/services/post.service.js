const fs = require('fs/promises');
const postRepository = require('../repositories/post.repository');
const likeRepository = require('../repositories/like.repository');

async function create(userId, content, file) {
  if ((!content || !content.trim()) && !file) {
    throw Object.assign(
      new Error('A publicação deve possuir texto ou imagem.'),
      { status: 400 }
    );
  }

  const imageUrl = file
    ? `/uploads/${file.filename}`
    : null;

  return postRepository.create(userId, content || null, imageUrl);
}

async function findAll() {
  return postRepository.findAll();
}

async function findById(id) {
  const post = await postRepository.findById(id);
  if (!post) {
    throw Object.assign(
      new Error('Publicação não encontrada.'),
      { status: 404 }
    );
  }
  return post;
}

async function update(id, userId, content, file) {
  const post = await findById(id);

  if (post.user_id !== userId) {
    throw Object.assign(
      new Error('Você não pode editar esta publicação.'),
      { status: 403 }
    );
  }

  const newContent = content !== undefined
    ? content
    : post.content;

  if ((!newContent || !newContent.trim()) && !file && !post.image_url) {
    throw Object.assign(
      new Error('A publicação deve possuir texto ou imagem.'),
      { status: 400 }
    );
  }

  const newImageUrl = file
    ? `/uploads/${file.filename}`
    : post.image_url;

  const updatedPost = await postRepository.update(
    id,
    newContent,
    newImageUrl
  );

  if (file && post.image_url) {
    const oldFilename = post.image_url.replace('/uploads/', '');
    if (oldFilename && !oldFilename.includes('..')) {
      await fs.unlink(`uploads/${oldFilename}`).catch(() => {});
    }
  }

  return updatedPost;
}

async function deletePost(id, userId) {
  const post = await findById(id);

  if (post.user_id !== userId) {
    throw Object.assign(
      new Error('Você não pode excluir esta publicação.'),
      { status: 403 }
    );
  }

  await postRepository.delete(id);

  if (post.image_url) {
    const filename = post.image_url.replace('/uploads/', '');
    if (filename && !filename.includes('..')) {
      await fs.unlink(`uploads/${filename}`).catch(() => {});
    }
  }

  return { message: 'Publicação excluída com sucesso.' };
}

async function likePost(postId, userId) {
  await findById(postId);

  const alreadyLiked = await likeRepository.exists(userId, postId);
  if (alreadyLiked) {
    throw Object.assign(
      new Error('Você já curtiu esta publicação.'),
      { status: 409 }
    );
  }

  await likeRepository.create(userId, postId);
  return { message: 'Publicação curtida com sucesso.' };
}

async function unlikePost(postId, userId) {
  await findById(postId);

  const alreadyLiked = await likeRepository.exists(userId, postId);
  if (!alreadyLiked) {
    throw Object.assign(
      new Error('Você ainda não curtiu esta publicação.'),
      { status: 404 }
    );
  }

  await likeRepository.deleteLike(userId, postId);
  return { message: 'Curtida removida com sucesso.' };
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  deletePost,
  likePost,
  unlikePost
};
