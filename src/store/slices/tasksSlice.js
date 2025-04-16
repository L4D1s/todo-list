import { createSlice } from '@reduxjs/toolkit';
import { tasksData } from '../../components/tasks/tasksData';

const STORAGE_KEY = 'todo-tasks';

const loadInitialState = () => {
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
};

const initialState = {
  tasks: loadInitialState(),
  loading: false,
  error: null
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      }
    },
    completeTask: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isCompleted = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setTasks, addTask, updateTask, completeTask, setLoading, setError } = tasksSlice.actions;
export default tasksSlice.reducer; 