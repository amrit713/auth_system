import express from "express";

import { protect } from "../middleware/protected";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/taskController";

const router = express.Router();

router.route("/").post(protect, createTask).get(protect, getAllTasks);
router
  .route("/:taskId")
  .get(protect, getTask)
  .patch(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
