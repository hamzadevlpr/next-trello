"use client";
import React, { useContext } from "react";
import ColumnModal from "./ColumnModal";
import { MyContext } from "./MyContext";
import Column from "./Column";
import TaskModal from "./TaskModal";
import Tasks from "./Tasks";

const TaskManager = ({ columnId }) => {
  const {
    setTaskModal,
    tasks,
    columns,
    setSelectedColumnId,
    selectedColumnId,
  } = useContext(MyContext);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="w-full object-contain rounded-lg journal-scroll"
          >
            {task.columnId === columnId && (
              <Tasks name={task.taskName} id={task.id} />
            )}
          </div>
        ))}
        <button
          className="mx-2 text-gray-800 w-10 h-10 flex rounded-full border-2 border-gray-800 justify-center items-center"
          onClick={() => {
            setSelectedColumnId(columnId);
            setTaskModal(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <TaskModal />
    </>
  );
};

export default TaskManager;
