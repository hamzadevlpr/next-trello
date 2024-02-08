"use client";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { MyContext } from "./MyContext";
import { set, ref, onValue, get } from "firebase/database";
import { database } from "./firebase";
import { uid } from "uid";

function ColumnModal() {
  const {
    tasks,
    columnModal,
    setColumnModal,
    columns,
    setColumns,
    columnName,
    setColumnName,
    selectedColumnId,
    setTasks,
  } = useContext(MyContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const [uuid, setUuid] = useState(uid());

  const columnsRef = ref(database, "columns");

  const handleAddColumn = () => {
    setUuid(uid());
    if (columnName.trim() !== "") {
      const timestamp = Date.now();
      const columnData = {
        id: uuid,
        name: columnName,
        timestamp: timestamp,
      };

      const columnRef = ref(database, `${user.uid}/columns/${uuid}`);

      set(columnRef, columnData).then(() => {
        setColumnModal(false);
        setColumnName("");
        setColumns([...columns, columnData]);
      });
    }
  };

  // read columns
  useEffect(() => {
    onValue(ref(database, `${user.uid}/columns`), (snapshot) => {
      setColumns([]);
      const data = snapshot.val();
      if (data !== null) {
        const columnss = Object.values(data).map((c) => {
          setColumns((oldCol) => [...oldCol, c]);
        });
      }
    });
  }, []);


  useEffect(() => {
    const fetchTasks = async () => {
      // Create an array to store tasks temporarily
      const allTasks = [];

      // Use Promise.all to fetch tasks for all columns concurrently
      await Promise.all(
        columns.map(async (c) => {
          const snapshot = await get(
            ref(database, `${user.uid}/columns/${c.id}/tasks`)
          );
          const data = snapshot.val();

          if (data !== null) {
            const tasks = Object.values(data);
            allTasks.push(...tasks);
          }
        })
      );

      // Update the state with all the tasks
      setTasks(allTasks);
    };

    fetchTasks();
  }, [columns, user.uid, database]);

  return columnModal ? (
    <div className="fixed z-10 inset-0  flex items-center justify-center">
      <div className="text-center sm:block sm:p-0 w-[30rem]">
        {/* Background overlay */}
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm"></div>

        {/* Modal */}
        <div
          className="inline-block align-bottom bg-gradient-to-r from-pink-400 to-pink-600 text-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="flex flex-col items-center p-8 rounded">
            <h2 className="text-xl font-bold mb-4 text-gray-200">Add Column</h2>
            <input
              type="text"
              placeholder="Column Name"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              className="w-full h-12 px-6 border-2 rounded-lg outline-none"
            />
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddColumn}
            >
              Add
            </button>
            <button
              onClick={() => {
                setColumnModal(false);
                setColumnName("");
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

export default ColumnModal;
