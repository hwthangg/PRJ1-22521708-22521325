import React, { useEffect, useState } from "react";
import styles from "./NavSection.module.css";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
export default function NavSection({ user }) {
  const adminNavList = [
    { navLabel: "Tổng quan", route: "/admin/dashboard" },
    { navLabel: "Tài khoản", route: "/admin/accounts" },
    { navLabel: "Chi đoàn", route: "/admin/chapters" },
    
  ];

  const managerNavList = [
    { navLabel: "Đoàn viên", route: "/manager/members" },
    { navLabel: "Sự kiện", route: "/manager/events" },
    { navLabel: "Tài liệu", route: "/manager/documents" },
    { navLabel: "Báo cáo thống kê", route: "/manager/statistic" },
  ];

  const memberNavList = [
    { navLabel: "Bảng tin", route: "/member/news" },
    { navLabel: "Sự kiện của tôi", route: "/member/my-events" },
        { navLabel: "Tài liệu chi đoàn", route: "/member/documents" },
  ];

  const [navList, setNavList] = useState([]);

  useEffect(() => {
    if (user?.role == "admin") {
      setNavList(adminNavList);
    } else if (user?.role == "manager") {
      setNavList(managerNavList);
    } else {
      setNavList(memberNavList);
    }
  }, [user]);
  return (
    <>
      <div className={styles.navSection}>

        {navList.map((item, index) => (
          <NavLink key={index} className={styles.itemContainer} to={`/qldv${item.route}`} style={({isActive})=>({backgroundColor: isActive ? 'var(--weight-blue)':"",borderRadius: isActive?10:''})}>
            <p className={styles.itemLabel}>{item.navLabel}</p>
          </NavLink>
        ))}
         <NavLink className={styles.itemContainer} to={`/qldv/chat`} style={({isActive})=>({backgroundColor: isActive ? 'var(--weight-blue)':"",borderRadius: isActive?10:''})}>
            <p className={styles.itemLabel}>Nhắn tin</p>
          </NavLink>
      </div>
    </>
  );
}
