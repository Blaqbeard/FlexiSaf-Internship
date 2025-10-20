import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import FilterButtons from "./components/FilterButtons";
import { sampleTasks, categories } from "./data/sampleTasks";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  // State management using useState hooks
  const [tasks, setTasks] = useLocalStorage("taskflow-tasks", sampleTasks);
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState("");

  // Event handlers for task management
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        priority: "medium",
        completed: false,
        category: "personal",
        dueDate: new Date().toISOString().split("T")[0],
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (id, updates) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return task.category === filter;
  });

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <TaskStats tasks={tasks} />
        <TaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          onSubmit={handleAddTask}
        />
        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          categories={categories}
        />
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      </main>
    </div>
  );
}

export default App;
