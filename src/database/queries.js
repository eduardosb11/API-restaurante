import pool from "./pool.js";

async function insertUser(username, password) {
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    password,
  ]);
}

export {
  insertUser
};
