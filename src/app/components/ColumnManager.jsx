import React, { useContext } from "react";
import ColumnModal from "./ColumnModal";
import { MyContext } from "./MyContext";
import Column from "./Column";
import Navbar from "./Navbar";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const ColumnManager = () => {
  const {
    setTasks,
    setSelectedColumnId,
    columns,
    setColumnModal,
    setTaskModal,
  } = useContext(MyContext);

  return (
    <>
        <div className="shadow-lg glass-effect rounded-lg relative h-[100%] w-[100%] pb-6">
          <Navbar />
          <button
            onClick={() => setColumnModal(true)}
            className="bg-white bg-opacity-40 py-3 px-5 m-2 float-right text-sm font-bold text-white rounded"
          >
            Add Column
          </button>

          <div className="w-full flex items-start overflow-x-auto rounded-lg">
            {columns.map((column, index) => (
              <div
                key={index}
                className="flex flex-col justify-between items-center bg-gray-200  min-h-64 rounded-lg mx-2"
              >
                <Column name={column.name} id={column.id} />

                {/* task add icon */}
                <button
                  className="m-2 text-gray-800 w-10 h-10 flex rounded-full border-2 border-gray-800 justify-center items-center"
                  onClick={() => {
                    setSelectedColumnId(column.id);
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
            ))}
          </div>
        </div>
      <ColumnModal />
    </>
  );
};

export default ColumnManager;
