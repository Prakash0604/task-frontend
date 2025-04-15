"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Container from "@/Container/container";

// Task type definition with assignee
interface Task {
  id: string;
  content: string;
  status: "pending" | "inProgress" | "completed";
  assignee: string;
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      content: "Create project documentation",
      status: "pending",
      assignee: "Alex Johnson",
    },
    {
      id: "task-2",
      content: "Design user interface",
      status: "pending",
      assignee: "Sam Taylor",
    },
    {
      id: "task-3",
      content: "Implement authentication",
      status: "inProgress",
      assignee: "Jamie Smith",
    },
    {
      id: "task-4",
      content: "Set up database",
      status: "inProgress",
      assignee: "Casey Wilson",
    },
    {
      id: "task-5",
      content: "Write unit tests",
      status: "completed",
      assignee: "Morgan Lee",
    },
  ]);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter tasks by status
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  // Handle drag end event
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item was dropped back in its original position
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    // Find the task that was dragged
    const task = tasks.find((task) => task.id === draggableId);
    if (!task) return;

    // Create a new array without the dragged task
    const newTasks = tasks.filter((task) => task.id !== draggableId);

    // Update the task status based on the destination droppableId
    const updatedTask = {
      ...task,
      status: destination.droppableId as "pending" | "inProgress" | "completed",
    };

    // Add the updated task back to the array
    setTasks([...newTasks, updatedTask]);
  };

  // Add a new task
  const addTask = () => {
    if (newTaskContent.trim() === "") return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      content: newTaskContent,
      status: "pending",
      assignee: newTaskAssignee.trim() || "Unassigned",
    };

    setTasks([...tasks, newTask]);
    setNewTaskContent("");
    setNewTaskAssignee("");
    setIsModalOpen(false);
  };

  return (
    <Container className="container mx-auto p-4">
      <Container className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Task
        </button>
      </Container>

      {/* Modal for adding new task */}
      {isModalOpen && (
        <Container className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Container className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <Container className="mb-4">
              <label
                htmlFor="task"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Task Description
              </label>
              <input
                id="task"
                type="text"
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
                placeholder="Enter task description"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Container>
            <Container className="mb-4">
              <label
                htmlFor="assignee"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Assign To
              </label>
              <input
                id="assignee"
                type="text"
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
                placeholder="Enter person name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Container>
            <Container className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Task
              </button>
            </Container>
          </Container>
        </Container>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Container className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pending Column */}
          <Container className="bg-white rounded-lg shadow overflow-hidden">
            <Container className="bg-gray-100 px-4 py-3 border-b">
              <h2 className="font-semibold text-gray-800">Pending</h2>
            </Container>
            <Droppable droppableId="pending">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-2 min-h-[200px]"
                >
                  {pendingTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 rounded-md shadow mb-2 border border-gray-200"
                        >
                          <div className="font-medium">{task.content}</div>
                          <div className="text-sm text-gray-500 mt-1 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {task.assignee}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Container>

          {/* In Progress Column */}
          <Container className="bg-white rounded-lg shadow overflow-hidden">
            <Container className="bg-blue-100 px-4 py-3 border-b">
              <h2 className="font-semibold text-gray-800">In Progress</h2>
            </Container>
            <Droppable droppableId="inProgress">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-2 min-h-[200px]"
                >
                  {inProgressTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 rounded-md shadow mb-2 border border-gray-200"
                        >
                          <Container className="font-medium">
                            {task.content}
                          </Container>
                          <Container className="text-sm text-gray-500 mt-1 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {task.assignee}
                          </Container>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Container>

          {/* Completed Column */}
          <Container className="bg-white rounded-lg shadow overflow-hidden">
            <Container className="bg-green-100 px-4 py-3 border-b">
              <h2 className="font-semibold text-gray-800">Completed</h2>
            </Container>
            <Droppable droppableId="completed">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-2 min-h-[200px]"
                >
                  {completedTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-3 rounded-md shadow mb-2 border border-gray-200"
                        >
                          <Container className="font-medium">
                            {task.content}
                          </Container>
                          <Container className="text-sm text-gray-500 mt-1 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {task.assignee}
                          </Container>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Container>
        </Container>
      </DragDropContext>
    </Container>
  );
}
