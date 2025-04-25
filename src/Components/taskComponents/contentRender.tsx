import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import TaskColumn from "./taskColumn";
import TaskForm from "../Form/taskAddForm";
import { Task } from "@/lib/validations/type";

export interface ContentRendererProps {
  selectedTab: string;
  tasks: Task[];
  filteredTasks: Task[];
  moveTask: (taskId: number, newStatus: Task["status"]) => void;
  onClose?: () => void; // Added onClose property
  className?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  selectedTab,
  filteredTasks,
  moveTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const renderContent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return (
          <div className="p-6 text-center text-gray-600 dark:text-gray-300 dark:bg-gray-900">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <p>
              Welcome to your dashboard! Here you can view key metrics and
              stats.
            </p>
          </div>
        );
      case "My Tasks":
        return (
          <>
            <div
              className={`flex-1 overflow-auto p-4 ${
                isModalOpen ? "blur-sm" : ""
              }`}
            >
              <Tabs
                defaultValue="task-board"
                className="w-full dark:bg-gray-900"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4 ">
                  <TabsList className="w-full md:w-auto md:min-w-[50%] md:max-w-[50%] dark:bg-gray-800">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="task-board">Task Board</TabsTrigger>
                    <TabsTrigger value="task-list">Task List</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  </TabsList>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#2596be] hover:bg-[#2596be] text-white px-4 py-2 w-full md:w-auto cursor-pointer"
                  >
                    Add Task
                  </Button>
                </div>

                <TabsContent
                  value="task-board"
                  className="space-y-4 dark:text-white"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 text-white">
                    {[
                      "To Do",
                      "In Progress",
                      "In Review",
                      "Completed",
                      "Backlog",
                    ].map((status) => (
                      <TaskColumn
                        key={status}
                        title={status}
                        count={
                          filteredTasks.filter((t) => t.status === status)
                            .length
                        }
                        tasks={filteredTasks.filter((t) => t.status === status)}
                        allTasks={filteredTasks}
                        onDrop={(id, newStatus) => moveTask(id, newStatus)}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="overview">
                  <div className="text-center py-10 text-gray-600 dark:text-gray-300">
                    Overview content would go here
                  </div>
                </TabsContent>

                <TabsContent value="task-list">
                  <div className="text-center py-10 text-gray-600">
                    Task list content would go here
                  </div>
                </TabsContent>

                <TabsContent value="timeline">
                  <div className="text-center py-10 text-gray-600">
                    Timeline content would go here
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {isModalOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-gray-900"
                onClick={handleOverlayClick}
              >
                <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:text-white">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Task</h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-400"
                    >
                      ✕
                    </button>
                  </div>
                  <TaskForm onClose={() => setIsModalOpen(false)} />
                </div>
              </div>
            )}
          </>
        );
      case "Projects":
        return (
          <div className="p-6 text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <p>Manage your projects and track progress here.</p>
          </div>
        );
      case "Goals":
        return (
          <div className="p-6 text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Goals</h2>
            <p>Set and monitor your goals to stay on track.</p>
          </div>
        );
      case "Calendar":
        return (
          <div className="p-6 text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
            <p>View your schedule and upcoming events.</p>
          </div>
        );
      case "Notifications":
        return (
          <div className="p-6 text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <p>Stay updated with the latest notifications.</p>
          </div>
        );
      case "Settings":
        return (
          <div className="p-6 text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <p>Customize your preferences and account settings.</p>
          </div>
        );
      case "Help":
        return (
          <div className="p-6 text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Help</h2>
            <p>Find answers and get support here.</p>
          </div>
        );
      default:
        return (
          <div className="p-6 text-center text-gray-600">
            <p>Select a tab to view content.</p>
          </div>
        );
    }
  };

  return (
    <>
      <div className="dark:bg-gray-900 w-full h-full">{renderContent()}</div>
    </>
  );
};

export default ContentRenderer;
