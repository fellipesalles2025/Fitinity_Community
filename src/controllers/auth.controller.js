const authService = require('../services/auth.service');

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register(
      name,
      email,
      password
    );
    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso.',
      user
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return res.status(200).json({
      message: 'Login realizado com sucesso.',
      ...result
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login
};
