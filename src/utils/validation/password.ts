export const validatePassword = (password: string): string => {
  if (!password) {
    return 'كلمة المرور مطلوبة';
  }
  
  if (password.length < 8) {
    return 'يجب أن تكون كلمة المرور 8 أحرف على الأقل';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل';
  }
  
  if (!/[0-9]/.test(password)) {
    return 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل';
  }
  
  return '';
};