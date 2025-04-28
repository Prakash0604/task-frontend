"use client";

import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { Column } from "./taskColumn";
import { TaskDetailModal } from "./detailsModal";
import AddTaskForm from "../forms/taskAddForm";
import { Button } from "../ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { Task, ColumnId, ALLOWED_TRANSITIONS, COLUMN_ORDER } from "@/lib/type";

interface KanbanBoardProps {
  initialTasks: Task[];
}

export const KanbanBoard = ({ initialTasks }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Create a map of tasks by column
  const tasksByColumn = COLUMN_ORDER.reduce((acc, columnId) => {
    acc[columnId] = tasks.filter((task) => task.columnId === columnId);
    return acc;
  }, {} as Record<string, Task[]>);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceColumnId = source.droppableId as ColumnId;
    const destinationColumnId = destination.droppableId as string;

    if (
      !ALLOWED_TRANSITIONS[sourceColumnId].includes(
        destinationColumnId as ColumnId
      )
    ) {
      toast.error(`Cannot move tasks more than one step at a time.`);
      return;
    }

    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;

    const updatedTask = {
      ...task,
      columnId: destinationColumnId as ColumnId,
      completedDate:
        destinationColumnId === "completed"
          ? new Date().toISOString().split("T")[0]
          : task.completedDate,
    };

    const newTasks = tasks.map((t) => (t.id === draggableId ? updatedTask : t));

    if (
      sourceColumnId === destinationColumnId &&
      source.index !== destination.index
    ) {
      const columnTasks = [...tasksByColumn[sourceColumnId]];
      const [removed] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, removed);

      const newTasksReordered = tasks.filter(
        (t) => t.columnId !== sourceColumnId
      );
      columnTasks.forEach((task) => newTasksReordered.push(task));

      setTasks(newTasksReordered);
      return;
    }

    setTasks(newTasks);
  };

  const addNewTask = (title: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      status: "To Do", // Added the required 'status' property
      description: "",
      columnId: "backlog",
      assigneeId: null,
      assignedDate: null,
      completedDate: null,
      priority: "medium",
    };

    setTasks([...tasks, newTask]);
    setIsTaskModalOpen(false); // close modal after adding
  };

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">TaskMandu</h1>
        <Button onClick={() => setIsTaskModalOpen(true)}>Add Task</Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {COLUMN_ORDER.map((columnId) => (
            <Column
              key={columnId}
              columnId={columnId}
              tasks={tasksByColumn[columnId]}
              onTaskClick={openTaskModal}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Modal for AddTaskForm */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <AddTaskForm
            onAddTask={addNewTask}
            onClose={() => setIsTaskModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Modal for Task Details */}
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};
