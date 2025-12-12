import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();
// Define your auth routes here
router.post("/login", authController.loginUser);
export const authRoute = router;
