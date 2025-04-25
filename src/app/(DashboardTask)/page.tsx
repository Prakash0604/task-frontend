"use client";

import { useTaskContext } from "@/Components/taskComponents/taskContext";
import ContentRenderer from "@/Components/taskComponents/contentRender";

export default function Dashboard() {
  const { tasks, filteredTasks, moveTask } = useTaskContext();

  return (
    <ContentRenderer
      selectedTab="Dashboard"
      tasks={tasks}
      filteredTasks={filteredTasks}
      moveTask={moveTask}
    />
  );
}
