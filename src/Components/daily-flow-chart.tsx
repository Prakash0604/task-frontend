import React, { useState } from "react";

interface Task {
  id: string;
  time: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

const initialTasks: Task[] = [
  {
    id: "1",
    time: "08:00",
    title: "Morning Routine",
    description: "Wake up, exercise, and have breakfast",
    status: "completed",
  },
  {
    id: "2",
    time: "09:30",
    title: "Team Meeting",
    description: "Daily standup with the development team",
    status: "in-progress",
  },
  {
    id: "3",
    time: "12:00",
    title: "Lunch Break",
    description: "Take a break and eat lunch",
    status: "pending",
  },
  {
    id: "4",
    time: "13:30",
    title: "Coding Session",
    description: "Work on the new feature implementation",
    status: "pending",
  },
  {
    id: "5",
    time: "16:00",
    title: "Code Review",
    description: "Review pull requests from team members",
    status: "pending",
  },
  {
    id: "6",
    time: "17:30",
    title: "End of Day",
    description: "Wrap up work and plan for tomorrow",
    status: "pending",
  },
];

const DailyFlowChart: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    time: "",
    title: "",
    description: "",
    status: "pending",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleStatusChange = (id: string, status: Task["status"]) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const handleAddTask = () => {
    if (!newTask.time || !newTask.title) return;

    const newId = (tasks.length + 1).toString();
    setTasks([...tasks, { ...newTask, id: newId }]);
    setNewTask({ time: "", title: "", description: "", status: "pending" });
    setIsAdding(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Daily Flow Chart
      </h1>

      <div className="mb-6 flex justify-end">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          >
            Add Task
          </button>
        ) : (
          <div className="w-full bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={newTask.time}
                  onChange={(e) =>
                    setNewTask({ ...newTask, time: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Task title"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                rows={2}
                placeholder="Task description"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleAddTask}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-12 top-8 bottom-0 w-1 bg-blue-200"></div>

        {/* Tasks */}
        <div className="space-y-6">
          {tasks
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((task) => (
              <div key={task.id} className="flex items-start">
                {/* Time indicator */}
                <div className="w-24 text-right pr-4 font-medium text-gray-600 pt-2">
                  {task.time}
                </div>

                {/* Timeline node */}
                <div
                  className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full ${getStatusColor(
                    task.status
                  )} border-4 border-white`}
                >
                  {task.status === "completed" && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                {/* Task card */}
                <div className="ml-4 flex-1 bg-white p-4 rounded-lg shadow-md border border-gray-100">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <div className="flex space-x-2">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(
                            task.id,
                            e.target.value as Task["status"]
                          )
                        }
                        className="text-sm border border-gray-300 rounded px-2 bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DailyFlowChart;
