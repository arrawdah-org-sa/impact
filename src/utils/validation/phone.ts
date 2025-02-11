export const validatePhone = (phone: string): string => {
  if (!phone) {
    return 'رقم الجوال مطلوب';
  }
  
  const trimmedPhone = phone.trim();
  
  if (!trimmedPhone.startsWith('+966')) {
    return 'يجب أن يبدأ الرقم بـ +966';
  }
  
  if (!/^\+966[0-9]{9}$/.test(trimmedPhone)) {
    return 'الرجاء إدخال رقم جوال سعودي صحيح';
  }
  
  return '';
};