import React, { useEffect, useState } from "react";
import styles from "./Chapters.module.css";
import avatar from "../../../../assets/avatar.png";
import Pagination from "../../../../components/Pagination/Pagination";

import ClipLoader from "react-spinners/ClipLoader";
import { IoAddCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import ChapterDetails from "../../../../components/ChapterDetails/ChapterDetails";
import AddChapter from "../../../../components/AddChapter/AddChapter";

export default function Chapters() {
  const fields = [
    { flex: 1, field: "STT" },
    { flex: 3, field: "Tên chi đoàn" },
    { flex: 3, field: "Đoàn trực thuộc" },
    { flex: 3, field: "Người quản lý" },
    { flex: 2, field: "Trạng thái" },
  ];

  const mapFields = {
    active: "Hoạt động",
    locked: "Khóa",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [hadManager, setHadManager] = useState("");
  const [status, setStatus] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController(); // để có thể hủy fetch nếu cần
    let retryInterval = null;
    let timeout = null;
    let isMounted = true;

    const fetchChapters = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_APP_SERVER_URL
          }/api/chapters?page=${currentPage}&limit=6&search=${search}&hadManager=${hadManager}&status=${status}`,
          { signal: controller.signal }
        );
        const result = await res.json();
        console.log(result);

        if (isMounted && result.data?.result?.length > 0) {
          clearInterval(retryInterval);
          clearTimeout(timeout);
          setData(result.data.result);
          setTotalPages(result.data.totalPages);
          setLoading(false);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    setLoading(true);
    fetchChapters(); // gọi lần đầu ngay lập tức

    // Thử lại mỗi 5 giây
    retryInterval = setInterval(fetchChapters, 5000);

    // Dừng sau 60 giây
    timeout = setTimeout(() => {
      clearInterval(retryInterval);
      setLoading(false); // hết giờ mà chưa có dữ liệu thì dừng loading
    }, 60000);

    return () => {
      isMounted = false;
      clearInterval(retryInterval);
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search, currentPage, hadManager, status, openDetails, openAdd]);

  return (
    <div className={styles.container}>
      <div className={styles.toolBar}>
        <div className={styles.inputContainer} style={{ flex: 2 }}>
          <label htmlFor="search">Tìm kiếm</label>
          <input
            type="search"
            id="search"
            placeholder="Tìm kiếm theo tên chi đoàn, đoàn trực thuộc"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer} style={{ flex: 1 }}>
          <label htmlFor="hadManager">Tình trạng quản lý</label>
          <div className={styles.inputSelect}>
            <select
              id="hadManager"
              value={hadManager}
              onChange={(e) => setHadManager(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="true">Có quản lý</option>
              <option value="false">Chưa có quản lý</option>
            </select>
          </div>
        </div>
        <div className={styles.inputContainer} style={{ flex: 1 }}>
          <label htmlFor="status">Trạng thái</label>
          <div className={styles.inputSelect}>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="locked">Khóa</option>
              <option value="pending">Chờ duyệt</option>
            </select>
          </div>
        </div>
        <div
          className={styles.inputContainer}
          style={{ flex: 1, justifyContent: "flex-end" }}
          onClick={()=>setOpenAdd(true)}
        >
          <IoAddCircle size={60} color="#3c78d8" className={styles.addButton} />
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.head}>
          {fields.map((item, index) => (
            <div
              key={index}
              className={styles.cell}
              style={{ flex: item.flex }}
            >
              <p>{item.field}</p>
            </div>
          ))}
        </div>

        <div className={styles.data}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <ClipLoader color="#36d7b7" size={50} />
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : data.length === 0 ? (
            <div className={styles.noDataContainer}>
              <p>Không có dữ liệu</p>
            </div>
          ) : (
            data.map((item, index) => (
              <div
                key={index}
                className={styles.row}
                onClick={() => {
                  setChapterId(item._id);
                  setOpenDetails(true);
                }}
              >
                <div
                  className={styles.cell}
                  style={{ flex: fields[0].flex, textAlign: "center" }}
                >
                  <p style={{ paddingRight: 40 }}>
                    {index + 1 + (currentPage - 1) * 6}
                  </p>
                </div>
                <div className={styles.cell} style={{ flex: fields[1].flex }}>
                  <p>{item.name}</p>
                </div>{" "}
                <div className={styles.cell} style={{ flex: fields[3].flex }}>
                  <p>{item.affiliated}</p>
                </div>
                <div className={styles.cell} style={{ flex: fields[2].flex }}>
                  {item.fullname ? (
                    <>
                      {" "}
                      <div className={styles.avatarContainer}>
                        <img src={item.avatar?.path || avatar} />
                        <p>{item.fullname}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>Không</p>
                    </>
                  )}
                </div>
                <div className={styles.cell} style={{ flex: fields[4].flex }}>
                  <p
                    style={{
                      color:
                        item.status === "active"
                          ? "green"
                          : item.status === "locked"
                          ? "red"
                          : "#ff8f00",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        marginRight: 6,
                        backgroundColor:
                          item.status === "active"
                            ? "green"
                            : item.status === "locked"
                            ? "red"
                            : "#ff8f00",
                      }}
                    ></span>
                    {mapFields[item.status]}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {openDetails && <ChapterDetails id={chapterId} open={setOpenDetails} />}
      {openAdd && <AddChapter id={chapterId} open={setOpenAdd} />}
    </div>
  );
}
