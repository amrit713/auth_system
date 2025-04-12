import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const signupSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters is required",
  }),
  name: z.string().min(1, { message: "Name is required" }),
});
export const taskSchema = z.object({
  title: z.string().min(3, {
    message: "title is required",
  }),

  description: z.string().optional(),
});
