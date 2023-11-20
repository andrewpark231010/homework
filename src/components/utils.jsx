// utils.js
export const formatDateString = (dateString) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Seoul",
  };
  return new Date(dateString).toLocaleString("en-US", options);
};
