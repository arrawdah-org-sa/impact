export const validateUsername = (username: string): string => {
  if (!username) {
    return 'معرف المستخدم مطلوب';
  }
  
  const trimmedUsername = username.trim();
  
  if (trimmedUsername.length < 4) {
    return 'يجب أن يكون المعرف 4 أحرف على الأقل';
  }
  
  if (trimmedUsername.length > 12) {
    return 'يجب أن لا يتجاوز المعرف 12 حرفاً';
  }
  
  if (!/^[a-zA-Z0-9]+$/.test(trimmedUsername)) {
    return 'يجب أن يحتوي المعرف على أحرف إنجليزية وأرقام فقط';
  }
  
  return '';
};