import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/authRoute";
import taskRouter from "./routes/taskRoute";
import globalErrorHandler from "./utils/errorHandler";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRouter);
app.use("/tasks", taskRouter);

//error handler
app.use(globalErrorHandler);

export default app;
