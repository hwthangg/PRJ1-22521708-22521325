import React, { useEffect, useState } from "react";
import { TbSquareRoundedChevronsLeftFilled, TbSquareRoundedChevronsRightFilled } from "react-icons/tb";
import avatar from "../../../assets/avatar.png";
import RequestMemberDetails from "./RequestMemberDetails/RequestMemberDetails";

function RequestMembers() {
  const fields = [
    { flex: 1, field: "STT" },
    { flex: 3, field: "Họ và tên" },
    { flex: 3, field: "Email" },
    { flex: 2, field: "Số điện thoại" },
    { flex: 2, field: "Vai trò" },
    { flex: 2, field: "Trạng thái" },
  ];

  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [hoverBack, setHoverBack] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await fetch(
        `http://localhost:5000/api/accounts?page=${currentPage}&limit=7&search=${search}&status=waiting&role=member&sortBy=createdAt&sortOrder=asc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setData(data.data.accounts);
      setTotalPages(data.data.pagination.totalPages);
    };
    fetchAccounts();
  }, [search, role, currentPage, openDetails]);

  // Styles as JS objects
  const styles = {
    container: {
      display: "flex",
      flex: 1,
      height: "100vh",
      boxSizing: "border-box",
      flexDirection: "column",
      position: "relative",
      zIndex: 0,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      margin: "40px 60px 10px",
      gap: 20,
    },
    searchContainer: {
      display: "flex",
      width: "30%",
      padding: 20,
      borderRadius: 20,
      boxShadow: "0px 5px 15px #e0e0e0",
    },
    searchInput: {
      all: "unset",
      width: "100%",
      height: 20,
      caretColor: "black",
    },
    tableContainer: {
      display: "flex",
      flexDirection: "column",
      margin: "20px 60px 0",
      boxSizing: "border-box",
      boxShadow: "0px 0px 15px #e0e0e0",
      paddingBottom: 20,
      borderRadius: 10,
    },
    table: {
      display: "flex",
      flexDirection: "column",
      cursor: "default",
    },
    tableHeader: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      display: "flex",
      flexDirection: "row",
      height: 60,
      backgroundColor: "#0d47a1",
    },
    tableHeaderCell: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "large",
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      height: 80,
      borderBottom: "1px solid",
      cursor: "pointer",
    },
    tableRowHover: {
      backgroundColor: "#bcdafc",
    },
    tableCell: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    userInfo: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 10,
    },
    avatar: {
      borderRadius: 100,
      height: 60,
      aspectRatio: "1 / 1",
    },
    userName: {
      marginLeft: 10,
    },
    pagination: {
      display: "flex",
      flexDirection: "row",
      margin: 30,
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
    },
    paginationNumbers: {
      display: "flex",
      flexDirection: "row",
      gap: 30,
    },
    pageNumber: {
      width: 20,
      aspectRatio: "1 / 1",
      border: "1px solid",
      padding: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      backgroundColor: "#0d47a1",
      color: "white",
      cursor: "pointer",
      userSelect: "none",
    },
    pageNumberHover: {
      backgroundColor: "#90caf9",
    },
    activePage: {
      backgroundColor: "#90caf9",
      fontWeight: "bold",
    },
  };

  // State for hover page numbers if needed
  const [hoveredPage, setHoveredPage] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Nhập thông tin tài khoản tìm kiếm"
            style={styles.searchInput}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div style={styles.tableContainer}>
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            {fields.map((item, index) => (
              <div
                key={index}
                style={{ ...styles.tableHeaderCell, flex: item.flex }}
              >
                {item.field}
              </div>
            ))}
          </div>
          <div>
            {data.map((item, index) => (
              <div
                key={index}
                style={{
                  ...styles.tableRow,
                  flexDirection: "row",
                }}
                onClick={() => {
                  setOpenDetails(true);
                  setId(item._id);
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#bcdafc")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div
                  style={{ ...styles.tableCell, flex: fields[0].flex }}
                >
                  {index + 1 + (currentPage - 1) * 7}
                </div>
                <div
                  style={{ ...styles.tableCell, flex: fields[1].flex }}
                >
                  <div style={styles.userInfo}>
                    <img
                      src={item.avatar || avatar}
                      alt="avatar"
                      style={styles.avatar}
                    />
                    <p style={styles.userName}>{item.fullname}</p>
                  </div>
                </div>
                <div
                  style={{ ...styles.tableCell, flex: fields[2].flex }}
                >
                  {item.email}
                </div>
                <div
                  style={{ ...styles.tableCell, flex: fields[3].flex }}
                >
                  {item.phone}
                </div>
                <div
                  style={{ ...styles.tableCell, flex: fields[4].flex }}
                >
                  {item.role === "member" && <p>Đoàn viên</p>}
                  {item.role === "manager" && <p>Người quản lý chi đoàn</p>}
                  {item.role === "admin" && <p>Quản trị viên</p>}
                </div>
                <div
                  style={{
                    ...styles.tableCell,
                    flex: fields[5].flex,
                    fontWeight: "bold",
                    color: "#f57f17",
                  }}
                >
                  Chờ phê duyệt
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.pagination}>
        <div>
          <TbSquareRoundedChevronsLeftFilled
            onClick={() => {
              if (currentPage !== 1) setCurrentPage((prev) => prev - 1);
            }}
            size={40}
            color={hoverBack ? "#90caf9" : "#0d47a1"}
            onMouseEnter={() => setHoverBack(true)}
            onMouseLeave={() => setHoverBack(false)}
            style={{ cursor: currentPage === 1 ? "default" : "pointer" }}
          />
        </div>
        <div style={styles.paginationNumbers}>
          {totalPages > 6 ? (
            <>
              {currentPage !== 1 && (
                <div
                  style={styles.pageNumber}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  onMouseEnter={() => setHoveredPage(currentPage - 1)}
                  onMouseLeave={() => setHoveredPage(null)}
                >
                  <p>{currentPage - 1}</p>
                </div>
              )}
              <div
                style={{ ...styles.pageNumber, ...styles.activePage }}
              >
                <p>{currentPage}</p>
              </div>
              <div
                style={styles.pageNumber}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                onMouseEnter={() => setHoveredPage(currentPage + 1)}
                onMouseLeave={() => setHoveredPage(null)}
              >
                <p>{currentPage + 1}</p>
              </div>
              {currentPage === 1 && (
                <div
                  style={styles.pageNumber}
                  onClick={() => setCurrentPage((prev) => prev + 2)}
                  onMouseEnter={() => setHoveredPage(currentPage + 2)}
                  onMouseLeave={() => setHoveredPage(null)}
                >
                  <p>{currentPage + 2}</p>
                </div>
              )}
              <div style={styles.pageNumber}>
                <p>...</p>
              </div>
              <div
                style={styles.pageNumber}
                onClick={() => setCurrentPage(totalPages - 2)}
                onMouseEnter={() => setHoveredPage(totalPages - 2)}
                onMouseLeave={() => setHoveredPage(null)}
              >
                <p>{totalPages - 2}</p>
              </div>
              <div
                style={styles.pageNumber}
                onClick={() => setCurrentPage(totalPages - 1)}
                onMouseEnter={() => setHoveredPage(totalPages - 1)}
                onMouseLeave={() => setHoveredPage(null)}
              >
                <p>{totalPages - 1}</p>
              </div>
              <div
                style={styles.pageNumber}
                onClick={() => setCurrentPage(totalPages)}
                onMouseEnter={() => setHoveredPage(totalPages)}
                onMouseLeave={() => setHoveredPage(null)}
              >
                <p>{totalPages}</p>
              </div>
            </>
          ) : (
            Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              const isActive = pageNum === currentPage;
              return (
                <div
                  key={index}
                  style={{
                    ...styles.pageNumber,
                    ...(isActive ? styles.activePage : {}),
                    ...(hoveredPage === pageNum ? styles.pageNumberHover : {}),
                  }}
                  onClick={() => setCurrentPage(pageNum)}
                  onMouseEnter={() => setHoveredPage(pageNum)}
                  onMouseLeave={() => setHoveredPage(null)}
                >
                  <p>{pageNum}</p>
                </div>
              );
            })
          )}
        </div>
        <div>
          <TbSquareRoundedChevronsRightFilled
            size={40}
            color={hoverNext ? "#90caf9" : "#0d47a1"}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            onClick={() => {
              if (currentPage !== totalPages) setCurrentPage((prev) => prev + 1);
            }}
            style={{ cursor: currentPage === totalPages ? "default" : "pointer" }}
          />
        </div>
      </div>

      {openDetails && <RequestMemberDetails id={id} setOpen={setOpenDetails} />}
    </div>
  );
}

export default RequestMembers;
