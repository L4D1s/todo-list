import React, { createContext, useContext, useState, useEffect } from 'react';
import { tasksData } from "../components/tasks/tasksData";

const STORAGE_KEY = 'todo-tasks';

const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);

      return parsedTasks.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt),
        deadline: new Date(task.deadline)
      }));
    }
    return tasksData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

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
