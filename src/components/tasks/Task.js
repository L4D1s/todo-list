import React, { useState } from "react";
import TaskModal from "./TaskModal";
import styles from './Task.module.css'
import { useTasks } from '../../context/TaskContext';

const Task = ({ task, isExpanded, toggleDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateTask, completeTask } = useTasks();

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

  if (task.isCompleted) {
    rowStyle = {
      backgroundColor: '#e2e3e5'
    };
  }

  const handleSave = (updatedTask) => {
    updateTask(updatedTask);
    setIsEditing(false);
  };

  const handleCloseTask = () => {
    completeTask(task.id);
  };

  return (
    <>
      <tr>
        <td onClick={() => toggleDetails(task.id)} style={{ cursor: "pointer" }}>{task.description}</td>
        <td onClick={() => toggleDetails(task.id)} style={{ cursor: "pointer" }}>{task.createdAt.toLocaleString()}</td>
        <td onClick={() => toggleDetails(task.id)} style={{...rowStyle, cursor: "pointer" }}>{task.deadline.toLocaleString()}</td>
        <td onClick={() => toggleDetails(task.id)} style={{ cursor: "pointer" }}>{task.participants.join(", ")}</td>
        <td onClick={() => toggleDetails(task.id)} style={{ cursor: "pointer" }}>{task.tags.join(", ")}</td>
        <td onClick={() => toggleDetails(task.id)} style={{ cursor: "pointer" }}>{task.isCompleted ? "Завершено" : "Не завершено"}</td>
        <td>
          <button className={styles.editButton} style={{marginRight: '10px'}} onClick={() => setIsEditing(true)}>Редактировать</button>
          {!task.isCompleted && (
            <button className={styles.completeButton} onClick={handleCloseTask}>Завершить</button>
          )}
        </td>
      </tr>

      {isEditing && (
        <TaskModal
          task={task}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}

      {isExpanded && (
        <tr>
          <td colSpan="7" style={{ backgroundColor: "#f9f9f9", padding: "10px" }}>
            <strong>Доп. информация:</strong> {task.extraData || "Нет дополнительной информации"}
          </td>
        </tr>
      )}
    </>
  );
};

export default Task;
