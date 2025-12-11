import { Request, Response } from "express";

import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "name, email and phone are required",
    });
  }

  try {
    const result = await userService.createUser(req.body);

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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserById(req.params.id!);
    console.log(result.rows);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email, phone, address } = req.body;
  try {
    const result = await userService.UpdateUsers(
      parseInt(req.params.id!),
      name,
      email,
      phone,
      address
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.userDelete(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Deleted successfully",
        data: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
