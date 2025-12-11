import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, phone, address, password } = payload;

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, phone, address, password)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (email) DO NOTHING
    RETURNING *
    `,
    [name, email, phone, address, hashedPassword || null]
  );

  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result;
};
const getUserById = async (id: string) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result;
};
const UpdateUsers = async (
  id: number,
  name: string,
  email: string,
  phone: number,
  address: string
) => {
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2, phone=$3, address=$4, updated_at=NOW() WHERE id=$5 RETURNING *",
    [name, email, phone, address, id]
  );
  return result;
};

const userDelete = async (id: string) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return result;
};

export const userService = {
  createUser,
  getAllUsers,
  getUserById,
  UpdateUsers,
  userDelete,
};
