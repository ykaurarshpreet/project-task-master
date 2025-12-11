const Task = require('../models/Task');
const Project = require("../models/Project");



/**
 * Get All Tasks
 */
const getAllTasks = async (req, res) => {
    try {
         const { projectId } = req.params;
        const tasks = await Task.find({ project: projectId });
        res.json(tasks)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


/**
 * Get a single task by id
 */
const getTaskById = async(req, res) => {
    try {
        const { projectId, taskId } = req.params;
        const task = await Task.findOne({ _id: taskId, project: projectId });
        if (!task) return res.status(404).json({message: "Task not found"})
       

    // ffind the parent project
        const project = await Project.findById(projectId);
        if (!project)return res.status(404).json({ message: "Project of task not found" });

    // Authorization
    
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "User is not authorized!" });
    }

    res.json(task);

    } catch (error) {
        res.status(500).json({error: error.message})
    }
};


/**
 * Post a new task
 */
//This declares an asynchronous function called createTask that takes two arguments: req (request object) and res (response object)
const createTask = async( req,res) => {
    //  error handling
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (project.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'User not authorized' });
        }
        //capital T = Task model
        //Task.create() = method to create new doc in database
        //req.body contains the data sent by the client in the request body
        // await is used because Task.create() is an asynchronous operation that returns a Promise, and the code waits for its resolution before proceeding.
        //the newly created task document is then stored in the task variable w lowercase t.
        const task = await Task.create({ ...req.body, project: projectId });
        //successful so send ok  and json(task) send new task obj back to client as json res
            res.status(200).json(task)

            // error occurs
    } catch (error) {
       res.status(400).json({error: error.message})
    }
}



/**
 * Put - Update a task
 */
const updateTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, project: projectId },
      req.body,
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a task
 */
const deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, project: projectId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {createTask, getAllTasks, getTaskById, updateTask, deleteTask}