import React, { useState } from "react";
import { priorities } from "../data/sampleTasks";

// Functional component demonstrating props, state, and event handlers
const TaskCard = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task.id, { text: editText.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const priority = priorities[task.priority];

  return (
    <div
      className={`task-card ${task.completed ? "completed" : ""} priority-${
        task.priority
      }`}
    >
      <div className="task-content">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="checkbox"
          />
        </div>

        <div className="task-details">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="edit-input"
              autoFocus
            />
          ) : (
            <span className={`task-text ${task.completed ? "completed" : ""}`}>
              {task.text}
            </span>
          )}

          <div className="task-meta">
            <span
              className="priority-badge"
              style={{ backgroundColor: priority.color }}
            >
              {priority.icon} {priority.label}
            </span>
            <span className="category-badge">
              {task.category === "work" && "💼"}
              {task.category === "personal" && "👤"}
              {task.category === "shopping" && "🛒"}
              {task.category}
            </span>
            <span className="due-date">
              📅 {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        {!isEditing && (
          <button onClick={handleEdit} className="edit-btn" title="Edit task">
            ✏️
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="delete-btn"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

