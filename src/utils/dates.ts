export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  return new Intl.DateTimeFormat('ar-SA', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date().setHours(Number(hours), Number(minutes)));
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};