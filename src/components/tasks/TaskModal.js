import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';

//todo add input data validation
const Modal = ({ task = null, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState({
    description: '',
    deadline: new Date().toISOString().slice(0, 16),
    participants: '',
    tags: [],
    extraData: '',
    isCompleted: false,
    createdAt: new Date(),
    ...task,
  });

  useEffect(() => {
    if (task) {
      setEditedTask({
        ...task,
        deadline: task.deadline.toISOString().slice(0, 16),
        participants: task.participants.join(', '),
        tags: Array.isArray(task.tags) ? task.tags : [],
      });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedTask = {
      ...editedTask,
      participants: editedTask.participants.split(',').map((p) => p.trim()),
      deadline: new Date(editedTask.deadline),
      tags: Array.isArray(editedTask.tags) ? editedTask.tags : editedTask.tags.split(',').map((t) => t.trim()),
    };
    onSave(updatedTask);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{task ? 'Редактирование задачи' : 'Создание новой задачи'}</h2>
        <div className={styles.formGroup}>
          <label>Описание</label>
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Срок выполнения</label>
          <input
            type="datetime-local"
            name="deadline"
            value={editedTask.deadline}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Участники</label>
          <input
            type="text"
            name="participants"
            value={editedTask.participants}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Теги</label>
          <input
            type="text"
            name="tags"
            value={editedTask.tags.join(', ')}
            onChange={(e) => {
              const newTags = e.target.value.split(',').map(tag => tag.trim());
              setEditedTask(prev => ({
                ...prev,
                tags: newTags,
              }));
            }}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Доп. информация</label>
          <textarea
            name="extraData"
            value={editedTask.extraData || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSave}>{task ? 'Сохранить' : 'Создать'}</button>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
