import React, { useState } from "react";
import taskStyles from './TaskList.module.css';
import Container from "../Container";
import TagFilter from "../TagFilter/TagFilter";

const Task = ({ task, isExpanded, toggleDetails }) => {
  const currentDate = new Date();
  const timeDiff = task.deadline - currentDate;
  const diffDays = timeDiff / (1000 * 3600 * 24);

  let rowStyle = {
    backgroundColor: '#d4edda'
  };

  if (diffDays < 0) {
    rowStyle = {
      backgroundColor: '#f8d7da',
    };
  } else if (diffDays < 3) {
    rowStyle = {
      backgroundColor: '#fff3cd'
    };
  }

  return (
    <>
      <tr onClick={() => toggleDetails(task.id)} style={{ cursor: "pointer" }}>
        <td>{task.description}</td>
        <td>{task.createdAt.toLocaleString()}</td>
        <td style={rowStyle}>{task.deadline.toLocaleString()}</td>
        <td>{task.participants.join(", ")}</td>
        <td>{task.tags.join(", ")}</td>
        <td>{task.isCompleted ? "Завершено" : "Не завершено"}</td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="6" style={{ backgroundColor: "#f9f9f9", padding: "10px" }}>
            <strong>Доп. информация:</strong> {task.extraData || "Нет дополнительной информации"}
          </td>
        </tr>
      )}
    </>
  );
};

const TaskList = ({ tasks }) => {
    const [expandedTasks, setExpandedTasks] = useState([]);
    const [selectedTags, setSelectedTags] = useState("");
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    const filteredTasks = selectedTags.length > 0
        ? tasks.filter(task => selectedTags.every(tag => task.tags.includes(tag)))
        : tasks;

    const getAllTags = () => {
        const allTags = tasks.reduce((acc, task) => {
          task.tags.forEach(tag => {
            if (!acc.includes(tag)) acc.push(tag);
          });
          return acc;
        }, []);
        return allTags;
      };

    const handleTagSelect = (selectedTag) => {
        setSelectedTags((prevSelectedTags) => {
          if (prevSelectedTags.includes(selectedTag)) {
            return prevSelectedTags.filter(tag => tag !== selectedTag);
          } else {
            return [...prevSelectedTags, selectedTag];
          }
        });
      };

    const sortedTasks = filteredTasks
        .filter(task => !task.isCompleted)
        .sort((a, b) => a.deadline - b.deadline);

    const allTags = getAllTags()

    const toggleDetails = (id) => {
        setExpandedTasks((prev) =>
          prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
        );
      };

    const toggleExpandFilter = () => {
        setIsFilterExpanded(prev => !prev);
    };

    return (
        <div>
            <Container>
                <TagFilter
                  tags={allTags}
                  selectedTags={selectedTags}
                  onTagSelect={handleTagSelect}
                  isExpanded={isFilterExpanded}
                  toggleExpand={toggleExpandFilter}
                />
            </Container>
          <Container>
            <h3 className={taskStyles.taskH3}>Активные задачи</h3>
            <table className={taskStyles.taskTable}>
              <thead>
                <tr>
                  <th>Описание</th>
                  <th>Дата создания</th>
                  <th>Дата завершения</th>
                  <th>Участники</th>
                  <th>Теги</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.length === 0 ? (
                  <tr>
                    <td colSpan="6">Нет активных задач</td>
                  </tr>
                ) : (
                  sortedTasks.map(task => (
                    <Task key={task.id}
                          task={task}
                          isExpanded={expandedTasks.includes(task.id)}
                          toggleDetails={toggleDetails}
                    />
                  ))
                )}
              </tbody>
            </table>
          </Container>
          <div style={{marginTop: '50px'}}>
          <Container>
              <div>
                  <h3 className={taskStyles.taskH3}>Цветовая маркировка задач</h3>
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                      <span className={taskStyles.taskBadge} style={{
                          backgroundColor: '#d4edda', borderColor: '#bcd0c7', marginRight: '50px'
                      }}>Срок до завершения более 3 дней</span>

                      <span className={taskStyles.taskBadge}
                            style={{
                                backgroundColor: '#fff3cd',
                                borderColor: '#e6dbb9',
                                marginRight: '50px'
                      }}>
                          Срок до завершения менее 3 дней
                      </span>

                      <span className={taskStyles.taskBadge} style={{
                          backgroundColor: '#f8d7da', borderColor: '#dfc2c4', marginRight: '50px'
                      }}>Истек срок завершения задачи</span>
                      <span
                          className={taskStyles.taskBadge} style={{
                              backgroundColor: '#e2e3e5', borderColor: '#d6d8d9'
                          }}>Задача закрыта</span>
                  </div>
              </div>
          </Container>
          </div>
      </div>
  );
};

export default TaskList;
