import React, { useState } from 'react';
import styles from './Header.module.css';
import logodoan from '../../assets/logodoan.png';
import bellIcon from '../../assets/bellicon.png';
import notifyIcon from '../../assets/notifyicon.png';


const Header = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <img src={logodoan} alt="Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <a href="#">Trang chủ</a>
        <a href="#">Danh sách đoàn viên</a>
        <a href="#">Danh sách sự kiện</a>
        <a href="#">Tài liệu</a>
      </nav>

      <div className={styles.rightSection}>
        <button className={styles.iconButton}>
          <img src={bellIcon} alt="Thông báo" />
        </button>
        <button className={styles.iconButton}>
          <img src={notifyIcon} alt="Tin nhắn" />
        </button>
        <div className={styles.dropdownWrapper}>
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