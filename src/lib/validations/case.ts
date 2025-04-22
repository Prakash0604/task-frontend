export function getStatusColor(status: string): string {
  switch (status) {
    case "To Do":
      return "bg-red-500";
    case "In Progress":
      return "bg-yellow-500";
    case "In Review":
      return "bg-purple-500";
    case "Completed":
      return "bg-green-500";
    case "Backlog":
      return "bg-gray-500";
    default:
      return "bg-blue-500";
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-600 border-red-200";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-600 border-yellow-200";
    case "LOW":
      return "bg-green-100 text-green-600 border-green-200";
    case "DELAYED":
      return "bg-gray-100 text-gray-600 border-gray-200";
    default:
      return "bg-blue-100 text-blue-600 border-blue-200";
  }
}