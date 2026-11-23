const db = require('../config/database');

async function create(name, email, passwordHash) {
  const [result] = await db.execute(
    `INSERT INTO users (name, email, password_hash)
     VALUES (?, ?, ?)`,
    [name, email, passwordHash]
  );
  return result.insertId;
}

async function findByEmail(email) {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
}

async function findById(id) {
  const [rows] = await db.execute(
    `SELECT id, name, email, avatar_url, created_at
     FROM users WHERE id = ?`,
    [id]
  );
  return rows[0];
}

async function update(id, name, email) {
  await db.execute(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );
  return findById(id);
}

async function updateAvatar(id, avatarUrl) {
  await db.execute(
    'UPDATE users SET avatar_url = ? WHERE id = ?',
    [avatarUrl, id]
  );
}

async function deleteAvatar(id) {
  await db.execute(
    'UPDATE users SET avatar_url = NULL WHERE id = ?',
    [id]
  );
}

async function emailExists(email, userId) {
  const [rows] = await db.execute(
    'SELECT id FROM users WHERE email = ? AND id != ?',
    [email, userId]
  );
  return rows.length > 0;
}

module.exports = {
  create,
  findByEmail,
  findById,
  update,
  updateAvatar,
  deleteAvatar,
  emailExists
};
