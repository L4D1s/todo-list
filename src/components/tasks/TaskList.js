import React from "react";
import taskStyles from './TaskList.module.css';
import Container from "../Container";

const Task = ({ task }) => {
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
    <tr>
      <td>{task.description}</td>
      <td>{task.createdAt.toLocaleString()}</td>
      <td style={rowStyle}>{task.deadline.toLocaleString()}</td>
      <td>{task.participants.join(", ")}</td>
      <td>{task.tags.join(", ")}</td>
      <td>{task.isCompleted ? "Завершено" : "Не завершено"}</td>
    </tr>
  );
};

const TaskList = ({ tasks }) => {
  const sortedTasks = tasks
    .filter(task => !task.isCompleted)
    .sort((a, b) => a.deadline - b.deadline);

  return (
      <div>
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
                          <Task key={task.id} task={task}/>
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
