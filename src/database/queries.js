import pool from "./pool.js";

async function insertUser(username, password) {
  try {
    const row = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
    return row;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function selectUserByName(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return rows[0];
}

async function selectUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

export {
  insertUser,
  selectUserByName,
  selectUserById,
};
