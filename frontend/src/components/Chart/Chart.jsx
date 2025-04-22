import React from 'react';
import styles from './Chart.module.css';

const Chart = ({ data }) => {
  return (
    <div className={styles.chartWrapper}>
      {data.map((item, index) => {
        const percentage = (item.completed / item.total) * 100;

        return (
          <div key={index} className={styles.row}>
            <span className={styles.name}>{item.name}</span>

            <div className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <span className={styles.progress}>
              {item.completed}/{item.total}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Chart;
