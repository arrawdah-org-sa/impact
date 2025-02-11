export const validateNote = (note: string): string => {
  if (!note) {
    return 'المحتوى مطلوب';
  }
  
  const trimmedNote = note.trim();
  
  if (trimmedNote.length < 10) {
    return 'يجب أن يكون المحتوى 10 أحرف على الأقل';
  }
  
  if (trimmedNote.length > 500) {
    return 'يجب أن لا يتجاوز المحتوى 500 حرف';
  }

  // Validate that the note contains actual text content
  if (!/[\u0600-\u06FF\w]/.test(trimmedNote)) {
    return 'يجب أن يحتوي المحتوى على نص صحيح';
  }

  return '';
};