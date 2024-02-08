"use client";
import React, { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import TaskModal from "./TaskModal";
import Tasks from "./Tasks";
import { set, ref, onValue } from "firebase/database";
import { database } from "./firebase";
import { Draggable, Droppable, DragDropContext } from "@hello-pangea/dnd";

const TaskManager = ({ columnId }) => {
  const { tasks } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <DragDropContext>
        <Droppable droppableId="ROOT" type="columns">
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
