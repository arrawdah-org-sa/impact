export const validateName = (name: string): string => {
  if (!name) return 'هذا الحقل مطلوب';
  if (!/^[\u0600-\u06FF\s]{2,30}$/.test(name)) {
    return 'الرجاء إدخال اسم صحيح باللغة العربية';
  }
  return '';
};

export const validatePhone = (phone: string): string => {
  if (!phone) return 'رقم الجوال مطلوب';
  if (!/^\+966[0-9]{9}$/.test(phone)) {
    return 'الرجاء إدخال رقم جوال سعودي صحيح';
  }
  return '';
};

export const validateUsername = (username: string): string => {
  if (!username) return 'معرف المستخدم مطلوب';
  if (!/^[a-zA-Z0-9]{4,12}$/.test(username)) {
    return 'معرف المستخدم يجب أن يتكون من 4-12 حرف أو رقم';
  }
  return '';
};