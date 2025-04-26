import { Calendar, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
  Task,
  COLUMNS,
  getPriorityColor,
  getAssignee,
} from "@/lib/validations/type";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export const TaskDetailModal = ({
  isOpen,
  onClose,
  task,
}: TaskDetailModalProps) => {
  if (!task) return null;

  const assignee = getAssignee(task.assigneeId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
          <DialogDescription>
            <Badge className={`${getPriorityColor(task.priority)} my-2`}>
              {task.priority}
            </Badge>
            <p className="text-sm text-gray-600">
              Status: {COLUMNS[task.columnId].title}
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Description (read-only) */}
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm p-3 bg-gray-50 rounded-md min-h-24">
              {task.description || "No description provided."}
            </p>
          </div>

          {/* Assignee (read-only) */}
          <div>
            <h3 className="font-medium mb-1">Assignee</h3>
            <p className="text-sm">{assignee ? assignee.name : "Unassigned"}</p>
          </div>

          {/* Priority (read-only) */}
          <div>
            <h3 className="font-medium mb-1">Priority</h3>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {task.assignedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Assigned Date</p>
                  <p className="text-sm">{task.assignedDate}</p>
                </div>
              </div>
            )}

            {task.completedDate && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-xs text-gray-500">Completed Date</p>
                  <p className="text-sm">{task.completedDate}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
