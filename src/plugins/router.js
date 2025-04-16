import { createHashRouter } from 'react-router-dom';
import App from '../App';
import TaskList from '../components/tasks/TaskList';
import { store } from '../store/store';
import { addTask, updateTask } from '../store/slices/tasksSlice';

const createSearchLoader = () => {
  return ({ request }) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('search') || '';
    return { searchQuery };
  };
};

const createRouter = () => {
  const taskAction = async ({ request }) => {
    const tasks = store.getState().tasks.tasks;
    const formData = await request.formData();
    const taskData = Object.fromEntries(formData);
    
    if (request.method === 'POST') {
      const newTask = {
        ...taskData,
        id: Date.now(),
        createdAt: new Date(),
        deadline: new Date(taskData.deadline),
        participants: taskData.participants.split(',').map(p => p.trim()),
        tags: taskData.tags.split(',').map(t => t.trim()),
        isCompleted: false
      };
      store.dispatch(addTask(newTask));
    } else if (request.method === 'PUT') {
      const existingTask = tasks.find(t => t.id === parseInt(taskData.id));
      const updatedTask = {
        ...taskData,
        id: parseInt(taskData.id),
        createdAt: existingTask.createdAt,
        deadline: new Date(taskData.deadline),
        participants: taskData.participants.split(',').map(p => p.trim()),
        tags: taskData.tags.split(',').map(t => t.trim()),
        isCompleted: taskData.isCompleted === 'true'
      };
      store.dispatch(updateTask(updatedTask));
    }
    
    return null;
  };

  return createHashRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <TaskList filter="all" />,
          loader: createSearchLoader()
        },
        {
          path: '/active',
          children: [
            {
              path: '',
              element: <TaskList filter="active" />,
              loader: createSearchLoader()
            },
            {
              path: 'urgent',
              element: <TaskList filter="urgent" />,
              loader: createSearchLoader()
            },
            {
              path: 'overdue',
              element: <TaskList filter="overdue" />,
              loader: createSearchLoader()
            }
          ]
        },
        {
          path: '/completed',
          element: <TaskList filter="completed" />,
          loader: createSearchLoader()
        },
        {
          path: 'tasks',
          children: [
            {
              path: 'new',
              action: taskAction
            },
            {
              path: ':id/edit',
              action: taskAction
            }
          ]
        }
      ]
    }
  ]);
};

export default createRouter;
