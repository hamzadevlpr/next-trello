"use client";
import React, { useContext } from "react";
import ColumnModal from "./ColumnModal";
import { MyContext } from "./MyContext";
import Column from "./Column";
import Navbar from "./Navbar";

const ColumnManager = () => {
  const { setColumnModal, columns } = useContext(MyContext);

  
  return (
    <>
      <div className="shadow-lg glass-effect rounded-lg text-center relative h-[100%] w-[100%]">
        <Navbar />
        <div
          className={`p-7 w-full flex  items-center flex-wrap rounded-lg ${
            columns.length > 0 ? "justify-start" : "justify-center"
          }`}
        >
          {columns.map((column, index) => (
            <div
              key={index}
              className="bg-gray-200 object-contain min-h-64 rounded-lg w-96 journal-scroll m-2"
            >
              <Column name={column.name} id={column.id} />
            </div>
          ))}
          <button
            className="mx-2 text-white w-20 h-20 flex rounded-full border-2 border-white justify-center items-center"
            onClick={() => setColumnModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
      <ColumnModal />
    </>
  );
};

export default ColumnManager;
