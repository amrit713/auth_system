import { Request, Response } from "express";
import { User } from "../generated/prisma";

//custom type
export interface RequestWithUser extends Request {
  user?: Pick<User, "name" | "email" | "id">;
}
