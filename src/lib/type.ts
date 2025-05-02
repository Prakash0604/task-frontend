export type ColumnId = "backlog" | "todo" | "progress" | "review" | "completed";

export interface Task {
  id: string;
  title: string;
  status: "To Do" | "In Progress" | "Completed";
  description: string;
  columnId: ColumnId;
  assigneeId: string | null;
  assignedDate: string | null;
  completedDate: string | null;
  priority: "low" | "medium" | "high";
}

export interface Project {
  id: number;
  name: string;
  createDate: string;
  description: string;
  assignedPersons?: string[];
  completionDate?: string | null;
}

export const COLUMNS: Record<ColumnId, { title: string; color: string }> = {
  backlog: { title: "Backlog",color: "bg-gray-200 dark:bg-gray-700" },
  todo: { title: "To-Do", color: "bg-blue-200" },
  progress: { title: "In Progress", color: "bg-yellow-200" },
  review: { title: "In Review", color: "bg-purple-200" },
  completed: { title: "Completed", color: "bg-green-200" },
};

export const COLUMN_ORDER: ColumnId[] = [
  "todo",
  "progress",
  "review",
  "completed",
  "backlog",
];

export const ALLOWED_TRANSITIONS: Record<ColumnId, ColumnId[]> = {
  backlog: ["todo"],
  todo: ["backlog", "progress"],
  progress: ["todo", "review"],
  review: ["progress", "completed"],
  completed: ["review"],
};

export const USERS = [
  { id: "user-1", name: "Alex Smith", avatar: "/api/placeholder/40/40" },
  { id: "user-2", name: "Sam Jones", avatar: "/api/placeholder/40/40" },
  { id: "user-3", name: "Taylor Kim", avatar: "/api/placeholder/40/40" },
  { id: "user-4", name: "Jordan Lee", avatar: "/api/placeholder/40/40" },
];

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getAssignee = (assigneeId: string | null) => {
  if (!assigneeId) return null;
  return USERS.find((user) => user.id === assigneeId);
};