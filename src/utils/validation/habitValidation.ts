// Habit-specific validation rules
export const validateHabitName = (name: string): boolean => {
  const arabicPattern = /^[\u0600-\u06FF\s]{3,50}$/;
  return name.length >= 3 && name.length <= 50 && arabicPattern.test(name);
};