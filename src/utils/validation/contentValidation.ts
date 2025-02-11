// Content validation rules
export const validateNote = (note: string): string => {
  if (!note) return 'المحتوى مطلوب';
  if (note.length < 10) return 'يجب أن يكون المحتوى 10 أحرف على الأقل';
  if (note.length > 500) return 'يجب أن لا يتجاوز المحتوى 500 حرف';
  return '';
};