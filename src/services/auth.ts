import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { RegistrationData, LoginData } from '../types/auth';

export async function registerUser(data: RegistrationData) {
  try {
    // Create auth user with email (username@domain.com)
    const email = `${data.username}@example.com`;
    const userCredential = await createUserWithEmailAndPassword(auth, email, data.password);

    // Create user document in Firestore
    const userDoc = doc(db, 'users', userCredential.user.uid);
    await setDoc(userDoc, {
      username: data.username,
      nickname: data.nickname,
      phone: data.phone,
      phoneVerified: false,
      createdAt: new Date(),
      isActive: true,
      lastLogin: new Date()
    });

    return userCredential.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('حدث خطأ أثناء إنشاء الحساب');
  }
}

export async function loginUser({ username, password }: LoginData) {
  try {
    const email = `${username}@example.com`;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login
    const userDoc = doc(db, 'users', userCredential.user.uid);
    await setDoc(userDoc, {
      lastLogin: new Date()
    }, { merge: true });

    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
  }
}