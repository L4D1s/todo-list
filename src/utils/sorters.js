export const sortByDeadlineAsc = (a, b) => a.deadline - b.deadline;

export const sortByCreatedDateAsc = (a, b) => a.createdAt - b.createdAt;

export const sortByParticipantsCount = (a, b) =>
  a.participants.length - b.participants.length;
