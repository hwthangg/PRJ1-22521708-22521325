import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logodoan from "../../assets/logodoan.png";
import bellIcon from "../../assets/bellicon.png";
import notifyIcon from "../../assets/notifyicon.png";
import { AuthContext } from "../../../context/AuthContext";
import socket from "../../socket";

const Header = () => {
  const {
    ROLE: { setRole },
  } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);
  const accountRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);


  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef(null);
  const [notifications, setNotifications] = useState([])

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
    if (!showNotifications) {
      setUnreadCount(0);
    }
  };
  

  const [chapter, setChapter] = useState("");

  const navigate = useNavigate(); // thêm dòng này

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleLogout = async () => {
    setRole("");
    socket.disconnect();
    fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
  };
  useEffect(() => {

    fetch('http://localhost:5000/api/notifications', {
      method: 'GET',
      credentials:'include'
    }).then(res => res.json()).then(data => setNotifications(prevNotifications => [...prevNotifications, data]))
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // 🔒 Chỉ connect nếu chưa kết nối
    if (!socket.connected) {
      socket.connect();
    }

    // ✅ Đảm bảo không đăng ký lại event listener nhiều lần
    const handleEventReminder = (data) => {
      setUnreadCount(prevCount => prevCount + 1);
      console.log("📢 Sự kiện sắp diễn ra:", data);
      setNotifications(prevNotifications => [data,...prevNotifications]);

      // TODO: hiện toast hoặc thông báo ở đây
    };

    socket.on("event_reminder", handleEventReminder)

    fetch(`http://localhost:5000/api/auth/me`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setChapter(res.data);
        socket.emit("access", res.data._id);
      });



    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      socket.off('event_reminder');
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <img src={logodoan} alt="Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav} ref={navRef}>
        <a href="/home">Trang chủ</a>

        <div className={styles.navItemWithDropdown}>
          <div
            className={styles.dropdownText}
            onClick={() => handleMenuClick("nghiepvu")}
          >
            Nghiệp vụ đoàn viên ▾
          </div>
          {activeMenu === "nghiepvu" && (
            <ul className={styles.dropdownMenuNav}>
              <li>
                <a>Danh sách đoàn viên</a>
              </li>
              <li>
                <a>Thêm đoàn viên</a>
              </li>
              <li>
                <a href="/members/receiving">Tiếp nhận đoàn viên</a>
              </li>
              <li>
                <a>Đoàn viên chuyển sinh hoạt</a>
              </li>
              <li>
                <a href="/members/activity-statistic">Thống kê hoạt động</a>
              </li>
            </ul>
          )}
        </div>

        <div className={styles.navItemWithDropdown}>
          <div
            className={styles.dropdownText}
            onClick={() => handleMenuClick("sukien")}
          >
            Tổ chức sự kiện ▾
          </div>
          {activeMenu === "sukien" && (
            <ul className={styles.dropdownMenuNav}>
              <li>
                <a href="#">Thêm sự kiện</a>
              </li>
              <li>
                <a href="/events">Danh sách sự kiện</a>
              </li>
              <li>
                <a href="#">Thống kê tham gia</a>
              </li>
            </ul>
          )}
        </div>

        <a href="/documents">Tài liệu</a>
      </nav>

      <div className={styles.rightSection}>
        <div className={styles.notificationWrapper} ref={bellRef}>
        <button className={styles.iconButton} onClick={toggleNotifications}>
  <img src={bellIcon} alt="Thông báo" />
  {unreadCount > 0 && (
    <span className={styles.badge}>{unreadCount}</span>
  )}
</button>
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <p className={styles.notificationTitle}>Thông báo</p>
              <ul>
              {notifications.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((item)=>(<li key={item._id}>{item.content}</li>))}
               
                {/* bạn có thể map thông báo từ state */}
              </ul>
            </div>
          )}
        </div>

        <button
          className={styles.iconButton}
          onClick={() => navigate("/message")}
        >
          <img src={notifyIcon} alt="Tin nhắn" />
        </button>
        <div className={styles.dropdownWrapper} ref={accountRef}>
          <div className={styles.dropdownText} onClick={toggleDropdown}>
            {chapter.name} ▾
          </div>
          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <a href="#">Hồ sơ</a>
              </li>
              <li>
                <a href="/" onClick={handleLogout}>
                  Đăng xuất
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
