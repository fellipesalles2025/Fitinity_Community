function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof require('multer').MulterError) {
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? 'O arquivo ultrapassa o limite de 5 MB.'
      : 'Erro durante o envio do arquivo.';
    return res.status(400).json({
      error: message
    });
  }

  const status = err.status || 500;
  return res.status(status).json({
    error: status === 500
      ? 'Erro interno do servidor.'
      : err.message
  });
}

module.exports = errorHandler;
