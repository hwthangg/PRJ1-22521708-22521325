import React, { useState } from 'react';
import styles from './Table_account.module.css';
import Info from '../Info/Info';
import { useNavigate } from 'react-router-dom';

const Table_account = ({ columns, data }) => {
  const [checkedRows, setCheckedRows] = useState(new Array(data.length).fill(false));
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10); // ✅ Dùng state cho số dòng mỗi trang
  const [currentPage, setCurrentPage] = useState(1);  // ✅ State cho trang hiện tại

  const navigate = useNavigate()

  // Tính tổng số trang
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Chuyển trang trước
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Chuyển trang tiếp theo
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Tính chỉ mục dữ liệu theo trang hiện tại
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const paginatedData = data.slice(startIdx, endIdx);

  // Checkbox tất cả
  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    setCheckedRows(new Array(data.length).fill(checked));
  };

  // Checkbox từng dòng
  const handleCheckRow = (index) => {
    const updated = [...checkedRows];
    updated[index] = !updated[index];
    setCheckedRows(updated);
  };

  // Click chọn dòng (mở Info)
  const handleRowClick = (e, rowIndex) => {

    if(columns.includes('Tên sự kiện')) {
      navigate('/events/1')
    }
    else if (e.target.type !== 'checkbox') {
      setSelectedRow(rowIndex);
    }
  };

  // Đóng Info
  const handleCloseInfo = () => {
    setSelectedRow(null);
  };

  // Hiển thị trạng thái
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
                {(col === 'Họ và tên' || col === 'Tên sự kiện'|| col === 'Tên tài liệu') ? (
                  <div className={styles.headerCell}>
                    {col}
                    <input
                      type="checkbox"
                      checked={checkedRows.every(Boolean)}
                      onChange={handleCheckAll}
                      className={styles.headerCheckbox}
                    />
                  </div>
                ) : (
                  col
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {paginatedData.map((row, rowIndex) => {
  const actualIndex = startIdx + rowIndex;
  return (
    <tr key={actualIndex} onClick={(e) => handleRowClick(e, actualIndex)} className={styles.row}>
      <td>{actualIndex + 1}</td>
      {columns.map((col, colIndex) => (
        <td key={colIndex}>
          {(col === 'Họ và tên' || col === 'Tên sự kiện' || col === 'Tên tài liệu') ? (
            <div className={styles.nameCell}>
              <span className={styles.nameLink}>{row[col]}</span>
              <input
                type="checkbox"
                checked={checkedRows[actualIndex]}
                onChange={() => handleCheckRow(actualIndex)}
                onClick={(e) => e.stopPropagation()}
                className={styles.inlineCheckbox}
              />
            </div>
          ) : col === 'Trạng thái' ? (
            renderStatus(row[col])
          ) : col === 'Điểm danh' ? (
            <a
              href="#"
              className={styles.link}
              onClick={(e) => {
                e.stopPropagation();
                alert(row[col]);
              }}
            >
              {row[col]}
            </a>
          ) : (
            String(row[col])
              .split('\n')
              .map((line, idx) => <div key={idx}>{line}</div>)
          )}
        </td>
      ))}
    </tr>
  );
})}

        </tbody>
      </table>
      <div className={styles.pagination}>
  <button
    onClick={handlePrevPage}
    disabled={currentPage === 1}
    className={styles.arrowButton}
  >
    &lt;
  </button>

  {[...Array(totalPages)].map((_, i) => {
    const page = i + 1;
    if (
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
    ) {
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
        >
          {page}
        </button>
      );
    } else if (
      (page === currentPage - 2 && page > 2) ||
      (page === currentPage + 2 && page < totalPages - 1)
    ) {
      return <span key={page} className={styles.ellipsis}>...</span>;
    }
    return null;
  })}

  <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className={styles.arrowButton}
  >
    &gt;
  </button>

  <div className={styles.rowsPerPage}>
    <span>Show:</span>
    <select
  value={rowsPerPage}
  onChange={(e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset về trang đầu khi thay đổi số dòng
  }}
>
  <option value={10}>10 rows</option>
  <option value={20}>20 rows</option>
  <option value={30}>30 rows</option>
</select>

  </div>
</div>


      {selectedRow !== null && (
        <div className={styles.infoModal}>
          <Info onClose={handleCloseInfo} />
        </div>
      )}
    </div>
  );
};
export default Table_account;