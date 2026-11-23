const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

async function register(name, email, password) {
  if (!name || !email || !password) {
    throw Object.assign(
      new Error('Nome, e-mail e senha são obrigatórios.'),
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw Object.assign(
      new Error('E-mail inválido.'),
      { status: 400 }
    );
  }

  if (password.length < 8) {
    throw Object.assign(
      new Error('A senha deve possuir pelo menos 8 caracteres.'),
      { status: 400 }
    );
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw Object.assign(
      new Error('Este e-mail já está cadastrado.'),
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const userId = await userRepository.create(
    name,
    email,
    passwordHash
  );

  return userRepository.findById(userId);
}

async function login(email, password) {
  if (!email || !password) {
    throw Object.assign(
      new Error('E-mail e senha são obrigatórios.'),
      { status: 400 }
    );
  }

  const user = await userRepository.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw Object.assign(
      new Error('E-mail ou senha incorretos.'),
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url
    },
    token
  };
}

module.exports = {
  register,
  login
};
