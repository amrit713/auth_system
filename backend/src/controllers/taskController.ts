import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { RequestWithUser } from "../types";
import { db } from "../utils/db";
import AppError from "../utils/AppError";
import { getCurrentUser } from "../utils/getCurrentUser";

// create task for a user
export const createTask = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    if (!req.user) {
      return new AppError("unauthorized", 201);
    }
    const user = await getCurrentUser(req.user.id);
    if (!user) {
      return new AppError("unauthoried", 401);
    }

    const createdTask = await db.task.create({
      data: {
        title,
        description,
        userId: user.id,
      },
    });

    if (!createTask) {
      return new AppError("unable to create task", 403);
    }

    res.status(201).json({
      status: "success",
      data: {
        task: createdTask,
      },
    });
  }
);

//display all the task created by the user
export const getAllTasks = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return new AppError("unauthorized", 201);
    }
    const user = await getCurrentUser(req.user.id);
    if (!user) {
      return new AppError("unauthoried", 401);
    }

    const tasks = await db.task.findMany({
      where: {
        userId: user.id,
      },
    });

    if (!tasks) {
      return new AppError("unable to create task", 403);
    }

    res.status(201).json({
      status: "success",
      totalTasks: tasks.length,
      data: {
        tasks,
      },
    });
  }
);

//get individual task
export const getTask = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    console.log(taskId);
    if (!req.user) {
      return new AppError("unauthorized", 201);
    }
    const user = await getCurrentUser(req.user.id);
    if (!user) {
      return new AppError("unauthoried", 401);
    }

    const task = await db.task.findFirst({
      where: {
        userId: user.id,
        id: taskId,
      },
    });

    if (!task) {
      return new AppError("unable to get task", 403);
    }

    res.status(201).json({
      status: "success",

      data: {
        task,
      },
    });
  }
);

//update individaul task
export const updateTask = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    console.log("🚀 ~ taskId:", taskId);

    const body: {
      title?: string;
      description?: string;
      isCompleted?: boolean;
    } = req.body;

    console.log("🚀 ~ body:", body);

    if (!req.user) {
      return new AppError("unauthorized", 201);
    }
    const user = await getCurrentUser(req.user.id);
    if (!user) {
      return new AppError("unauthoried", 401);
    }

    const task = await db.task.update({
      where: { id: taskId, userId: user.id },

      data: {
        title: body.title,
        description: body.description,
        // isCompleted: body.isCompleted,
      },
    });

    console.log("🚀 ~ task:", task);

    if (!task) {
      return new AppError("unable to update task", 403);
    }

    res.status(201).json({
      status: "success",

      data: {
        task,
      },
    });
  }
);

//delete task
export const deleteTask = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { taskId } = req.params;

    if (!req.user) {
      return new AppError("unauthorized", 201);
    }
    const user = await getCurrentUser(req.user.id);
    if (!user) {
      return new AppError("unauthoried", 401);
    }

    await db.task.delete({
      where: {
        id: taskId,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        message: "deleted successfully",
      },
    });
  }
);
