const db = require('../config/database');

async function create(userId, content, imageUrl) {
  const [result] = await db.execute(
    `INSERT INTO posts (user_id, content, image_url)
     VALUES (?, ?, ?)`,
    [userId, content, imageUrl]
  );
  return findById(result.insertId);
}

async function findAll() {
  const [rows] = await db.execute(
    `SELECT
      p.id,
      p.user_id,
      p.content,
      p.image_url,
      p.created_at,
      p.updated_at,
      u.name AS user_name,
      u.avatar_url,
      (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes_count,
      (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count
     FROM posts p
     INNER JOIN users u ON u.id = p.user_id
     ORDER BY p.created_at DESC`
  );
  return rows;
}

async function findById(id) {
  const [rows] = await db.execute(
    `SELECT
      p.*,
      u.name AS user_name,
      u.avatar_url,
      (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes_count,
      (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count
     FROM posts p
     INNER JOIN users u ON u.id = p.user_id
     WHERE p.id = ?`,
    [id]
  );
  return rows[0];
}

async function update(id, content, imageUrl) {
  await db.execute(
    `UPDATE posts
     SET content = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [content, imageUrl, id]
  );
  return findById(id);
}

async function deletePost(id) {
  await db.execute(
    'DELETE FROM posts WHERE id = ?',
    [id]
  );
}

async function findOwner(id) {
  const [rows] = await db.execute(
    'SELECT user_id FROM posts WHERE id = ?',
    [id]
  );
  return rows[0];
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  delete: deletePost,
  findOwner
};
