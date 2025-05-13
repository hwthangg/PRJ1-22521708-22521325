import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SidebarAdmin.module.css';
import logo from '../../assets/huyhieudoan.png'; 
import userIcon from '../../assets/avatar_icon.png'; 
import { FaCog } from 'react-icons/fa';

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState('listaccount');  // Track active menu item

  const handleNavigate = (route, item) => {
    navigate(`/admin/${route}`);  // Navigate to the route
    setActiveMenuItem(item);      // Set active menu item
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <p className={styles.title}>
          HỆ THỐNG HỖ TRỢ<br />NGHIỆP VỤ CÔNG TÁC ĐOÀN
        </p>
      </div>

      <div className={styles.menu}>
        <button
          className={`${styles.menuItem} ${activeMenuItem === 'listaccount' ? styles.active : ''}`}
          onClick={() => handleNavigate('listaccount', 'listaccount')}
        >
          Quản lý tài khoản
        </button>
        <button
          className={`${styles.menuItem} ${activeMenuItem === 'quanlychidoan' ? styles.active : ''}`}
          onClick={() => handleNavigate('quanlychidoan', 'quanlychidoan')}
        >
          Quản lý chi đoàn
        </button>
      </div>

      <div className={styles.footer}>
        <div className={styles.user}>
          <img src={userIcon} alt="User" className={styles.avatar} />
          <span>Đặng Văn B</span>
        </div>
        <FaCog className={styles.settingsIcon} />
      </div>
    </div>
  );
};

export default SidebarAdmin;
