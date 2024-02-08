"use client";
import React, { useContext, useState, useRef } from "react";
import { MyContext } from "./MyContext";
import { remove, ref, update } from "firebase/database";
import { database } from "./firebase";

function Tasks({ columnId, name, id }) {
  const { setColumns, tasks, setTasks, selectedColumnId } =
    useContext(MyContext);

  const [editing, setEditing] = useState(false);
  const [originalContent, setOriginalContent] = useState(name);
  const pRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // deleting task by task id
  const handleDeleteTask = () => {
    remove(ref(database, `${user.uid}/columns/${columnId}/tasks/${id}`));
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };
  const handleEditClick = () => {
    setEditing(true);
    setOriginalContent(pRef.current.textContent);
    pRef.current.focus();
  };

  const handleCancelEditClick = () => {
    setEditing(false);
    pRef.current.textContent = originalContent;
  };

  const handleSaveEditClick = () => {
    const newTaskName = pRef.current.textContent;
    if (newTaskName !== "") {
      update(ref(database, `${user.uid}/columns/${columnId}/tasks/${id}`), {
        taskName: newTaskName,
      });

      setEditing(false);
    } else {
      console.log("Task name cannot be empty");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mx-4 mb-2 bg-gray-50 p-2 rounded-md">
        <p
          ref={pRef}
          className={`${
            editing ? "cursor-text" : ""
          } mr-2 w-full rounded-md my-1 py-1 px-2 text-gray-900 border-0 outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6 text-left ${
            editing ? "ring-1 ring-inset ring-gray-700" : ""
          }`}
          contentEditable={editing}
          suppressContentEditableWarning={true}
        >
          {name}
        </p>

        <div className="flex justify-center items-center gap-2">
          {editing ? (
            <>
              <button title="Save Edit" onClick={(e) => handleSaveEditClick()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </button>
              <button title="Cancel Edit" onClick={handleCancelEditClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-rose-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button title="Edit Task" onClick={handleEditClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button title="Delete Task" onClick={handleDeleteTask}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-rose-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Tasks;
