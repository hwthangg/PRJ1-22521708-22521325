import React from 'react';
import styles from './Sidebar_infoevent.module.css';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Sidebar_infoevent = ({ onBack }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <IoArrowBack className={styles.backIcon} onClick={()=>handleNavigate('/events')} />
        <span className={styles.title}>Thông tin sự kiện</span>
      </div>
      <div className={styles.content}>
        <p className={styles.option} onClick={() => handleNavigate('/qr')}>QR điểm danh</p>
        <p className={styles.option} onClick={() => handleNavigate('/home')}>Bài viết của sự kiện này</p>
      </div>
    </div>
  );
};

export default Sidebar_infoevent;
