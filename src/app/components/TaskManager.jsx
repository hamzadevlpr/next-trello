import React, { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import TaskModal from "./TaskModal";
import Tasks from "./Tasks";
import { Draggable, Droppable, DragDropContext } from "@hello-pangea/dnd";
import { update, ref } from "firebase/database";
import { database } from "./firebase";

const TaskManager = ({ columnId }) => {
  const { tasks, setTasks, setColumns, columns } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      // Dropped within the same column but at a different position
      const updatedTasks = [...tasks];
      const [draggedItem] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, draggedItem);
      setTasks(updatedTasks);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {tasks.map((task, index) => (
          <div key={index} className="rounded-lg journal-scroll">
            {task.columnId === columnId && (
              <Tasks name={task.taskName} id={task.id} columnId={columnId} />
            )}
          </div>
        ))}
      </div>
      <TaskModal />
    </>
  );
};

export default TaskManager;
