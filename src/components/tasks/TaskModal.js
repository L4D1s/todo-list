import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import { useFetcher } from 'react-router-dom';

//todo add input data validation
const Modal = ({ task = null, onClose }) => {
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

  const fetcher = useFetcher();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.entries(editedTask).forEach(([key, value]) => {
      if (key === 'participants') {
        formData.append(key, value);
      } else if (key === 'tags') {
        formData.append(key, value.join(', '));
      } else {
        formData.append(key, value);
      }
    });

    if (task) {
      formData.append('id', task.id);
      fetcher.submit(formData, { method: 'put', action: `/tasks/${task.id}/edit` });
    } else {
      fetcher.submit(formData, { method: 'post', action: '/tasks/new' });
    }
    
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{task ? 'Редактирование задачи' : 'Создание новой задачи'}</h2>
        <fetcher.Form onSubmit={handleSubmit}>
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
            <button type="submit" disabled={fetcher.state === 'submitting'}>
              {fetcher.state === 'submitting' ? 'Сохранение...' : (task ? 'Сохранить' : 'Создать')}
            </button>
            <button type="button" onClick={onClose}>Закрыть</button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
};

export default Modal;
