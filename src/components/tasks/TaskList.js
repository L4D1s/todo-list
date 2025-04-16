import { useState } from "react";
import Container from "../Container";
import TaskControls from "./TaskControls";
import TaskTable from "./TaskTable";
import TaskBadgeLegend from "./TaskBadgeLegend";
import useFilterSort from "../../hooks/useFilterSort";
import { tagFilter, statusFilter, overdueFilter, urgentFilter, searchFilter } from "../../utils/filters";
import {
  sortByCreatedDateAsc,
  sortByDeadlineAsc,
  sortByParticipantsCount
} from "../../utils/sorters";
import taskStyles from './Task.module.css';
import { useLocation, useNavigate, useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TaskList = ({ filter }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [expandedTasks, setExpandedTasks] = useState([]);
  const { searchQuery } = useLoaderData();
  const tasks = useSelector(state => state.tasks.tasks);
  const location = useLocation();
  const navigate = useNavigate();

  const allTags = [...new Set(tasks.flatMap(task => task.tags))];

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const sortMap = {
    deadline: sortByDeadlineAsc,
    createdAt: sortByCreatedDateAsc,
    participants: sortByParticipantsCount,
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    navigate(`?search=${query}`);
  };

  const getFilters = () => {
    const filters = [tagFilter(selectedTags), searchFilter(searchQuery)];
    
    if (filter === 'overdue') {
      filters.push(overdueFilter);
    } else if (filter === 'urgent') {
      filters.push(urgentFilter);
    } else if (filter === 'active') {
      filters.push(statusFilter('active'));
    } else if (filter === 'completed') {
      filters.push(statusFilter('completed'));
    }

    return filters;
  };

  const filteredSortedTasks = useFilterSort({
    data: tasks,
    filters: getFilters(),
    sortFn: sortMap[sortOption] || null,
  });

  const toggleDetails = (id) => {
    setExpandedTasks(prev =>
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    );
  };

  const getTableTitle = () => {
    if (filter === 'overdue') return "Просроченные задачи";
    if (filter === 'urgent') return "Срочные задачи (менее 3 дней)";
    if (filter === 'active') return "Активные задачи";
    if (filter === 'completed') return "Завершенные задачи";
    return "Все задачи";
  };

  return (
    <div>
      <Container>
        <div className={taskStyles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск по названию задачи..."
            value={searchQuery}
            onChange={handleSearch}
            className={taskStyles.searchInput}
          />
        </div>
        <TaskControls
          allTags={allTags}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </Container>

      <Container>
        <TaskTable
          tasks={filteredSortedTasks}
          expandedTasks={expandedTasks}
          toggleDetails={toggleDetails}
          tableTitle={getTableTitle()}
        />
      </Container>

      <div style={{marginTop: "50px"}}>
        <Container>
          <TaskBadgeLegend/>
        </Container>
      </div>
    </div>
  );
};

export default TaskList;
