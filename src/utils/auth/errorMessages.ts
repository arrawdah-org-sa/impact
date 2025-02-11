import { AuthError } from 'firebase/auth';

export const getAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'اسم المستخدم مستخدم بالفعل';
    case 'auth/invalid-email':
      return 'اسم المستخدم غير صالح';
    case 'auth/operation-not-allowed':
      return 'عذراً، التسجيل غير متاح حالياً';
    case 'auth/weak-password':
      return 'كلمة المرور ضعيفة جداً. يجب أن تكون 6 أحرف على الأقل';
    case 'auth/configuration-not-found':
      return 'عذراً، هناك مشكلة في الاتصال. حاول مرة أخرى';
    default:
      return 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى';
  }
};