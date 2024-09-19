const Task = require('../models/taskModel');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
    req.io.emit('taskCreated', savedTask); // Emit event for real-time update
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
    req.io.emit('taskUpdated', updatedTask); // Emit event for real-time update
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(deletedTask);
    req.io.emit('taskDeleted', deletedTask); // Emit event for real-time update
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
