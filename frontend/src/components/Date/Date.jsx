import React from 'react';
import styles from './Date.module.css';

const DateSelect = () => {
  return (
    <div className={styles.dateContainer}>
      <label className={styles.label}>Thời gian:</label>
      <select className={styles.select}>
        <option>Ngày</option>
      </select>
      <select className={styles.select}>
        <option>Tháng</option>
      </select>
      <select className={styles.select}>
        <option>Năm</option>
      </select>
    </div>
  );
};

export default DateSelect;
