const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Acesso às imagens enviadas
app.use(
  '/uploads',
  express.static(path.resolve('uploads'))
);

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bem-vindo à API Fitinity Community!',
    status: 'Online'
  });
});

// Tratamento de erros
app.use(errorHandler);

// Rota inexistente
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada.'
  });
});

module.exports = app;
