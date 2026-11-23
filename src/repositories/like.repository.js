const db = require('../config/database');

async function create(userId, postId) {
  await db.execute(
    'INSERT INTO likes (user_id, post_id) VALUES (?, ?)',
    [userId, postId]
  );
}

async function deleteLike(userId, postId) {
  await db.execute(
    'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
    [userId, postId]
  );
}

async function exists(userId, postId) {
  const [rows] = await db.execute(
    'SELECT id FROM likes WHERE user_id = ? AND post_id = ?',
    [userId, postId]
  );
  return rows.length > 0;
}

module.exports = {
  create,
  deleteLike,
  exists
};
