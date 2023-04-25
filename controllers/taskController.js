const Task = require('../models/task');

const taskController = {};

taskController.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

taskController.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

taskController.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed || false,
    });
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

taskController.updateTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
        const updatedTask = await Task.updateOne({_id : req.params.id},req.body);
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

taskController.deleteTaskById = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) {
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = taskController;
