"use client";
import React, { useContext, useEffect } from "react";
import ColumnModal from "./ColumnModal";
import { MyContext } from "./MyContext";
import Column from "./Column";
import Navbar from "./Navbar";

const ColumnManager = () => {
  const { setTasks, selectedColumnId, columns, setColumnModal } =
    useContext(MyContext);

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
        <div className="w-full flex items-baseline overflow-x-auto rounded-lg">
          {columns.map((column, index) => (
            <div
              key={index}
              className="bg-gray-200 object-contain min-h-64 rounded-lg mx-2"
            >
              <Column name={column.name} id={column.id} />
            </div>
          ))}
        </div>
      </div>
      <ColumnModal />
    </>
  );
};

export default ColumnManager;
