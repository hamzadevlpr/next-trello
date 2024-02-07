'use client'
import React, { createContext, useEffect, useState } from "react";
const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [task, setTask] = useState([]);
  const [status, setStatus] = useState("Doing");
  const [isLogin, setIsLogin] = useState(false);
  const [columnModal, setColumnModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedColumnId, setSelectedColumnId] = useState(null);

  return (
    <MyContext.Provider
      value={{
        task,
        setTask,
        status,
        setStatus,
        isLogin,
        setIsLogin,
        columnModal,
        setColumnModal,
        columnName,
        setColumnName,
        columns,
        setColumns,
        tasks,
        setTasks,
        taskName,
        setTaskName,
        taskModal,
        setTaskModal,
        selectedColumnId,
        setSelectedColumnId,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
