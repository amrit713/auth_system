import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import jwt, { JwtPayload } from "jsonwebtoken";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import config from "../config/config";
import { db } from "../utils/db";
import { RequestWithUser } from "../types";

interface MyJwtPayload extends JwtPayload {
  id: string;
}

//middleware to protect routes
export const protect = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.cookies.token) {
      return next(
        new AppError("You are not Logged In ! Please log in to get access", 401)
      );
    }
    const token = req.cookies.token;
    const decoded = jwt.verify(token, config.authSecret) as MyJwtPayload;

    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return new AppError("unauthorized", 401);
    }

    req.user = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    next();
  }
);
