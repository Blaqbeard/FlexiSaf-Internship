// Sample tasks data for TaskFlow - Nigerian context
export const sampleTasks = [
  {
    id: 1,
    text: "Complete FlexiSaf internship task 6",
    priority: "high",
    completed: false,
    category: "work",
    dueDate: "2024-01-15",
  },
  {
    id: 2,
    text: "Buy ingredients for jollof rice",
    priority: "medium",
    completed: false,
    category: "personal",
    dueDate: "2024-01-14",
  },
  {
    id: 3,
    text: "Review React documentation",
    priority: "high",
    completed: true,
    category: "work",
    dueDate: "2024-01-13",
  },
  {
    id: 4,
    text: "Call family in Lagos",
    priority: "low",
    completed: false,
    category: "personal",
    dueDate: "2024-01-16",
  },
  {
    id: 5,
    text: "Prepare presentation for tomorrow",
    priority: "high",
    completed: false,
    category: "work",
    dueDate: "2024-01-15",
  },
  {
    id: 6,
    text: "Visit Lekki Market for fresh produce",
    priority: "medium",
    completed: false,
    category: "shopping",
    dueDate: "2024-01-17",
  },
];

export const categories = [
  { id: "all", name: "All Tasks", color: "#6366f1" },
  { id: "work", name: "Work", color: "#10b981" },
  { id: "personal", name: "Personal", color: "#f59e0b" },
  { id: "shopping", name: "Shopping", color: "#ef4444" },
];

export const priorities = {
  high: { label: "High", color: "#ef4444", icon: "🔴" },
  medium: { label: "Medium", color: "#f59e0b", icon: "🟡" },
  low: { label: "Low", color: "#10b981", icon: "🟢" },
};

