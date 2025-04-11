import React, { useState } from 'react';
import styles from './Table.module.css';

const Table = ({ columns, data }) => {
  const [checkedRows, setCheckedRows] = useState(new Array(data.length).fill(false));

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setCheckedRows(new Array(data.length).fill(checked));
  };

  const handleCheckRow = (index) => {
    const updated = [...checkedRows];
    updated[index] = !updated[index];
    setCheckedRows(updated);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={checkedRows.every(Boolean)}
                onChange={handleCheckAll}
              />
            </th>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="checkbox"
                  checked={checkedRows[rowIndex]}
                  onChange={() => handleCheckRow(rowIndex)}
                />
              </td>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {String(row[col]).split('\n').map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
