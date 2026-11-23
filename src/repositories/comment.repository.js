const db = require('../config/database');

async function create(userId, postId, content) {
  const [result] = await db.execute(
    `INSERT INTO comments (user_id, post_id, content)
     VALUES (?, ?, ?)`,
    [userId, postId, content]
  );
  return findById(result.insertId);
}

async function findById(id) {
  const [rows] = await db.execute(
    `SELECT
      c.*,
      u.name AS user_name,
      u.avatar_url
     FROM comments c
     INNER JOIN users u ON u.id = c.user_id
     WHERE c.id = ?`,
    [id]
  );
  return rows[0];
}

async function findByPost(postId) {
  const [rows] = await db.execute(
    `SELECT
      c.*,
      u.name AS user_name,
      u.avatar_url
     FROM comments c
     INNER JOIN users u ON u.id = c.user_id
     WHERE c.post_id = ?
     ORDER BY c.created_at ASC`,
    [postId]
  );
  return rows;
}

async function update(id, content) {
  await db.execute(
    `UPDATE comments
     SET content = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [content, id]
  );
  return findById(id);
}

async function deleteComment(id) {
  await db.execute(
    'DELETE FROM comments WHERE id = ?',
    [id]
  );
}

async function findOwner(id) {
  const [rows] = await db.execute(
    'SELECT user_id FROM comments WHERE id = ?',
    [id]
  );
  return rows[0];
}

module.exports = {
  create,
  findById,
  findByPost,
  update,
  delete: deleteComment,
  findOwner
};
