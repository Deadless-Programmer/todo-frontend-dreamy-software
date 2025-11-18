"use client";

import { Todo } from "@/types/todo";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";

interface TasksPageProps {
  tasks: Todo[];
  onEdit: (task: Todo) => void;
  onDelete: (id: number) => void;
}

export default function TasksPage({ tasks, onEdit, onDelete }: TasksPageProps) {
  const [todoList, setTodoList] = useState<Todo[]>(tasks);

  const cardBorderColors: Record<string, string> = {
    low: "border-green-300",
    medium: "border-yellow-300",
    extreme: "border-red-300",
  };

  const priorityColors: Record<string, string> = {
    low: "text-green-700 bg-green-100",
    medium: "text-yellow-700 bg-yellow-100",
    extreme: "text-red-700 bg-red-100",
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodoList(items);
  };

  useEffect(() => {
    setTodoList(tasks);
  }, [tasks]);

  return (
    <div className="py-10">
 <h1 className="text-2xl font-semibold mb-5">Your Tasks</h1>
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            className="grid md:grid-cols-3 gap-6"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todoList.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    className={`bg-white p-5 rounded-xl shadow-sm border ${cardBorderColors[task.priority.toLowerCase()]} hover:shadow-md transition`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900 truncate">
                        {task.title}
                      </h2>
                      <div className="flex justify-between items-center gap-2">
                        <span className={`px-3 py-1 rounded-md text-xs font-medium ${priorityColors[task.priority.toLowerCase()]}`}>
                          {task.priority}
                        </span>
                        <CgMenuGridR className="text-[#8CA3CD] text-xl" />
                      </div>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm truncate">{task.description}</p>

                    <div className="flex justify-between items-center mt-4">
                      <p className="text-gray-700 text-sm font-medium">Due {task.todo_date}</p>

                      <div className="flex gap-3">
                        <button onClick={() => onEdit(task)} className="p-2 cursor-pointer bg-blue-100 rounded-md hover:bg-blue-200 transition">
                          <Pencil size={16} className="text-blue-700" />
                        </button>
                        <button onClick={() => onDelete(task.id)} className="p-2 cursor-pointer bg-red-100 rounded-md hover:bg-red-200 transition">
                          <Trash2 size={16} className="text-red-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
  );
}
