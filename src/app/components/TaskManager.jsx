"use client";
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

      // update the task order in the database when the task is dragged within the same column
      // update(
      //   ref(database, `${user.uid}/columns/${columnId}/tasks/${draggableId}`),
      //   {
      //     taskOrder: destination.index,
      //   }
      // );
      setTasks(updatedTasks);
      console.log(tasks);
    } else {
      // Dropped in a different column
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={columnId.toString()} type="columns">
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              <div className="flex flex-col justify-center items-center">
                {tasks.map((task, index) => (
                  <div key={index} className="w-full rounded-lg journal-scroll">
                    <Draggable
                      key={task.id}
                      draggableId={`${task.id}`}
                      index={index}
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
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
              </div>
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <TaskModal />
    </>
  );
};

export default TaskManager;
