export const tagFilter = (selectedTags) => (task) => {
  if (!selectedTags.length) return true;
  return selectedTags.every(tag => task.tags.includes(tag));
};

export const statusFilter = (status) => (task) => {
  if (status === "all") return true;
  if (status === "active") return !task.isCompleted;
  if (status === "completed") return task.isCompleted;
  return true;
};
