const fs = require('fs/promises');
const userRepository = require('../repositories/user.repository');

async function getProfile(userId) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw Object.assign(
      new Error('Usuário não encontrado.'),
      { status: 404 }
    );
  }
  return user;
}

async function updateProfile(userId, name, email) {
  if (!name || !email) {
    throw Object.assign(
      new Error('Nome e e-mail são obrigatórios.'),
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw Object.assign(
      new Error('E-mail inválido.'),
      { status: 400 }
    );
  }

  const emailInUse = await userRepository.emailExists(email, userId);
  if (emailInUse) {
    throw Object.assign(
      new Error('Este e-mail já está sendo utilizado.'),
      { status: 409 }
    );
  }

  return userRepository.update(userId, name, email);
}

async function updateAvatar(userId, file) {
  if (!file) {
    throw Object.assign(
      new Error('Nenhuma imagem foi enviada.'),
      { status: 400 }
    );
  }

  const user = await getProfile(userId);
  const oldAvatar = user.avatar_url;
  const avatarUrl = `/uploads/${file.filename}`;

  await userRepository.updateAvatar(userId, avatarUrl);

  if (oldAvatar) {
    const oldPath = oldAvatar.replace('/uploads/', '');
    if (oldPath && !oldPath.includes('..')) {
      await fs.unlink(`uploads/${oldPath}`).catch(() => {});
    }
  }

  return { avatar_url: avatarUrl };
}

async function deleteAvatar(userId) {
  const user = await getProfile(userId);
  if (!user.avatar_url) {
    throw Object.assign(
      new Error('O usuário não possui foto de perfil.'),
      { status: 404 }
    );
  }

  const oldAvatar = user.avatar_url;
  await userRepository.deleteAvatar(userId);

  const filename = oldAvatar.replace('/uploads/', '');
  if (filename && !filename.includes('..')) {
    await fs.unlink(`uploads/${filename}`).catch(() => {});
  }

  return { message: 'Foto de perfil removida com sucesso.' };
}

module.exports = {
  getProfile,
  updateProfile,
  updateAvatar,
  deleteAvatar
};
