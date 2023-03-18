import React, { useState, useEffect, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { ref, set, update } from "firebase/database";

type UserContextType = {
  logOut: any;
  user: any;
  createUser: any;
  logIn: any;
};
const defaultUser = { uid: "test" };

const UserContext = createContext<UserContextType>({} as UserContextType);
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({ ...defaultUser });
  const logOut = () => {
    return signOut(auth);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || defaultUser);

      if (currentUser) {
        const userRef = ref(db, `users/${currentUser.uid}`);
        set(userRef, {
          uid: currentUser.uid,
          isLoggedIn: true,
        });
      }
    });
    return () => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        update(userRef, {
          uid: user.uid,
          isLoggedIn: false,
        });
      }
      unsubscribe();
    };
  }, [auth, user]);
  return (
    <UserContext.Provider value={{ createUser, logIn, logOut, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
