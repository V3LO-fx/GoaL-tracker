import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const TaskForm = ({ fetchTasks }) => {
  // Initialize state to hold the form data and error message
  const [task, setTask] = useState({ title: '', deadline: '', duration: '' });
  const [error, setError] = useState('');

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    setError(''); // Clear error message on input change
  };

  // Validate form inputs
  const validateForm = () => {
    if (!task.title || !task.deadline || !task.duration) {
      setError('All fields are required.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Make POST request to add a new task
      await axios.post('/api/tasks', task, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Fetch tasks again after adding a new task
      fetchTasks();
      // Clear form fields after successful submission
      setTask({ title: '', deadline: '', duration: '' });
    } catch (error) {
      console.error(error);
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }} // Initial animation state
      animate={{ opacity: 1 }} // Animation to perform
      exit={{ opacity: 0 }} // Animation when component is removed
      onSubmit={handleSubmit}
      className="task-form"
    >
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
      />
      <input
        type="date"
        name="deadline"
        value={task.deadline}
        onChange={handleChange}
      />
      <input
        type="number"
        name="duration"
        value={task.duration}
        onChange={handleChange}
        placeholder="Duration (days)"
      />
      <button type="submit">Add Task</button>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
    </motion.form>
  );
};

export default TaskForm;
