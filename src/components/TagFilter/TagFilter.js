import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "../Icons";
import tagStyles from './TagFilter.module.css';


const TagFilter = ({ tags, selectedTags, onTagSelect, isExpanded, toggleExpand }) => {
  return (
    <div className={tagStyles.filterContainer}>
      <div onClick={toggleExpand} className={tagStyles.filterHeader}>
        <h3 className={tagStyles.filterTitle}>Фильтрация по меткам</h3>
        {isExpanded ? (
          <ChevronUpIcon className={tagStyles.toggleIcon} />
        ) : (
          <ChevronDownIcon className={tagStyles.toggleIcon} />
        )}
      </div>
      {isExpanded && (
        <div className={tagStyles.tagFilterContainer}>
          <div className={tagStyles.tagsContainer}>
            {tags.map((tag, index) => (
              <label key={index} className={tagStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={(e) => onTagSelect(e.target.value)}
                  className={tagStyles.checkbox}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
