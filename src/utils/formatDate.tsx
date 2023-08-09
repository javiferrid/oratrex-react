export const formatMonth = (date: Date): string => {
  const monthNames = [
    "En",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sept",
    "Oct",
    "Nov",
    "Dic",
  ];
  return monthNames[date.getMonth()];
};

export const formatHoursAndMinute = (date: Date): string => {
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
