import React, { useState } from "react";

// Functional component with state management and event handlers
const TaskForm = ({ newTask, setNewTask, onSubmit }) => {
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("personal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onSubmit(e);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs to be done?"
          className="task-input"
          required
        />
        <div className="form-controls">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="work">💼 Work</option>
            <option value="personal">👤 Personal</option>
            <option value="shopping">🛒 Shopping</option>
          </select>
        </div>
      </div>
      <button type="submit" className="add-task-btn">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;

