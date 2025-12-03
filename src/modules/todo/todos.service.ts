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
  return result;
};

// get single todo

const getSingleTodo = async (id: string) => {
  const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
  return result;
};

// delete todo

const deleteTodo = async (id: string) => {
  const result = await pool.query("DELETE FROM todos WHERE id=$1 RETURNING *", [
    id,
  ]);

  return result;
};

export const todosService = {
  createTodo,
  getTodo,
  getSingleTodo,
  deleteTodo
};
