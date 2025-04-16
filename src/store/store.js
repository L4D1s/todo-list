import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['tasks.tasks'],
        ignoredActions: ['tasks/setTasks', 'tasks/addTask', 'tasks/updateTask']
      }
    })
}); 