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

import { Task, COLUMNS, getPriorityColor, getAssignee } from "@/lib/type";

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
      <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-xl p-6">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            {task.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 mt-2">
            <Badge
              className={`${getPriorityColor(
                task.priority
              )} font-medium px-2.5 py-0.5 transition-colors duration-200`}
            >
              {task.priority}
            </Badge>
            <span className="text-sm text-gray-500">
              Status: {COLUMNS[task.columnId].title}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Description
            </h3>
            <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:bg-gray-100">
              {task.description || "No description provided."}
            </div>
          </div>

          {/* Assignee */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Assignee</h3>
            <p className="text-sm text-gray-600">
              {assignee ? assignee.name : "Unassigned"}
            </p>
          </div>

          {/* Priority */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Priority</h3>
            <Badge
              className={`${getPriorityColor(
                task.priority
              )} font-medium px-2.5 py-0.5`}
            >
              {task.priority}
            </Badge>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {task.assignedDate && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Assigned Date
                  </p>
                  <p className="text-sm text-gray-700">{task.assignedDate}</p>
                </div>
              </div>
            )}

            {task.completedDate && (
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Completed Date
                  </p>
                  <p className="text-sm text-gray-700">{task.completedDate}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button
            onClick={onClose}
            className="bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 px-4 py-2 rounded-lg"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
