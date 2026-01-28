import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
  createTask,
  deleteTask,
  editTask,
  getAll,
  getById,
} from "../controllers/tasks.js";

const router = new Router();

// Create Task
// http://localhost:3000/api/tasks
router.post("/", checkAuth, createTask);

// Get All Tasks
// http://localhost:3000/api/tasks/all
router.get("/all", checkAuth, getAll);

// Get Task By Id
// http://localhost:3000/api/tasks/:id
router.get("/:id", checkAuth, getById);

// Delete Task By Id
// http://localhost:3000/api/tasks/:id/delete
router.delete("/:id/delete", checkAuth, deleteTask);

// Edit Task By Id
// http://localhost:3000/api/tasks/:id/edit
router.put("/:id/edit", checkAuth, editTask);

export default router;
