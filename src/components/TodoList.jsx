import React, { useState, useEffect } from "react";
import Task from "./Task";

// Function to get tasks from local storage
const getLocalTasks = () => {
  let tasks = localStorage.getItem("tasks");

  if (tasks) {
    return JSON.parse(localStorage.getItem("tasks"));
  } else {
    return [];
  }
};

const TodoList = () => {
  // State variables
  const [tasks, setTasks] = useState(getLocalTasks());
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Effect to save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  // Event handler for input change
  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    setTasks([{ title: newTask, completed: false }, ...tasks]);
    setNewTask("");
  };

  // Toggle completion status of a task
  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // JSX
  return (
    <div className="container w-50">
      {/* Heading */}
      <h1 className="mt-5 mb-4 heading">Todo List</h1>
      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newTask}
            onChange={handleChange}
            placeholder="Add New Task"
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
      {/* Filter buttons */}
      <div className="btn-group mb-3 d-flex justify-center">
        <button
          className={`btn ${
            filter === "all" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn ${
            filter === "completed" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`btn ${
            filter === "incomplete" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
      </div>
      {/* Task list */}
      <ul className="list-group">
        {filteredTasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            toggleCompletion={() => toggleCompletion(index)}
            deleteTask={() => deleteTask(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;