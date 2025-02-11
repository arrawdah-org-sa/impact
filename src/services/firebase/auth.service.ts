import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  AuthError 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import type { RegistrationData, LoginData } from '../../types/auth';

const handleAuthError = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/configuration-not-found':
      return 'خطأ في إعدادات المصادقة. الرجاء المحاولة لاحقاً';
    case 'auth/email-already-in-use':
      return 'هذا البريد الإلكتروني مستخدم بالفعل';
    case 'auth/invalid-email':
      return 'البريد الإلكتروني غير صالح';
    case 'auth/operation-not-allowed':
      return 'تسجيل المستخدمين غير مفعل حالياً';
    case 'auth/weak-password':
      return 'كلمة المرور ضعيفة جداً';
    default:
      console.error('Unhandled auth error:', error);
      return 'حدث خطأ أثناء التسجيل. الرجاء المحاولة مرة أخرى';
  }
};

export async function loginUser({ username, password }: LoginData) {
  try {
    const email = `${username}@example.com`;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const errorMessage = handleAuthError(error as AuthError);
    throw new Error(errorMessage);
  }
}

export async function registerUser(data: RegistrationData, password: string) {
  try {
    const email = `${data.username}@example.com`;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredential.user, {
      displayName: `${data.firstName} ${data.lastName}`
    });

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      username: data.username,
      createdAt: new Date(),
      isActive: true
    });

    return userCredential.user;
  } catch (error) {
    const errorMessage = handleAuthError(error as AuthError);
    throw new Error(errorMessage);
  }
}