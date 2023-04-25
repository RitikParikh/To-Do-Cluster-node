const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

// Get all tasks
router.get('/tasks', taskController.getAllTasks);

// Get a specific task by ID
router.get('/tasks/:id', taskController.getTaskById);

// Add a new task
router.post('/tasks', taskController.createTask);

// Update an existing task
router.put('/tasks/:id', taskController.updateTaskById);

// Delete an existing task
router.delete('/tasks/:id', taskController.deleteTaskById);

module.exports = router;