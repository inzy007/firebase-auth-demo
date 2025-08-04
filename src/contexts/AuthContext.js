import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, microsoftProvider, githubProvider, yahooProvider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in with Google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Sign in with Microsoft
  const loginWithMicrosoft = () => {
    return signInWithPopup(auth, microsoftProvider);
  };

  // Sign in with GitHub
  const loginWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  // Sign in with Yahoo
  const loginWithYahoo = () => {
    return signInWithPopup(auth, yahooProvider);
  };

  // Sign out
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginWithGoogle,
    loginWithMicrosoft,
    loginWithGithub,
    loginWithYahoo,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
