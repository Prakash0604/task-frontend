"use client";

import DefaultLayout from "@/Components/layout";
import { KanbanBoard } from "@/Components/taskComponents/task";
import { Task } from "@/lib/validations/type";

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Create project setup",
    status: "Completed",
    description:
      "Initialize project repository and set up basic framework structure",
    columnId: "completed",
    assigneeId: "user-1",
    assignedDate: "2025-04-20",
    completedDate: "2025-04-23",
    priority: "high",
  },
  {
    id: "task-2",
    title: "Design database schema",
    status: "In Progress",
    description: "Create database models and relationships for the application",
    columnId: "review",
    assigneeId: "user-2",
    assignedDate: "2025-04-21",
    completedDate: null,
    priority: "medium",
  },
  {
    id: "task-3",
    title: "Implement authentication",
    status: "In Progress",
    description: "Set up user authentication and authorization functionality",
    columnId: "progress",
    assigneeId: "user-3",
    assignedDate: "2025-04-22",
    completedDate: null,
    priority: "high",
  },
  {
    id: "task-4",
    title: "Create user dashboard",
    status: "To Do",
    description: "Design and implement the main user dashboard interface",
    columnId: "todo",
    assigneeId: "user-4",
    assignedDate: "2025-04-24",
    completedDate: null,
    priority: "medium",
  },
  {
    id: "task-5",
    title: "Write documentation",
    status: "To Do",
    description: "Document code, APIs, and user guides for the application",
    columnId: "backlog",
    assigneeId: null,
    assignedDate: null,
    completedDate: null,
    priority: "low",
  },
];

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <KanbanBoard initialTasks={initialTasks} />;
      </DefaultLayout>
    </>
  );
}
