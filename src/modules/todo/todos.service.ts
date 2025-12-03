// todos post

import { pool } from "../../config/db";

// create todo
const createTodo = async (user_id: string, title: string) => {
  const result = await pool.query(
    `INSERT INTO  todos(user_id, title) VALUES($1, $2) RETURNING *`,
    [user_id, title]
  );
  return result;
};

// get todo

const getTodo = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result
};

export const todosService = {
  createTodo,
  getTodo
};
