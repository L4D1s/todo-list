import { useState } from "react";
import Container from "../Container";
import TaskControls from "./TaskControls";
import TaskTable from "./TaskTable";
import TaskBadgeLegend from "./TaskBadgeLegend";
import useFilterSort from "../../hooks/useFilterSort";
import { tagFilter, statusFilter } from "../../utils/filters";
import {
  sortByCreatedDateAsc,
  sortByDeadlineAsc,
  sortByParticipantsCount
} from "../../utils/sorters";
import TaskModal from "./TaskModal";
import { useTasks } from '../../context/TaskContext'
import taskStyles from './Task.module.css'


const TaskList = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [status, setStatus] = useState('active');
  const [sortOption, setSortOption] = useState('');
  const [expandedTasks, setExpandedTasks] = useState([]);
  const { tasks, addTask} = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filteredSortedTasks = useFilterSort({
    data: tasks,
    filters: [statusFilter(status), tagFilter(selectedTags)],
    sortFn: sortMap[sortOption] || null,
  });

  const toggleDetails = (id) => {
    setExpandedTasks(prev =>
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    );
  };

  const getTableTitle = () => {
    switch (status) {
      case "active":
        return "Активные задачи";
      case "completed":
        return "Завершенные задачи";
      default:
        return "Все задачи";
    }
  };

  return (
    <div>
      <Container>
        <TaskControls
          allTags={allTags}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
          status={status}
          onStatusChange={setStatus}
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
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button onClick={() => setIsModalOpen(true)} className={taskStyles.createButton}>Создать новую задачу</button>
        </div>
      </Container>

      <div style={{marginTop: "50px"}}>
        <Container>
          <TaskBadgeLegend/>
        </Container>
      </div>

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSave={addTask}
        />
      )}
    </div>
  );
};

export default TaskList;
