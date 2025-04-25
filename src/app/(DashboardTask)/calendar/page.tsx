"use client";

import { useTaskContext } from "@/Components/taskComponents/taskContext";
import ContentRenderer from "@/Components/taskComponents/contentRender";

export default function TasksPage() {
  const { tasks, filteredTasks, moveTask } = useTaskContext();

  return (
    <ContentRenderer
      selectedTab="Calendar"
      tasks={tasks}
      filteredTasks={filteredTasks}
      moveTask={moveTask}
    />
  );
}
