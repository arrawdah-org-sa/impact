export const validateName = (name: string): string => {
  if (!name) {
    return 'هذا الحقل مطلوب';
  }
  
  const trimmedName = name.trim();
  
  if (trimmedName.length < 2) {
    return 'يجب أن يكون الاسم حرفين على الأقل';
  }
  
  if (trimmedName.length > 30) {
    return 'يجب أن لا يتجاوز الاسم 30 حرفاً';
  }
  
  if (!/^[\u0600-\u06FF\s]+$/.test(trimmedName)) {
    return 'الرجاء إدخال اسم صحيح باللغة العربية';
  }
  
  return '';
};