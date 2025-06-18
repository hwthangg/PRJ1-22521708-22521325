import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.css";
import {
  TbSquareRoundedChevronsLeftFilled,
  TbSquareRoundedChevronsRightFilled,
} from "react-icons/tb";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const [hoverBack, setHoverBack] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

  // Giới hạn currentPage trong khoảng [1, totalPages]
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const first = 1;
      const last = totalPages;

      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", last);
      } else if (currentPage >= totalPages - 3) {
        pages.push(first, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, last);
      } else {
        pages.push(first, "...", currentPage - 1, currentPage, currentPage + 1, "...", last);
      }
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (typeof page === "number" && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.container}>
      {/* Nút Quay lại */}
      <div
        className={`${styles.navButton} ${currentPage === 1 ? styles.disabled : ""}`}
        onMouseEnter={() => setHoverBack(true)}
        onMouseLeave={() => setHoverBack(false)}
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
      >
        <TbSquareRoundedChevronsLeftFilled
          size={40}
          color={hoverBack ? "#90caf9" : "#0d47a1"}
        />
      </div>

      {/* Danh sách số trang */}
      <div className={styles.pageGroup}>
        {generatePageNumbers().map((page, index) => (
          <div
            key={index}
            className={`${styles.pageButton}
              ${page === currentPage ? styles.currentPage : ""}
              ${page === "..." ? styles.ellipsis : ""}`}
            onClick={() => handlePageClick(page)}
            style={{ cursor: page === "..." ? "default" : "pointer" }}
          >
            <p>{page}</p>
          </div>
        ))}
      </div>

      {/* Nút Tiếp theo */}
      <div
        className={`${styles.navButton} ${currentPage === totalPages ? styles.disabled : ""}`}
        onMouseEnter={() => setHoverNext(true)}
        onMouseLeave={() => setHoverNext(false)}
        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
      >
        <TbSquareRoundedChevronsRightFilled
          size={40}
          color={hoverNext ? "#90caf9" : "#0d47a1"}
        />
      </div>
    </div>
  );
};

export default Pagination;
