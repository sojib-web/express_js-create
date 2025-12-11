import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoute } from "./modules/users/user.route";
import { todoRoute } from "./modules/todos/todos.route";
import { authRoute } from "./modules/auth/auth.toute";

const app = express();
const port = config.port;
// parse json request body
app.use(express.json());

// initialize database
initDB();
//  middleware

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World! This is the User and Todo API server.");
});

app.use("/users", userRoute);
// todo routes can be added here

// auth routes can be added here

app.use("/auth", authRoute);

app.use("/todos", todoRoute);
// app.delete("/todos/:id", );
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
