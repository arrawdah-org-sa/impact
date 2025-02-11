import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { UserProfile } from '../types/auth';

interface AuthUser extends User {
  profile?: UserProfile;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Get initial user data
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        
        // Set initial user state
        setUser({
          ...firebaseUser,
          profile: userData as UserProfile,
          isAdmin: userData?.isAdmin || false
        });

        // Subscribe to user document changes
        const unsubscribeUser = onSnapshot(
          doc(db, 'users', firebaseUser.uid),
          (doc) => {
            if (doc.exists()) {
              setUser(currentUser => ({
                ...currentUser!,
                profile: doc.data() as UserProfile,
                isAdmin: doc.data()?.isAdmin || false
              }));
            }
          }
        );

        return () => unsubscribeUser();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);