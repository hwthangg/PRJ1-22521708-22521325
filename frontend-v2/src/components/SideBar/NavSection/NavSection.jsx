import React, { useEffect, useState } from "react";
import styles from "./NavSection.module.css";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
export default function NavSection({ user }) {
  const adminNavList = [
    { navLabel: "Danh sách tài khoản", route: "/admin/accounts" },
    { navLabel: "Danh sách chi đoàn", route: "/admin/chapters" },
    { navLabel: "Yêu cầu phê duyệt", route: "/admin/requests" },
    
  ];

  const managerNavList = [
    { navLabel: "Bảng tin", route: "/manager/news" },
    { navLabel: "Danh sách đoàn viên", route: "/manager/members" },
    { navLabel: "Danh sách sự kiện", route: "/manager/events" },
    { navLabel: "Danh sách tài liệu", route: "manager/documents" },
    { navLabel: "Yêu cầu phê duyệt", route: "/manager/requests" },
    { navLabel: "Báo cáo thống kê", route: "/manager/statistic" },
  ];

  const memberNavList = [
    { navLabel: "Bảng tin", route: "/member/news" },
    { navLabel: "Sự kiện của tôi", route: "/member/my-events" },
  ];

  const [navList, setNavList] = useState([]);

  useEffect(() => {
    if (user.role == "admin") {
      setNavList(adminNavList);
    } else if (user.role == "manager") {
      setNavList(managerNavList);
    } else {
      setNavList(memberNavList);
    }
  }, [user]);
  return (
    <>
      <div className={styles.navSection}>
        {navList.map((item, index) => (
          <NavLink key={index} className={styles.itemContainer} to={`/qldv${item.route}`}>
            <p className={styles.itemLabel}>{item.navLabel}</p>
          </NavLink>
        ))}
      </div>
    </>
  );
}
