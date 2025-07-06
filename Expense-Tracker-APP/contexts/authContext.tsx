import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '@/config/firebase'; // your web SDK instances
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { AuthContextType, userType } from '@/types/type';
import { useRouter } from 'expo-router';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<userType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserData = async (uid: string) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUser({
          uid: data.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
        });
      } else {
        const currentUser = auth.currentUser;
        setUser({
          uid,
          email: currentUser?.email || null,
          name: currentUser?.displayName || null,
          image: null,
        });
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await fetchUserData(firebaseUser.uid);
        router.replace('/(tabs)');
      } else {
        setUser(null);
        setLoading(false);
        router.replace('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', response.user.uid), {
        uid: response.user.uid,
        email,
        name,
      });
      await updateProfile(response.user, { displayName: name });
      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = async (uid: string) => {
    setLoading(true);
    try {
      await fetchUserData(uid);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    logout,
    updateUserData,
    loading,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
