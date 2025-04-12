import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

import catchAsync from "../utils/catchAsync";
import { db } from "../utils/db";
import AppError from "../utils/AppError";
import config from "../config/config";

//asign a cookie after login and sign up
const setCookieToken = (req: Request, res: Response, token: string) => {
  res.cookie("token", token, {
    secure: false,
    sameSite: "lax",
  });
};

//create jwt token
const signToken = (id: string) => {
  const secret: Secret = config.authSecret;

  return jwt.sign(
    {
      id,
    },
    secret,
    {
      expiresIn: "90d",
    }
  );
};

//handle signup  request
export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return next(new AppError("User already exist", 403));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    if (!newUser) {
      return next(new AppError("Coulnot create a user", 402));
    }

    const token = signToken(newUser.id);

    setCookieToken(req, res, token);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  }
);

//handle the login request
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Received headers:", req.headers);
    console.log("Received cookies:", req.cookies);
    const { email, password } = req.body;
    console.log("ody", req.body);

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    console.log("86 users", user);

    if (!user) {
      return next(new AppError("email or password Invalid", 403));
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return next(new AppError("email or password Invalid", 403));
    }

    const token = signToken(user.id);
    setCookieToken(req, res, token);

    res.status(201).json({
      status: "success",
      token,
    });
  }
);
