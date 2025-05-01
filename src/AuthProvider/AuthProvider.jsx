import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext } from 'react';
import app from '../firebase/firebase.config';
import { useEffect } from 'react';




export const AuthContext = createContext();
const auth = getAuth(app)
const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading ,setLoading] = useState(true);


  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  const signInWithGoogle = () => {
      return signInWithPopup(auth , provider)
  }

  const logOut = () => {
    return signOut(auth)
  }

  const profileUpdate = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo)
  }
  const emailVerification = () => {
    return sendEmailVerification(auth.currentUser)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('current User' , currentUser)
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const authInfo = {
    user,
    createUser,
    signInWithGoogle,
    signIn,
    logOut,
    profileUpdate,
    emailVerification,
    loading
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;