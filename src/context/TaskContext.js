import React, { createContext, useContext, useState } from 'react';
import { tasksData } from "../components/tasks/tasksData";


const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(tasksData);

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: Date.now() }]);
  };

  const completeTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: true } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, updateTask, addTask, completeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
