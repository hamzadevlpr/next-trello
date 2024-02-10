import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import TaskModal from "./TaskModal";
import Tasks from "./Tasks";
import ColumnModal from "./ColumnModal";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { remove, ref } from "firebase/database";
import { database } from "./firebase";
import Navbar from "./Navbar";

const ColumnManager = () => {
  const {
    tasks,
    setTasks,
    setSelectedColumnId,
    columns,
    setColumns,
    setColumnModal,
    setTaskModal,
  } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));

  // deleting column by column id
  const handleDeleteColumn = (columnIdToDelete) => {
    remove(ref(database, `${user.uid}/columns/${columnIdToDelete}`));
    const updatedColumns = columns.filter((c) => c.id !== columnIdToDelete);
    setColumns(updatedColumns);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    // If user drops outside a valid droppable area
    if (!destination) return;
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="shadow-lg glass-effect rounded-lg relative h-[100%] w-[100%] pb-6">
          <Navbar />
          <button
            onClick={() => setColumnModal(true)}
            className="bg-white bg-opacity-40 py-3 px-5 m-2 float-right text-sm font-bold text-white rounded"
          >
            Add Column
          </button>

          <div className="w-full flex items-start overflow-x-auto rounded-lg">
            {columns.map((column, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-between items-center bg-gray-200  min-h-64 rounded-lg mx-2"
                >
                  <div className="flex justify-between p-4 bg-gray-300 rounded-t-lg w-80">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {column.name}
                    </h2>
                    <button
                      onClick={() => {
                        handleDeleteColumn(column.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-rose-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                  <Droppable droppableId={column.id.toString()} type="group">
                    {(droppableProvided, droppableSnapshot) => (
                      <div
                        className={`py-2 border-2 w-full h-[25rem]  border-${
                          droppableSnapshot.isDraggingOver
                            ? "pink-400"
                            : "black"
                        } border-dashed`}
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                      >
                        <div className="flex flex-col justify-center items-center">
                          {tasks
                            .filter((task) => task.columnId === column.id)
                            .map((task, index) => (
                              <div
                                key={index}
                                className="rounded-lg journal-scroll"
                              >
                                <Draggable
                                  key={task.id}
                                  draggableId={`${task.id}`}
                                  index={index}
                                >
                                  {(draggableProvided, snapshot) => (
                                    <div
                                      ref={draggableProvided.innerRef}
                                      {...draggableProvided.draggableProps}
                                      {...draggableProvided.dragHandleProps}
                                      style={{
                                        ...draggableProvided.draggableProps
                                          .style,
                                        opacity: snapshot.isDragging ? 0.5 : 1,
                                      }}
                                    >
                                      <Tasks
                                        name={task.taskName}
                                        id={task.id}
                                        columnId={column.id}
                                      />
                                      {draggableProvided.placeholder}
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
              );
            })}
          </div>
        </div>
      </DragDropContext>
      <ColumnModal />
      <TaskModal />
    </>
  );
};

export default ColumnManager;
