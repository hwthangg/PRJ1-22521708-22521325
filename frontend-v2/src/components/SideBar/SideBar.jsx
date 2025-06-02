import React, { useEffect, useState } from "react";
import NavSection from "./NavSection/NavSection";

import styles from "./SideBar.module.css";
import LogoSection from "./LogoSection/LogoSection";
import UserSection from "./UserSection/UserSection";

function SideBar() {
  const [user, setUser] = useState({})
   useEffect(()=>{
const fetchRole = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log(data.data);

        setUser(data.data)
        
      } catch (error) {

        toast.error('Có lỗi xảy ra')
      }
    };
  fetchRole()
  },[])
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <LogoSection />
        </div>
        <div style={{border:'1px solid #ccc', width:'60%'}}/>
        <div className={styles.navContainer}>
          <NavSection user = {user}/>
        </div>
        <div className={styles.profileContainer}>
          <UserSection user = {user} />
        </div>
      </div>
    </>
  );
}

export default SideBar;
