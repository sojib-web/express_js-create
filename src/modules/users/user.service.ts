import { pool } from "../../config/db";

const createUser = async (
  name: string,
  email: string,
  phone: string,
  address?: string
) => {
  const result = await pool.query(
    `
    INSERT INTO users (name, email, phone, address)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (email) DO NOTHING
    RETURNING *
    `,
    [name, email, phone, address || null]
  );

  return result.rows[0];
};

export const userService = {
  createUser,
};
