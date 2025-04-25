"use client";

import { useTaskContext } from "@/Components/taskComponents/taskContext";
import ContentRenderer from "@/Components/taskComponents/contentRender";

export default function ProjectsPage() {
  const { tasks, filteredTasks, moveTask } = useTaskContext();

  return (
    <ContentRenderer
      selectedTab="Projects"
      tasks={tasks}
      filteredTasks={filteredTasks}
      moveTask={moveTask}
    />
  );
}
