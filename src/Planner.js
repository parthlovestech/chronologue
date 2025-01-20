import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Planner.css';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome

const Planner = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [category, setCategory] = useState('assignments');
  const [filter, setFilter] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editPriority, setEditPriority] = useState('low');
  const [editCategory, setEditCategory] = useState('assignments');
  const navigate = useNavigate();

  // Load tasks from local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      alert('Please enter a task title!');
      return;
    }

    if (new Date(dueDate) < new Date()) {
      alert('Due date cannot be in the past.');
      return;
    }

    const newTask = {
      title: newTaskTitle,
      id: Date.now(),
      dueDate,
      priority,
      category,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    resetTaskForm();
  };

  // Edit task
  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskId);
    setEditTaskTitle(taskToEdit.title);
    setEditDueDate(taskToEdit.dueDate);
    setEditPriority(taskToEdit.priority);
    setEditCategory(taskToEdit.category);
  };

  const handleSaveEdit = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, title: editTaskTitle, dueDate: editDueDate, priority: editPriority, category: editCategory }
        : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Complete task
  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);
  };

  // Filter tasks
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(filter.toLowerCase()) ||
      task.category.toLowerCase().includes(filter.toLowerCase())
  );

  // Task priority color mapping
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

  // Task category breakdown
  const categorizedTasks = {
    assignments: tasks.filter((task) => task.category === 'assignments'),
    extracurriculars: tasks.filter((task) => task.category === 'extracurriculars'),
    miscellaneous: tasks.filter((task) => task.category === 'miscellaneous'),
  };

  // Reset new task form
  const resetTaskForm = () => {
    setNewTaskTitle('');
    setDueDate('');
    setPriority('low');
    setCategory('assignments');
  };

  return (
    <div className="planner-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <i className="fa fa-arrow-left"></i> {/* Font Awesome back arrow */}
      </button>

      <h1>Task Planner</h1>

      {/* Task creation form */}
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="assignments">Assignments</option>
          <option value="extracurriculars">Extracurriculars</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Filter tasks */}
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter tasks"
        className="filter-input"
      />

      {/* Display tasks categorized by section */}
      <div className="task-section-container">
        {/* Assignments Table */}
        <div className="task-table">
          <h2><i className="fa fa-book"></i> Assignments</h2>
          {categorizedTasks.assignments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categorizedTasks.assignments.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.dueDate}</td>
                    <td style={{ color: getPriorityColor(task.priority) }}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </td>
                    <td className="action-btns">
                      <button onClick={() => handleCompleteTask(task.id)}>
                        {task.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button onClick={() => handleEditTask(task.id)}>Edit</button>
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tasks found in this category.</p>
          )}
        </div>

        {/* Extracurriculars Table */}
        <div className="task-table">
          <h2><i className="fa fa-users"></i> Extracurriculars</h2>
          {categorizedTasks.extracurriculars.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categorizedTasks.extracurriculars.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.dueDate}</td>
                    <td style={{ color: getPriorityColor(task.priority) }}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </td>
                    <td className="action-btns">
                      <button onClick={() => handleCompleteTask(task.id)}>
                        {task.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button onClick={() => handleEditTask(task.id)}>Edit</button>
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tasks found in this category.</p>
          )}
        </div>

        {/* Miscellaneous Table */}
        <div className="task-table">
          <h2><i className="fa fa-cogs"></i> Miscellaneous</h2>
          {categorizedTasks.miscellaneous.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categorizedTasks.miscellaneous.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.dueDate}</td>
                    <td style={{ color: getPriorityColor(task.priority) }}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </td>
                    <td className="action-btns">
                      <button onClick={() => handleCompleteTask(task.id)}>
                        {task.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button onClick={() => handleEditTask(task.id)}>Edit</button>
                      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tasks found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Planner;
