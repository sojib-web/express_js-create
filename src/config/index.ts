import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  CONNECTION_STR: process.env.CONNECTION_STR,
  port: process.env.PORT || 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

export default config;
