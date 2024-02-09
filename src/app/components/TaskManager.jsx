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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={columnId.toString()} type="columns">
          {(droppableProvided, droppableSnapshot) => (
            <div
              className={`py-2 border w-full h-[25rem]  border-${
                droppableSnapshot.isDraggingOver ? "pink-400" : "black"
              } border-dashed`}
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              <div className="flex flex-col justify-center items-center">
                {tasks.map((task, index) => (
                  <div key={index} className="rounded-lg journal-scroll">
                    <Draggable
                      key={task.id}
                      draggableId={`${task.id}`}
                      index={index}
                      type="columns"
                    >
                      {(draggableProvided, draggableSnapshot) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                        >
                          {task.columnId === columnId && (
                            <Tasks
                              name={task.taskName}
                              id={task.id}
                              columnId={columnId}
                            />
                          )}
                          {draggableProvided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {droppableProvided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
        <TaskModal />
      </DragDropContext>
    </>
  );
};

export default TaskManager;
