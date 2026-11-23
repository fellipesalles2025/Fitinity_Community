const userService = require('../services/user.service');

async function getProfile(req, res, next) {
  try {
    const user = await userService.getProfile(req.user.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { name, email } = req.body;
    const user = await userService.updateProfile(
      req.user.id,
      name,
      email
    );
    return res.status(200).json({
      message: 'Perfil atualizado com sucesso.',
      user
    });
  } catch (error) {
    next(error);
  }
}

async function updateAvatar(req, res, next) {
  try {
    const result = await userService.updateAvatar(
      req.user.id,
      req.file
    );
    return res.status(200).json({
      message: 'Foto de perfil atualizada com sucesso.',
      ...result
    });
  } catch (error) {
    next(error);
  }
}

async function deleteAvatar(req, res, next) {
  try {
    const result = await userService.deleteAvatar(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  updateProfile,
  updateAvatar,
  deleteAvatar
};
