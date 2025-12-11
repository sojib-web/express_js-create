import { Request, Response } from "express";
import { todoService } from "./todos.service";

const todoCreate = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await todoService.createTodos(req.body);

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const result = todoService.getAllTodos();
    res.status(200).json({
      success: true,
      message: "todos retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid todo id",
      });
    }
    const result = await todoService.getTodoById(id);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "todos not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "todos retrieved successfully",
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

const updatedTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoService.updatedTodo(
      Number(req.params.id),
      req.body
    );
    console.log(result.rows);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "todos not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todos Updated successfully",
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

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoService.deleteTodo(Number(req.params.id));
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Todos not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todos Deleted successfully",
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
export const todoController = {
  todoCreate,
  getAllTodos,
  getTodoById,
  updatedTodo,
  deleteTodo,
};
