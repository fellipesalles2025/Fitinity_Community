const postService = require('../services/post.service');

async function create(req, res, next) {
  try {
    const { content } = req.body;
    const post = await postService.create(
      req.user.id,
      content,
      req.file
    );
    return res.status(201).json({
      message: 'Publicação criada com sucesso.',
      post
    });
  } catch (error) {
    next(error);
  }
}

async function findAll(req, res, next) {
  try {
    const posts = await postService.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}

async function findById(req, res, next) {
  try {
    const post = await postService.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { content } = req.body;
    const post = await postService.update(
      req.params.id,
      req.user.id,
      content,
      req.file
    );
    return res.status(200).json({
      message: 'Publicação atualizada com sucesso.',
      post
    });
  } catch (error) {
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const result = await postService.deletePost(
      req.params.id,
      req.user.id
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function likePost(req, res, next) {
  try {
    const result = await postService.likePost(
      req.params.id,
      req.user.id
    );
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function unlikePost(req, res, next) {
  try {
    const result = await postService.unlikePost(
      req.params.id,
      req.user.id
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
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
