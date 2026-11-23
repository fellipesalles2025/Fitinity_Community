require('dotenv').config();
const app = require('./app');
const db = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.query('SELECT 1');
    console.log('Conexão com MySQL estabelecida.');

    app.listen(PORT, () => {
      console.log(`Fitinity API rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a API:', error.message);
    process.exit(1);
  }
}

startServer();
