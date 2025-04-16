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

export const searchFilter = (query) => (task) => {
  if (!query) return true;
  return task.description.toLowerCase().includes(query.toLowerCase());
};

export const overdueFilter = (task) => {
  if (task.isCompleted) return false;
  return new Date(task.deadline) < new Date();
};

export const urgentFilter = (task) => {
  if (task.isCompleted) return false;
  const timeDiff = new Date(task.deadline) - new Date();
  const diffDays = timeDiff / (1000 * 3600 * 24);
  return diffDays < 3 && diffDays >= 0;
};
