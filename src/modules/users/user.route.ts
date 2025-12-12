import express from "express";
import { userController } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();
// create user , userRoute
router.post("/", userController.createUser);
router.get("/", logger, auth(), userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
export const userRoute = router;
