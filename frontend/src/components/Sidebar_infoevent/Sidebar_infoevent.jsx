import React from 'react';
import styles from './Sidebar_infoevent.module.css';
import { IoArrowBack } from 'react-icons/io5';

const Sidebar_infoevent = ({ onBack }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <IoArrowBack className={styles.backIcon} onClick={onBack} />
        <span className={styles.title}>Thông tin sự kiện</span>
      </div>
      <div className={styles.content}>
        <p className={styles.option}>QR điểm danh</p>
        <p className={styles.option}>Bài viết của sự kiện này</p>
      </div>
    </div>
  );
};

export default Sidebar_infoevent;
