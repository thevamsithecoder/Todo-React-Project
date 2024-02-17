import React from 'react';

// Task component represents a single task item in the list
const Task = ({ task, toggleCompletion, deleteTask }) => {
  return (
    // List item representing the task
    <li className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-info-subtle' : ''}`}>
      <div>
        {/* Checkbox for toggling task completion */}
        <input type="checkbox" checked={task.completed} onChange={toggleCompletion} className="mr-3" />
        {/* Badge indicating task completion status */}
        {task.completed ? (
          <span className="badge badge-success"><i className="bi bi-check-circle-fill"></i></span>
        ) : (
          <span className="badge badge-warning text-dark"><i className="bi bi-circle"></i></span>
        )}
        {/* Task title */}
        <span>{task.title}</span>
      </div>
      {/* Button to delete the task */}
      <button onClick={deleteTask} className="btn btn-danger btn-sm">Delete</button>
    </li>
  );
};

export default Task;