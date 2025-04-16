import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TaskColumn from "./taskColumn";
import { Task } from "@/lib/validations/type";

interface ContentRendererProps {
  selectedTab: string;
  tasks: Task[];
  filteredTasks: Task[];
  moveTask: (taskId: number, newStatus: Task["status"]) => void;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  selectedTab,
  filteredTasks,
  moveTask,
}: ContentRendererProps) => {
  const renderContent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return (
          <div className="p-6 text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <p>
              Welcome to your dashboard! Here you can view key metrics and
              stats.
            </p>
          </div>
        );
      case "My Tasks":
        return (
          <div className="flex-1 overflow-auto p-4">
            <Tabs defaultValue="task-board" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="task-board">Task Board</TabsTrigger>
                  <TabsTrigger value="task-list">Task List</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="task-board" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
                        filteredTasks.filter((t) => t.status === status).length
                      }
                      tasks={filteredTasks.filter((t) => t.status === status)}
                      onDrop={(id) => moveTask(id, status as Task["status"])}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="overview">
                <div className="text-center py-10 text-gray-600">
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

  return <>{renderContent()}</>;
};

export default ContentRenderer;
