import React, { useEffect, useState } from "react";
import logoDoan from "../../assets/huyhieudoan.png";
import { NavLink, useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import avatar from "../../assets/avatar.png";
import styles from "./AdminSideBar.module.css";
import { FaMessage } from "react-icons/fa6";

function AdminSideBar() {
  const navigate = useNavigate();
  const [openInfo, setOpenInfo] = useState(false);
  
  const handleLogout = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/logout`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  const [me, setMe] = useState({})
useEffect(()=>{
const fetchMe = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        setMe(data.data);
      } catch (error) {}
    };
fetchMe()
},[])
  return (
    <>
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarFixed}>
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarInner}>
              <div className={styles.logoSection}>
                <img src={logoDoan} className={styles.logo} />
                <p className={styles.title}>
                  HỆ THỐNG HỖ TRỢ <br /> NGHIỆP VỤ CÔNG TÁC ĐOÀN
                </p>
              </div>
              <div className={styles.navLinks}>
                <NavLink
                  to="/admin/accounts"
                  className={styles.navLink}
                >
                  Danh sách tài khoản
                </NavLink>
                <NavLink
                  to="/admin/chapters"
                  className={styles.navLink}
                >
                  Danh sách chi đoàn
                </NavLink>
                <NavLink
                  to="/admin/request-accounts"
                  className={styles.navLink}
                >
                  Yêu cầu phê duyệt
                </NavLink>
              </div>
            </div>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.profileSection}>
              <div 
                className={styles.profileInfo}
                onClick={() => setOpenInfo(prev => !prev)}
              >
                <img
                  src={me.avatar||avatar}
                  className={styles.avatar}
                />
                <p className={styles.profileName}>
                  {me.fullname}
                </p>
                {openInfo && (
                  <div className={styles.profileDropdown}>
                    <div className={styles.dropdownItem} onClick={() => alert(1)}>
                      Hồ sơ cá nhân
                    </div>
                    <div className={styles.dropdownItem} onClick={handleLogout}>
                      Đăng xuất
                    </div>
                  </div>
                )}
              </div>
              <FaMessage
                size={30}
                color="white"
                className={styles.iconButton}
                onClick={() => navigate("/admin/chat")}
              />
              <IoNotifications 
                size={35} 
                color="white" 
                className={styles.iconButton}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSideBar;