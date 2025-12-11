import express from "express";
import { todoController } from "./todos.controller";

const router = express.Router();
router.post("/", todoController.todoCreate);
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updatedTodo);
router.delete("/:id", todoController.deleteTodo);

export const todoRoute = router;
