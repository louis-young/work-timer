export const getFormattedTime = (seconds: number) => {
  const milliseconds = seconds * 1000;

  const date = new Date(milliseconds);

  const time = date.toISOString();

  const formattedTime = time.substr(11, 8);

  return formattedTime;
};
