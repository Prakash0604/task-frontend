import { User, Calendar, CheckCircle } from "lucide-react";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Badge } from "@/Components/ui/badge";
import { Task, getAssignee, getPriorityColor } from "@/lib/type";

interface TaskCardProps {
  task: Task;
  provided: DraggableProvided;
  onClick: (task: Task) => void;
}

export const TaskCard = ({ task, onClick, provided }: TaskCardProps) => {
  const assignee = getAssignee(task.assigneeId);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-white p-3 rounded-md shadow mb-2 border cursor-grab hover:bg-gray-50 transition-colors"
      onClick={() => onClick(task)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium text-gray-900">{task.title}</div>
        <Badge className={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
        {assignee && (
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{assignee.name}</span>
          </div>
        )}

        {task.assignedDate && (
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{task.assignedDate}</span>
          </div>
        )}

        {task.completedDate && (
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>{task.completedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
};
