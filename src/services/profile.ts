import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { getAuthErrorMessage } from '../utils/auth/errorMessages';

interface ProfileUpdateData {
  nickname: string;
  currentPassword?: string;
  newPassword?: string;
}

export async function updateUserProfile(data: ProfileUpdateData) {
  const user = auth.currentUser;
  if (!user) throw new Error('يجب تسجيل الدخول أولاً');

  try {
    // Update display name
    if (data.nickname !== user.displayName) {
      await updateProfile(user, {
        displayName: data.nickname
      });

      await updateDoc(doc(db, 'users', user.uid), {
        nickname: data.nickname
      });
    }

    // Update password if provided
    if (data.currentPassword && data.newPassword) {
      const credential = EmailAuthProvider.credential(
        user.email!,
        data.currentPassword
      );
      
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);
    }
  } catch (error) {
    throw new Error(getAuthErrorMessage(error as any));
  }
}