import { createContext, useEffect } from "react";
import React, { useState } from "react";

export const AuthContext = createContext(); // Giá trị mặc định là undefined (hoặc bạn có thể truyền vào)


export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("");

  useEffect(()=>{
    const storedRole = localStorage.getItem('role')
    if(storedRole){
      setRole(storedRole)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('role', role)
  },[role])

  return (
    <AuthContext.Provider value={{ ROLE: {role, setRole}}}>
      {children}
    </AuthContext.Provider>
  );
};
