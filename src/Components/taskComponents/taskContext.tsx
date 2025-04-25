"use client";

import { createContext, useContext, useState } from "react";
import { Task } from "@/lib/validations/type";

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredTasks: Task[];
  moveTask: (taskId: number, newStatus: Task["status"]) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 2,
      title: "Landing Page Refresh",
      description: "Revamp the homepage to improve engagement.",
      priority: "MEDIUM",
      status: "In Progress",
      users: [
        { id: 1, avatar: "/avatar1.png", name: "User 1" },
        { id: 2, avatar: "/avatar2.png", name: "User 2" },
      ],
      comments: 10,
      attachments: 6,
      dueDate: "11 Sep, 2024",
    },
    {
      id: 3,
      title: "Optimize Mobile Layout",
      description: "Enhance mobile UI for better usability.",
      priority: "HIGH",
      status: "In Review",
      users: [
        { id: 1, avatar: "/avatar1.png", name: "User 1" },
        { id: 2, avatar: "/avatar2.png", name: "User 2" },
        { id: 3, avatar: "/avatar3.png", name: "User 3" },
      ],
      comments: 12,
      attachments: 8,
      dueDate: "29 Aug, 2024",
    },
    {
      id: 4,
      title: "Style Guide Update",
      description:
        "Update the style guide to reflect the latest branding elements.",
      priority: "LOW",
      status: "Completed",
      users: [
        { id: 1, avatar: "/avatar1.png", name: "User 1" },
        { id: 2, avatar: "/avatar2.png", name: "User 2" },
      ],
      comments: 4,
      attachments: 1,
      dueDate: "17 Aug, 2024",
    },
    {
      id: 5,
      title: "App Icon Redesign",
      description:
        "Design a fresh, modern app icon that aligns with the new branding.",
      priority: "DELAYED",
      status: "Backlog",
      users: [
        { id: 1, avatar: "/avatar1.png", name: "User 1" },
        { id: 2, avatar: "/avatar2.png", name: "User 2" },
        { id: 3, avatar: "/avatar3.png", name: "User 3" },
        { id: 4, avatar: "/avatar4.png", name: "User 4" },
        { id: 5, avatar: "/avatar5.png", name: "User 5" },
      ],
      comments: 2,
      attachments: 1,
      dueDate: "15 Oct, 2024",
    },
    {
      id: 6,
      title: "Create Onboarding Flow",
      description: "Design a seamless onboarding experience for new users.",
      priority: "MEDIUM",
      status: "To Do",
      users: [
        { id: 1, avatar: "/avatar1.png", name: "User 1" },
        { id: 2, avatar: "/avatar2.png", name: "User 2" },
      ],
      comments: 10,
      attachments: 6,
      dueDate: "11 Sep, 2024",
    },
    {
      id: 7,
      title: "Prototype New Feature",
      description: "Build an interactive prototype for user testing.",
      priority: "LOW",
      status: "In Review",
      users: [
        { id: 1, avatar: "/avatar1.png", name: "User 1" },
        { id: 2, avatar: "/avatar2.png", name: "User 2" },
        { id: 3, avatar: "/avatar3.png", name: "User 3" },
        { id: 4, avatar: "/avatar4.png", name: "User 4" },
      ],
      comments: 20,
      attachments: 7,
      dueDate: "1 Sep, 2024",
    },
    {
      id: 8,
      title: "Dashboard Visualization",
      description: "Create visual components for the user dashboard.",
      priority: "MEDIUM",
      status: "Completed",
      users: [
        { id: 1, avatar: "/avatar1.png", name: "User 1" },
        { id: 2, avatar: "/avatar2.png", name: "User 2" },
      ],
      comments: 6,
      attachments: 5,
      dueDate: "29 Nov, 2024",
    },
    {
      id: 9,
      title: "High-Fidelity Mockups",
      description: "Produce detailed mockups for the development team.",
      priority: "DELAYED",
      status: "Backlog",
      users: [
        { id: 1, avatar: "/avatar1.png", name: "User 1" },
        { id: 2, avatar: "/avatar2.png", name: "User 2" },
        { id: 3, avatar: "/avatar3.png", name: "User 3" },
      ],
      comments: 6,
      attachments: 5,
      dueDate: "29 Nov, 2024",
    },
    {
      id: 10,
      title: "Design Product Tour",
      description: "Create a guided, interactive product tour for new users.",
      priority: "HIGH",
      status: "In Progress",
      users: [
        { id: 1, avatar: "/avatar1.png", name: "User 1" },
        { id: 2, avatar: "/avatar2.png", name: "User 2" },
      ],
      comments: 8,
      attachments: 3,
      dueDate: "5 Oct, 2024",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const moveTask = (taskId: number, newStatus: Task["status"]) => {
    console.debug(`Moving task ${taskId} to ${newStatus}`);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        searchQuery,
        setSearchQuery,
        filteredTasks,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
