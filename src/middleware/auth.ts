import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Authentication logic here
      const token = req.headers.authorization;
      console.log({ authToken: token });
      if (!token) {
        return res.status(500).json({
          message: "Authorization token missing",
        });
      }
      const decodedToken = jwt.verify(token, config.JWT_SECRET_KEY as string);
      console.log(decodedToken);
      req.user = decodedToken as jwt.JwtPayload;
      next();
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: "Unauthorized access",
      });
    }
  };
};
export default auth;
