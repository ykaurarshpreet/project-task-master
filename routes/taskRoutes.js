const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');


const taskRouter = express.Router();

// Protects all rotes in this router
taskRouter.use(authMiddleware);

/**
 * GET /api/projects/:projectId/tasks
 */

// taskRouter.get("/", getAllTasks );
taskRouter.get("/projects/:projectId/tasks", getAllTasks);


/**
 * Get /api/projects/:projectId/tasks/:taskId
 */
// taskRouter.get("/:taskId", getTaskById)
taskRouter.get("/projects/:projectId/tasks/:taskId", getTaskById);

/**
 * POST /api/projects/:projectId/tasks
 */
// taskRouter.post("/", createTask )
taskRouter.post("/projects/:projectId/tasks", createTask);


/**
 * PUT /api/projects/:projectId/tasks/taskId
 */

// taskRouter.put('/:taskId', updateTask)
taskRouter.put("/projects/:projectId/tasks/:taskId", updateTask);
/**
 * DELETE /api/projects/:projectId/tasks/taskId
 */
// taskRouter.delete('/:taskId', deleteTask)
taskRouter.delete("/projects/:projectId/tasks/:taskId", deleteTask);

module.exports = taskRouter