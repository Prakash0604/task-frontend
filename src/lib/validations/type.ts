export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW" | "DELAYED";
  status: "To Do" | "In Progress" | "In Review" | "Completed" | "Backlog";
  users: { id: number; avatar: string; name: string }[];
  comments: number;
  attachments: number;
  dueDate: string;
}

export const ItemTypes = {
  TASK: "task",
};