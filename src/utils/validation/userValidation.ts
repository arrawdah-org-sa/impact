// User-related validation rules
export const validateUsername = (username: string): string => {
  if (!username) return 'اسم المستخدم مطلوب';
  if (username.length < 3) return 'يجب أن يكون اسم المستخدم 3 أحرف على الأقل';
  if (username.length > 20) return 'يجب أن لا يتجاوز اسم المستخدم 20 حرفاً';
  return '';
};

export const validatePhone = (phone: string): string => {
  if (!phone) return 'رقم الجوال مطلوب';
  if (!phone.startsWith('05')) return 'يجب أن يبدأ رقم الجوال بـ 05';
  if (phone.length !== 10) return 'يجب أن يتكون رقم الجوال من 10 أرقام';
  if (!/^\d+$/.test(phone)) return 'يجب أن يحتوي رقم الجوال على أرقام فقط';
  return '';
};

export const validateIdentifier = (identifier: string): string => {
  if (!identifier) return 'المعرف الخاص مطلوب';
  if (identifier.length < 8) return 'يجب أن يكون المعرف 8 أحرف على الأقل';
  if (identifier.length > 15) return 'يجب أن لا يتجاوز المعرف 15 حرفاً';
  if (!/^[a-zA-Z0-9]+$/.test(identifier)) return 'يجب أن يحتوي المعرف على أحرف وأرقام فقط';
  return '';
};