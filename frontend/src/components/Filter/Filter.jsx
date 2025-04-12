import React from 'react';
import styles from './Filter.module.css';

const Filter = ({ label = "Bộ lọc", selected, onChange }) => {
  // Dữ liệu ảo nằm trong component
  const options = [
    { value: 'all', label: 'Tất cả' },
    { value: 'approved', label: 'Tiếp nhận' },
    { value: 'rejected', label: 'Từ chối' },
  ];

  return (
    <div className={styles.filterWrapper}>
      <label className={styles.label}>{label}:</label>
      <select
        className={styles.select}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
