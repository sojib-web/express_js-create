import { pool } from "../../config/db";

const createTodos = async (payload: Record<string, unknown>) => {
  const { user_id, title } = payload;
  const result = await pool.query(
    "INSERT INTO todos (user_id, title) VALUES ($1, $2) RETURNING *",
    [user_id, title]
  );
  return result;
};

const getAllTodos = async () => {
  const result = await pool.query("SELECT * FROM todos");
  return result;
};

const getTodoById = async (id: number) => {
  return pool.query("SELECT * FROM todos WHERE id = $1", [id]);
};
const updatedTodo = async (id: number, payload: Record<string, unknown>) => {
  const { user_id, title, description } = payload;
  const result = await pool.query(
    "UPDATE todos SET user_id=$1, title=$2, description=$3,  updated_at=NOW() WHERE id=$4 RETURNING *",
    [user_id, title, description, id]
  );
  return result;
};

const deleteTodo = async (id: number) => {
  const result = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  return result;
};

export const todoService = {
  createTodos,
  getAllTodos,
  getTodoById,
  updatedTodo,
  deleteTodo,
};
