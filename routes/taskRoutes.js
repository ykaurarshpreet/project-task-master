const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');


const taskRouter = express.Router();

// Protects all rotes in this router
taskRouter.use(authMiddleware);




// GET all tasks for a project
taskRouter.get("/:projectId/tasks", getAllTasks);

// GET single task
taskRouter.get("/:projectId/tasks/:taskId", getTaskById);

// POST new task
taskRouter.post("/:projectId/tasks", createTask);

// PUT update task
taskRouter.put("/:projectId/tasks/:taskId", updateTask);

// DELETE task
taskRouter.delete("/:projectId/tasks/:taskId", deleteTask);

module.exports = taskRouter