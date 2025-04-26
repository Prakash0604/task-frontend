export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "HIGH":
      return "bg-red-500 text-white hover:bg-red-600";
    case "MEDIUM":
      return "bg-yellow-500 text-white hover:bg-yellow-600";
    case "LOW":
      return "bg-green-500 text-white hover:bg-green-600";
    case "DELAYED":
      return "bg-gray-500 text-white hover:bg-gray-600";
    default:
      return "bg-gray-200 text-gray-800 hover:bg-gray-300";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "To Do":
      return "bg-blue-500";
    case "In Progress":
      return "bg-yellow-500";
    case "In Review":
      return "bg-purple-500";
    case "Completed":
      return "bg-green-500";
    case "Backlog":
      return "bg-gray-500";
    default:
      return "bg-gray-200";
  }
}