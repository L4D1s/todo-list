import React from "react";
import taskStyles from "./Task.module.css";
import Task from "./Task";

const TaskTable = ({ tasks, expandedTasks, toggleDetails, tableTitle }) => {
  return (
    <div>
      <h3 className={taskStyles.taskH3}>{tableTitle}</h3>
      <table className={taskStyles.taskTable}>
        <thead>
        <tr>
          <th>Описание</th>
          <th>Дата создания</th>
          <th>Дата завершения</th>
          <th>Участники</th>
          <th>Теги</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="6">Нет задач</td>
            </tr>
          ) : (
            tasks.map(task => (
              <Task
                key={task.id}
                task={task}
                isExpanded={expandedTasks.includes(task.id)}
                toggleDetails={toggleDetails}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
