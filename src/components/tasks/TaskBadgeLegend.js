import taskStyles from './Task.module.css';

const TaskBadgeLegend = () => (
  <div>
    <h3 className={taskStyles.taskH3}>Цветовая маркировка задач</h3>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
      <span className={taskStyles.taskBadge} style={{
        backgroundColor: '#d4edda', borderColor: '#bcd0c7', marginRight: '50px'
      }}>Срок до завершения более 3 дней</span>

      <span className={taskStyles.taskBadge} style={{
        backgroundColor: '#fff3cd', borderColor: '#e6dbb9', marginRight: '50px'
      }}>Срок до завершения менее 3 дней</span>

      <span className={taskStyles.taskBadge} style={{
        backgroundColor: '#f8d7da', borderColor: '#dfc2c4', marginRight: '50px'
      }}>Истек срок завершения задачи</span>

      <span className={taskStyles.taskBadge} style={{
        backgroundColor: '#e2e3e5', borderColor: '#d6d8d9'
      }}>Задача закрыта</span>
    </div>
  </div>
);

export default TaskBadgeLegend;
