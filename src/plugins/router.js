import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import TaskList from '../components/tasks/TaskList';
import { searchFilter } from '../utils/filters';

const createSearchLoader = (tasks) => {
  return ({ request }) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('search') || '';
    console.log(searchQuery)
    return {
      searchQuery,
      filteredTasks: tasks.filter(searchFilter(searchQuery))
    };
  };
};

const createRouter = (addTask, updateTask, tasks) => {
  const taskAction = async ({ request }) => {
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
      addTask(newTask);
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
      updateTask(updatedTask);
    }
    
    return null;
  };

  const searchLoader = createSearchLoader(tasks);

  return createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <TaskList filter="all" />,
          loader: searchLoader
        },
        {
          path: '/active',
          children: [
            {
              path: '',
              element: <TaskList filter="active" />,
              loader: searchLoader
            },
            {
              path: 'urgent',
              element: <TaskList filter="urgent" />,
              loader: searchLoader
            },
            {
              path: 'overdue',
              element: <TaskList filter="overdue" />,
              loader: searchLoader
            }
          ]
        },
        {
          path: '/completed',
          element: <TaskList filter="completed" />,
          loader: searchLoader
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
