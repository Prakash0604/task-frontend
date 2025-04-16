import { useState } from "react";
import { MoreHorizontal, MessageSquare } from "lucide-react";
import { Badge } from "../ui/badge";
import { Task } from "@/lib/validations/type";
import { getPriorityColor } from "@/lib/validations/utils";
import Image from "next/image";
import TaskDetailsModal from "./taskDetailsModal";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="outline"
            className={`text-xs font-medium ${getPriorityColor(task.priority)}`}
          >
            {task.priority}
          </Badge>
          <MoreHorizontal className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </div>

        <h4 className="font-semibold text-gray-800 mb-1">{task.title}</h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {task.description}
        </p>

        {task.status === "In Progress" && (
          <div className="mb-3">
            <Image
              src="/api/placeholder/320/180"
              width={320}
              height={180}
              alt="Task preview"
              className="w-full h-24 object-cover rounded-md"
            />
          </div>
        )}

        <div className="flex flex-col justify-between items-center mt-2">
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <div className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {task.comments}
            </div>
            <div className="flex items-center">
              <div className="text-xs mr-1">📎</div>
              {task.attachments}
            </div>
            <div className="text-xs">{task.dueDate}</div>
          </div>
        </div>
      </div>

      <TaskDetailsModal
        task={task}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
};

export default TaskCard;
