import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { TaskCard } from "./taskCard";
import { ColumnId, COLUMNS, Task } from "@/lib/type";

interface ColumnProps {
  columnId: ColumnId;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export const Column = ({ columnId, tasks, onTaskClick }: ColumnProps) => {
  return (
    <div className="min-w-full">
      <Card className="h-full">
        <CardHeader className={`${COLUMNS[columnId].color} rounded-t-lg pb-2`}>
          <CardTitle className="text-center text-sm sm:text-base">
            {COLUMNS[columnId].title}
            <Badge className="ml-2 bg-white text-black">{tasks.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <Droppable droppableId={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-h-52"
              >
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <TaskCard
                        task={task}
                        onClick={onTaskClick}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardContent>
      </Card>
    </div>
  );
};
