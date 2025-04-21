"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MessageSquare } from "lucide-react";
import { Task } from "@/lib/validations/type";
import { getPriorityColor } from "@/lib/validations/case";
// import Image from "next/image";

interface TaskDetailsModalProps {
  task: Task;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {task.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Full details for task ID: {task.id}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Priority</h4>
              <Badge
                variant="outline"
                className={`mt-1 text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Status</h4>
              <Badge variant="outline" className="mt-1 text-xs font-medium">
                {task.status}
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700">Description</h4>
            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700">
              Assigned Users
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {task.users.map((user, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Comments</h4>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <MessageSquare className="h-4 w-4 mr-1" />
                {task.comments}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Attachments</h4>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <span className="mr-1">📎</span>
                {task.attachments}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Due Date</h4>
              <p className="mt-1 text-sm text-gray-600">{task.dueDate}</p>
            </div>
          </div>

          {/* {task.status === "In Progress" && (
            <div>
              <h4 className="text-sm font-medium text-gray-700">Preview</h4>
              <Image
                src="/api/placeholder/320/180"
                width={320}
                height={180}
                alt="Task preview"
                className="mt-2 w-full h-48 object-cover rounded-md"
              />
            </div>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsModal;
