import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Planner.css'; // Ensure your CSS file is properly styled

const Planner = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [filter, setFilter] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editPriority, setEditPriority] = useState('low');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Load tasks from local storage on component mount
  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(savedTasks);
    } catch (error) {
      console.error("Failed to load tasks from local storage:", error);
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to local storage:", error);
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        title: newTaskTitle,
        id: Date.now(), // Unique id based on timestamp
        dueDate,
        priority,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setDueDate('');
      setPriority('low');
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditingTask(taskId);
    setEditTaskTitle(taskToEdit.title);
    setEditDueDate(taskToEdit.dueDate);
    setEditPriority(taskToEdit.priority);
  };

  const handleSaveEdit = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, title: editTaskTitle, dueDate: editDueDate, priority: editPriority }
        : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'green';
      case 'medium':
        return 'orange';
      case 'high':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="planner-container">
      <button onClick={() => navigate(-1)} className="go-back-button">Go Back</button>
      <h1>Planner</h1>
      <div className="task-input-container">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter tasks"
        className="filter-input"
      />
      <div className="tasks-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
              style={{ borderLeft: `5px solid ${getPriorityColor(task.priority)}` }}
            >
              {editingTask === task.id ? (
                <div className="edit-task">
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                  />
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                  />
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <button onClick={() => handleSaveEdit(task.id)} className="save-button">Save</button>
                </div>
              ) : (
                <div className="task-details">
                  <h3>{task.title}</h3>
                  <p>Due Date: {task.dueDate}</p>
                  <p>Priority: {task.priority}</p>
                </div>
              )}
              <div className="task-actions">
                <button onClick={() => handleCompleteTask(task.id)} className="complete-button">
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleEditTask(task.id)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default Planner;
