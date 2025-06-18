import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./SideBar.module.css";
import LogoSection from "./LogoSection/LogoSection";
import NavSection from "./NavSection/NavSection";
import UserSection from "./UserSection/UserSection";
import { connectSocket, disconnectSocket, getSocket } from "../../../utils/socket";

function SideBar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/auth`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setUser(data.data);
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra khi lấy hồ sơ");
      }
    };

    fetchProfile();

    connectSocket();
    const socket = getSocket();
    socket.emit("access", localStorage.getItem("token"));

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <LogoSection />
      </div>
      <div style={{ border: "1px solid #ccc", width: "60%" }} />
      <div className={styles.navContainer}>
        <NavSection user={user} />
      </div>
      <div className={styles.profileContainer}>
        <UserSection user={user} />
      </div>
    </div>
  );
}

export default SideBar;
