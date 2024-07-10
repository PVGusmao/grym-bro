'use client';

import React from 'react';
import { createContext, useState } from 'react';

interface AuthContextInterface {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  savedUser: any;
  setSavedUser: React.Dispatch<React.SetStateAction<any>>
}

const AuthContext = createContext({} as AuthContextInterface);

export default function AuthContextProvider({children}: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);

  const [savedUser, setSavedUser] = useState({});

  return (
    <AuthContext.Provider value={
      {
        isAuth, setIsAuth,
        savedUser, setSavedUser,
      } as AuthContextInterface}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return React.useContext(AuthContext);
}