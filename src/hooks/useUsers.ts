import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface User {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const updateUser = async (userId: string, data: Partial<User>) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  return { users, updateUser, deleteUser };
}