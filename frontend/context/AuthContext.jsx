import { createContext, useEffect } from "react";
import React, { useState } from "react";

export const AuthContext = createContext(); // Giá trị mặc định là undefined (hoặc bạn có thể truyền vào)


export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(()=>{
    const storedIsLogged = sessionStorage.getItem('isLogged')
    if(storedIsLogged){
      setIsLogged(storedIsLogged)
    }
  },[])

  useEffect(()=>{
    sessionStorage.setItem('isLogged', isLogged)
  },[isLogged])

  return (
    <AuthContext.Provider value={{ISLOGGED: {isLogged, setIsLogged}}}>
      {children}
    </AuthContext.Provider>
  );
};
