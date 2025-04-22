import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './Header.module.css';
import logodoan from '../../assets/logodoan.png';
import bellIcon from '../../assets/bellicon.png';
import notifyIcon from '../../assets/notifyicon.png';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);
  const accountRef = useRef(null);

  const navigate = useNavigate(); // thêm dòng này

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(prev => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current && !navRef.current.contains(event.target) &&
        accountRef.current && !accountRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <img src={logodoan} alt="Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav} ref={navRef}>
        <a href="#">Trang chủ</a>

        <div className={styles.navItemWithDropdown}>
          <div className={styles.dropdownText} onClick={() => handleMenuClick('nghiepvu')}>
            Nghiệp vụ đoàn viên ▾
          </div>
          {activeMenu === 'nghiepvu' && (
            <ul className={styles.dropdownMenuNav}>
              <li>Thêm đoàn viên</li>
              <li>Danh sách đoàn viên</li>
              <li>Quản lý đoàn phí</li>
            </ul>
          )}
        </div>

        <div className={styles.navItemWithDropdown}>
          <div className={styles.dropdownText} onClick={() => handleMenuClick('sukien')}>
            Tổ chức sự kiện ▾
          </div>
          {activeMenu === 'sukien' && (
            <ul className={styles.dropdownMenuNav}>
              <li>Thêm sự kiện</li>
              <li>Danh sách sự kiện</li>
              <li>Thống kê tham gia</li>
            </ul>
          )}
        </div>

        <a href="#">Tài liệu</a>
      </nav>

      <div className={styles.rightSection}>
        <button className={styles.iconButton}>
          <img src={bellIcon} alt="Thông báo" />
        </button>
        <button className={styles.iconButton} onClick={() => navigate('/message')}>
          <img src={notifyIcon} alt="Tin nhắn" />
        </button>
        <div className={styles.dropdownWrapper} ref={accountRef}>
          <div className={styles.dropdownText} onClick={toggleDropdown}>
            Chi đoàn KP Đông B ▾
          </div>
          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li>Hồ sơ</li>
              <li>Đăng xuất</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
