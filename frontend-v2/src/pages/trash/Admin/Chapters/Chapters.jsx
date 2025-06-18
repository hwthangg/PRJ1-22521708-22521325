import React, { useEffect, useState } from "react";
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io";
import {
  TbSquareRoundedChevronsLeftFilled,
  TbSquareRoundedChevronsRightFilled,
} from "react-icons/tb";
import styles from "./Chapters.module.css";
import { useNavigate } from "react-router-dom";
import ChapterDetails from "../../../components/ChapterDetails/ChapterDetails";


function Chapters() {
  const navigate = useNavigate()
  const fields = [
    { flex: 1, field: "STT" },
    { flex: 3, field: "Tên chi đoàn" },
    { flex: 3, field: "Địa chỉ" },
    { flex: 2, field: "Đoàn trực thuộc" },
    { flex: 2, field: "Trạng thái" },
  ];

  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [hoverBack, setHoverBack] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");
  
  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await fetch(
        `http://localhost:5000/api/chapters?page=${currentPage}&limit=5&search=${search}&status=${status}&role=${role}&sortBy=createdAt&sortOrder=asc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setData(data.data.chapters);
      setTotalPages(data.data.pagination.totalPages);
    };
    fetchAccounts();
  }, [currentPage, search, status,  openAddForm,openDetails]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Nhập thông tin chi đoàn tìm kiếm"
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
         
          <div className={styles.filterContainer}>
            <select
              className={styles.filterSelect}
              onChange={(e) => {
                switch (e.target.value) {
                  case "active":
                    setStatus("active");
                    break;
                  case "banned":
                    setStatus("banned");
                    break;

                  default:
                    setStatus("all");
                    break;
                }
              }}
              defaultValue={"all"}
            >
              <option disabled value="">
                -- Chọn trạng thái --
              </option>
              <option value="all">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="banned">Bị khóa</option>
            </select>
          </div>
          <div className={styles.addButtonContainer}>
            <IoIosAddCircle size={50} color="#0d47a1" onClick={()=>setOpenAddForm(true)} />
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                {fields.map((item, index) => (
                  <th
                    key={index}
                    className={styles.tableHeaderCell}
                    style={{ flex: item.flex}}
                  >
                    {item.field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={styles.tableRow}
                  onClick={() => {
                    setOpenDetails(true), setId(item.infoChapter._id);
                   
                  }}
                >
                  <td
                    className={styles.tableCell}
                    style={{ flex: fields[0].flex }}
                  >
                    {index  + 1 + (currentPage- 1) * 5}
                  </td>
                  <td
                    className={styles.tableCell}
                    style={{ flex: fields[1].flex }}
                  >
                    <div className={styles.userInfo}>
                  
                      <p className={styles.userName}>{item.infoChapter.name}</p>
                    </div>
                  </td>
                  <td
                    className={styles.tableCell}
                    style={{ flex: fields[2].flex }}
                  >
                    {item.infoChapter.address}
                  </td>
                  <td
                    className={styles.tableCell}
                    style={{ flex: fields[3].flex }}
                  >
                    {item.infoChapter.affiliated}
                  </td>
                  
                  <td
                    className={styles.tableCell}
                    style={{ flex: fields[4].flex }}
                  >
                    {item.infoChapter.status == "active" ? (
                      <p style={{ color: "#00c853", fontWeight: "bold" }}>
                        Hoạt động
                      </p>
                    ) : (
                      <p style={{ fontWeight: "bold", color: "#d50000" }}>
                        Bị khóa
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.pagination}>
          <div className={styles.paginationArrow}>
            <TbSquareRoundedChevronsLeftFilled
              onClick={() => {
                if (currentPage != 1) {
                  setCurrentPage((prev) => prev - 1);
                }
              }}
              size={40}
              color={hoverBack ? "#90caf9" : "#0d47a1"}
              onMouseEnter={() => {
                setHoverBack(true);
              }}
              onMouseLeave={() => {
                setHoverBack(false);
              }}
            />
          </div>
          <div className={styles.paginationNumbers}>
            {totalPages > 6 ? (
              <>
                {currentPage !== 1 && (
                  <div
                    className={styles.pageNumber}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    <p>{currentPage - 1}</p>
                  </div>
                )}
                <div className={`${styles.pageNumber} ${styles.activePage}`}>
                  <p>{currentPage}</p>
                </div>
                <div
                  className={styles.pageNumber}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  <p>{currentPage + 1}</p>
                </div>
                {currentPage == 1 && (
                  <div
                    className={styles.pageNumber}
                    onClick={() => setCurrentPage((prev) => prev + 2)}
                  >
                    <p>{currentPage + 2}</p>
                  </div>
                )}
                <div className={styles.pageNumber}>
                  <p>...</p>
                </div>
                <div
                  className={styles.pageNumber}
                  onClick={() => setCurrentPage(totalPages - 2)}
                >
                  <p>{totalPages - 2}</p>
                </div>
                <div
                  className={styles.pageNumber}
                  onClick={() => setCurrentPage(totalPages - 1)}
                >
                  <p>{totalPages - 1}</p>
                </div>
                <div
                  className={styles.pageNumber}
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
                    className={`${styles.pageNumber} ${
                      index + 1 == currentPage ? styles.activePage : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    <p>{index + 1}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className={styles.paginationArrow}>
            <TbSquareRoundedChevronsRightFilled
              size={40}
              color={hoverNext ? "#90caf9" : "#0d47a1"}
              onMouseEnter={() => {
                setHoverNext(true);
              }}
              onMouseLeave={() => {
                setHoverNext(false);
              }}
              onClick={() => {
                if (currentPage != totalPages) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
            />
          </div>
        </div>
       {/* Modals */}
        {openDetails && <ChapterDetails chapterId={id} setOpen={setOpenDetails} />}
        {/* {openAddForm && <AddAccount setOpen={setOpenAsdForm} />} */}
      </div>
    </>
  );
}

export default Chapters;
