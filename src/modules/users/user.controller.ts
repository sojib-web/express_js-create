import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "name, email and phone are required",
    });
  }

  try {
    const result = await userService.createUser(name, email, phone, address);

    if (!result) {
      return res.status(409).json({
        success: false,
        message: "email or phone already exists",
      });
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const userController = {
  createUser,
};
