import headerStyles from './header.module.css';
import {BaselineCheck, ChevronDownIcon} from "../Icons";
import { Link, useLocation } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import { useState } from 'react';
import TaskModal from '../tasks/TaskModal';
import { overdueFilter, urgentFilter } from '../../utils/filters';

const Menu = () => {
  const { tasks } = useTasks();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const activeTasks = tasks.filter(task => !task.isCompleted);
  const overdueTasks = tasks.filter(overdueFilter);
  const urgentTasks = tasks.filter(urgentFilter);

  const getActiveClass = (path) => {
    return location.pathname === path ? headerStyles.button + ' ' + headerStyles.active : headerStyles.button;
  };

  const isActivePath = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
      <nav className={headerStyles.nav}>
          <Link to="/" className={getActiveClass('/')}>
            Все задачи ({tasks.length})
          </Link>
          <div className={headerStyles.dropdown}>
            <button 
              className={`${headerStyles.button} ${isActivePath('/active') ? headerStyles.active : ''}`}
            >
              Активные задачи ({activeTasks.length})
              <ChevronDownIcon className={headerStyles.arrow} />
            </button>
            <div className={headerStyles.dropdownContent}>
              <Link 
                to="/active" 
                className={getActiveClass('/active')}
              >
                Все задачи ({activeTasks.length})
              </Link>
              <Link 
                to="/active/urgent" 
                className={getActiveClass('/active/urgent')}
              >
                Срочные ({urgentTasks.length})
              </Link>
              <Link 
                to="/active/overdue" 
                className={getActiveClass('/active/overdue')}
              >
                Просроченные ({overdueTasks.length})
              </Link>
            </div>
          </div>
          <Link to="/completed" className={getActiveClass('/completed')}>
            Завершенные задачи
          </Link>
          <button 
            className={headerStyles.button}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить задачу
          </button>
          {isModalOpen && (
            <TaskModal
              onClose={() => setIsModalOpen(false)}
            />
          )}
      </nav>
  );
};

const Header = () => {
    return (
        <header className={headerStyles.header}>
          <BaselineCheck width="32" height="32" style={{color: 'white'}}/>
          <h1 className={headerStyles.title}>To Do</h1>
          <div className={headerStyles.separator}></div>
          <Menu/>
      </header>
  );
};

export {Header};