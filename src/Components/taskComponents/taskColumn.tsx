"use client";

import React from "react";
import { useDrop } from "react-dnd";
import { Badge } from "../ui/badge";
import { Task, ItemTypes } from "@/lib/validations/type";
import { getStatusColor } from "@/lib/validations/case";
import DraggableTaskCard from "./graggableTaskCard";

const allowedTransitions: Record<string, string[]> = {
  "To Do": ["In Progress"],
  "In Progress": ["To Do", "In Review"],
  "In Review": ["In Progress", "Completed"],
  Completed: ["In Review", "Backlog"],
  Backlog: ["Completed"],
};

interface TaskColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  allTasks: Task[];
  onDrop: (taskId: number, status: Task["status"]) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  count,
  tasks,
  allTasks,
  onDrop,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop<
    { id: number },
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: ItemTypes.TASK,
    canDrop: (item: { id: number }) => {
      console.debug(`Checking canDrop for task ${item.id} to ${title}`);
      const draggedTask = allTasks.find((task) => task.id === item.id);
      if (!draggedTask) {
        console.error(
          `Task with ID ${item.id} not found in allTasks`,
          allTasks
        );
        return false;
      }

      const isAllowed =
        allowedTransitions[draggedTask.status]?.includes(title) ?? false;
      console.debug(
        `Can drop task ${item.id} from ${draggedTask.status} to ${title}? ${isAllowed}`,
        { allowedTransitions: allowedTransitions[draggedTask.status] }
      );
      return isAllowed;
    },
    drop: (item: { id: number }) => {
      console.debug(`Dropped task ${item.id} to ${title}`);
      onDrop(item.id, title as Task["status"]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const dropRef = React.useRef<HTMLDivElement>(null);
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={`flex flex-col h-full p-4 rounded-lg ${
        isOver && canDrop ? "bg-blue-100" : "bg-white"
      } shadow-md min-h-[200px]`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-3 h-3 rounded-full ${getStatusColor(title)}`}></div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <Badge variant="outline" className="ml-2 text-xs">
          {count}
        </Badge>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <DraggableTaskCard key={`${task.id}-${task.status}`} task={task} />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="border-2 border-dashed border-gray-200 rounded-md p-4 text-center text-gray-400 text-sm h-32 flex items-center justify-center">
          Drop tasks here
        </div>
      )}
    </div>
  );
};

export default TaskColumn;
