"use client";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import { set, ref } from "firebase/database";
import { database } from "./firebase";
import { uid } from "uid";

function TaskModal() {
  const {
    tasks,
    setTasks,
    taskName,
    setTaskName,
    taskModal,
    setTaskModal,
    selectedColumnId,
    columns,
  } = useContext(MyContext);

  const [uuid, setUuid] = useState(uid());
  const [columName, setColumnName] = useState("");

  useEffect(() => {
    const selectedColumn = columns.find((c) => c.id === selectedColumnId);

    if (selectedColumn) {
      setColumnName(selectedColumn.name);
    }
  }, [selectedColumnId, columns]);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleAddTask = () => {
    setUuid(uid());
    set(
      ref(database, `${user.uid}/columns/${selectedColumnId}/tasks/${uuid}`),
      {
        id: uuid,
        taskName: taskName,
        columnId: selectedColumnId,
      }
    );
    setTasks([
      ...tasks,
      {
        id: uuid,
        taskName: taskName,
        columnId: selectedColumnId,
      },
    ]);
    setTaskModal(false);
    setTaskName("");
  };

  return taskModal ? (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="text-center sm:block sm:p-0 w-[30rem]">
        {/* Background overlay */}
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm"></div>

        {/* Modal */}
        <div
          className="inline-block align-bottom bg-gradient-to-r from-pink-400 to-pink-600 text-gray-800 rounded-lg text-left -hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="flex flex-col items-center p-8 rounded">
            <h2 className="text-xl font-bold mb-4 text-gray-200">
              Add Task for {columName}
            </h2>
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full h-12 px-6 border-2 rounded-lg outline-none"
            />
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddTask}
            >
              Add
            </button>
            <button
              onClick={() => {
                setTaskModal(false);
                setTaskName("");
              }}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default TaskModal;
