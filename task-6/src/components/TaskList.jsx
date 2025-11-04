import React from "react";
import TaskCard from "./TaskCard";

// Functional component demonstrating props and Virtual DOM with key prop
const TaskList = ({ tasks, onToggle, onDelete, onUpdate }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id} // Virtual DOM optimization with unique key
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;





