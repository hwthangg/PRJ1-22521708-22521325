import React, { useState } from "react";
import styles from "./Pagination.module.css";
import {
  TbSquareRoundedChevronsLeftFilled,
  TbSquareRoundedChevronsRightFilled,
} from "react-icons/tb";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const [hoverBack, setHoverBack] = useState(false);
    const [hoverNext, setHoverNext] = useState(false);
  return (
    <div className={styles.container}>
      {/* Previous Button */}
      <div
        onMouseEnter={() => setHoverBack(true)}
        onMouseLeave={() => setHoverBack(false)}
        style={{ cursor: "pointer" }}
      >
        <TbSquareRoundedChevronsLeftFilled
          size={40}
          color={hoverBack ? "#90caf9" : "#0d47a1"}
          onClick={() => {
            if (currentPage !== 1) setCurrentPage((prev) => prev - 1);
          }}
        />
      </div>

      {/* Page Numbers */}
      <div className={styles.pageGroup}>
        {totalPages > 6 ? (
          <>
            {currentPage !== 1 && (
              <div
                className={styles.pageButton}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <p>{currentPage - 1}</p>
              </div>
            )}

            <div className={`${styles.pageButton} ${styles.currentPage}`}>
              <p>{currentPage}</p>
            </div>

            <div
              className={styles.pageButton}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <p>{currentPage + 1}</p>
            </div>

            {currentPage === 1 && (
              <div
                className={styles.pageButton}
                onClick={() => setCurrentPage((prev) => prev + 2)}
              >
                <p>{currentPage + 2}</p>
              </div>
            )}

            <div className={`${styles.pageButton} ${styles.ellipsis}`}>
              <p>...</p>
            </div>

            <div
              className={styles.pageButton}
              onClick={() => setCurrentPage(totalPages - 2)}
            >
              <p>{totalPages - 2}</p>
            </div>

            <div
              className={styles.pageButton}
              onClick={() => setCurrentPage(totalPages - 1)}
            >
              <p>{totalPages - 1}</p>
            </div>

            <div
              className={styles.pageButton}
              onClick={() => setCurrentPage(totalPages)}
            >
              <p>{totalPages}</p>
            </div>
          </>
        ) : (
          <>
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={`${styles.pageButton} ${
                  index + 1 === currentPage ? styles.currentPage : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                <p>{index + 1}</p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Next Button */}
      <div
        onMouseEnter={() => setHoverNext(true)}
        onMouseLeave={() => setHoverNext(false)}
        style={{ cursor: "pointer" }}
      >
        <TbSquareRoundedChevronsRightFilled
          size={40}
          color={hoverNext ? "#90caf9" : "#0d47a1"}
          onClick={() => {
            if (currentPage !== totalPages) {
              setCurrentPage((prev) => prev + 1);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
