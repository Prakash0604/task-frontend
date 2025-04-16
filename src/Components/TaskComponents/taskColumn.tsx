"use client";

import { useDrop } from "react-dnd";
import { Badge } from "../ui/badge";
import { Task, ItemTypes } from "@/lib/validations/type";
import { getStatusColor } from "@/lib/validations/utils";
import DraggableTaskCard from "./graggableTaskCard";
import React from "react";

interface TaskColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  onDrop: (taskId: number) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  count,
  tasks,
  onDrop,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop<
    { id: number },
    { status: string },
    { isOver: boolean }
  >({
    accept: ItemTypes.TASK,
    drop: (item: { id: number }) => {
      onDrop(item.id);
      return { status: title };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const dropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  return (
    <div
      ref={dropRef}
      className={`flex flex-col h-full p-4 rounded-lg ${
        isOver ? "bg-blue-50" : "bg-white"
      } shadow-md`}
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
          <DraggableTaskCard key={task.id} task={task} />
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
