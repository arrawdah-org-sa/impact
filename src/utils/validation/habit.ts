export const validateHabitName = (name: string): boolean => {
  if (!name) return false;
  
  // Validate Arabic text between 3-50 characters
  const arabicPattern = /^[\u0600-\u06FF\s]{3,50}$/;
  return arabicPattern.test(name.trim());
};