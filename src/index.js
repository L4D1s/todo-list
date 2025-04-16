import React from 'react';
import ReactDOM from 'react-dom/client';
import { TaskProvider, useTasks } from './context/TaskContext';
import createRouter from './plugins/router';
import { RouterProvider } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppRouter = () => {
  const { tasks, addTask, updateTask } = useTasks();
  const router = createRouter(addTask, updateTask, tasks);
  
  return (
    <RouterProvider router={router} />
  );
}

root.render(
  <React.StrictMode>
    <TaskProvider>
      <AppRouter />
    </TaskProvider>
  </React.StrictMode>
);
