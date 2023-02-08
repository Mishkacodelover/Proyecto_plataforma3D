import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import db from "./services/mysql.js";
import userRouter from "./routes/user_router.js";
import imagesRouter from "./routes/images_routes.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();
export function currentDir() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return { __dirname, __filename };
}
const { __dirname } = currentDir();

const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors());
app.use(logger("dev"));
app.use(cookieParser());
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 20 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "Imagen demasiado grande",
    uploadTimeout: 0,
  })
);

app.use(express.static(join(__dirname, "public")));
app.use("/user", userRouter);
app.use("/images", imagesRouter);

await db.createConnection();

export default app;
