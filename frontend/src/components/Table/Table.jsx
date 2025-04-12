import React, { useState } from 'react';
import styles from './Table.module.css';
import Info from '../Info/Info';

const Table = ({ columns, data }) => {
  const [checkedRows, setCheckedRows] = useState(new Array(data.length).fill(false));
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row for Info

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setCheckedRows(new Array(data.length).fill(checked));
  };

  const handleCheckRow = (index) => {
    const updated = [...checkedRows];
    updated[index] = !updated[index];
    setCheckedRows(updated);
  };

  const handleRowClick = (rowIndex) => {
    setSelectedRow(rowIndex); // Set the selected row to display the Info
  };

  const handleCloseInfo = () => {
    setSelectedRow(null); // Close the Info component
  };

  const renderStatus = (text) => {
    if (text.includes('Tiếp nhận') && text.includes('Từ chối')) {
      return (
        <>
          <button className={styles.approvedBtn} onClick={() => alert('Tiếp nhận')}>Tiếp nhận</button>{' '}
          <button className={styles.rejectedBtn} onClick={() => alert('Từ chối')}>Từ chối</button>
        </>
      );
    }
    if (text === 'Tiếp nhận') {
      return <button className={styles.approvedBtn}>Tiếp nhận</button>;
    }
    if (text === 'Từ chối') {
      return <button className={styles.rejectedBtn}>Từ chối</button>;
    }
    return <em>{text}</em>;
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>STT</th>
            {columns.map((col, index) => (
              <th key={index}>
                {col === 'Họ và tên' ? (
                  <>
                    <input
                      type="checkbox"
                      checked={checkedRows.every(Boolean)}
                      onChange={handleCheckAll}
                      className={styles.inlineCheckbox}
                    />{' '}
                    {col}
                  </>
                ) : (
                  col
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col === 'Họ và tên' ? (
                    <>
                      <input
                        type="checkbox"
                        checked={checkedRows[rowIndex]}
                        onChange={() => handleCheckRow(rowIndex)}
                        className={styles.inlineCheckbox}
                      />{' '}
                      <span
                        className={styles.nameLink}
                        onClick={() => handleRowClick(rowIndex)} // Trigger info on name click
                      >
                        {row[col]}
                      </span>
                    </>
                  ) : col === 'Trạng thái' ? (
                    renderStatus(row[col])
                  ) : (
                    String(row[col])
                      .split('\n')
                      .map((line, idx) => <div key={idx}>{line}</div>)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditionally render Info component based on selected row */}
      {selectedRow !== null && (
        <div className={styles.infoModal}>
          <Info onClose={handleCloseInfo} /> {/* Pass the onClose function */}
        </div>
      )}
    </div>
  );
};

export default Table;
