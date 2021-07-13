export const getTimeFromDate = (date: Date) => {
  const time = date.toISOString();

  return time.substr(11, 8);
};
