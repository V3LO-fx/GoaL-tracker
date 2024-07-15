const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, deadline, duration } = req.body;

  try {
    const newTask = new Task({ user: req.userId, title, deadline, duration });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
