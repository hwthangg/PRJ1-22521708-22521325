import React from 'react';
import styles from './ActivityStatistics.module.css';
import Chart from '../../../components/Chart/Chart';

const data = [
  { name: 'Nguyễn Văn A', completed: 2, total: 5 },
  { name: 'Trần Thị B', completed: 4, total: 6 },
  { name: 'Lê Văn C', completed: 6, total: 6 },
  { name: 'Phạm Thị D', completed: 1, total: 4 },
  { name: 'Đặng Hữu Thắng', completed: 3, total: 6 },
  { name: 'Hoàng Thị E', completed: 5, total: 7 },
  { name: 'Bùi Minh F', completed: 0, total: 5 },
];

const ActivityStatistics = () => {
  return (
    <div className={styles.container}>
      <h2>Thống kê hoạt động</h2>
      <Chart data={data} />
    </div>
  );
};

export default ActivityStatistics;
