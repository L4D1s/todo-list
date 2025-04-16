import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "../Icons";
import styles from "./TaskControls.module.css";

const TaskControls = ({
  allTags,
  selectedTags,
  onTagToggle,
  status,
  onStatusChange,
  sortOption,
  onSortChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(prev => !prev);

  return (
    <div className={styles.controlsContainer}>
      <div onClick={toggleExpand} className={styles.controlsHeader}>
        <h3 className={styles.controlsTitle}>Фильтрация и сортировка</h3>
        {isExpanded ? (
          <ChevronUpIcon className={styles.toggleIcon} />
        ) : (
          <ChevronDownIcon className={styles.toggleIcon} />
        )}
      </div>

      {isExpanded && (
        <div className={styles.controlsBody}>
          <div className={styles.controlSection}>
            <label className={styles.label}>Сортировать по:</label>
            <select value={sortOption} onChange={e => onSortChange(e.target.value)} className={styles.select}>
              <option value="">Без сортировки</option>
              <option value="deadline">Срок завершения</option>
              <option value="createdAt">Дата создания</option>
              <option value="participants">Кол-во участников</option>
            </select>
          </div>

          <div className={styles.controlSection}>
            <label className={styles.label}>Метки:</label>
            <div className={styles.tagsContainer}>
              {allTags.map((tag, idx) => (
                <label key={idx} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => onTagToggle(tag)}
                    className={styles.checkbox}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskControls;
