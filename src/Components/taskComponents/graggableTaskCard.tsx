"use client";

import React from "react";
import { useDrag } from "react-dnd";
import { Task, ItemTypes } from "@/lib/validations/type";
import TaskCard from "./taskCard";

interface DraggableTaskCardProps {
  task: Task;
}

const DraggableTaskCard: React.FC<DraggableTaskCardProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag<
    { id: number },
    unknown,
    { isDragging: boolean }
  >({
    type: ItemTypes.TASK,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const ref = React.useRef<HTMLDivElement>(null);
  drag(ref);

  return (
    <div
      ref={ref}
      className={`${
        isDragging ? "opacity-50 dark:text-white" : "opacity-100 "
      } cursor-move dark:text-white`}
    >
      <TaskCard task={task} />
    </div>
  );
};

export default DraggableTaskCard;
