import { createContext, useEffect } from "react";
import React, { useState } from "react";

export const AuthContext = createContext(); // Giá trị mặc định là undefined (hoặc bạn có thể truyền vào)


export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(()=>{
    const storedRole = sessionStorage.getItem('role')
    if(storedRole){
      setRole(storedRole)
    }
    const storedIsLogged = sessionStorage.getItem('isLogged')
    if(storedIsLogged){
      setIsLogged(storedIsLogged)
    }
  },[])

  useEffect(()=>{
    sessionStorage.setItem('role', role)
    sessionStorage.setItem('isLogged', isLogged)
  },[role])

  return (
    <AuthContext.Provider value={{ ROLE: {role, setRole}, ISLOGGED: {isLogged, setIsLogged}}}>
      {children}
    </AuthContext.Provider>
  );
};
