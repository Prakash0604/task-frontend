"use client";

import { useDrag } from "react-dnd";
import { Task, ItemTypes } from "@/lib/validations/type";
import TaskCard from "./taskCard";
import { RefObject } from "react";

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

  return (
    <div
      ref={drag as unknown as RefObject<HTMLDivElement>}
      className={`${isDragging ? "opacity-50" : "opacity-100"} cursor-move`}
    >
      <TaskCard task={task} />
    </div>
  );
};

export default DraggableTaskCard;
