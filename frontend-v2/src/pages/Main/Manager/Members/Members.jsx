import React, { useEffect, useState } from "react";
import styles from "./Members.module.css";
import avatar from "../../../../assets/avatar.png";
import Pagination from "../../../../components/Pagination/Pagination";
import AccountDetails from "../../../../components/AccountDetails/AccountDetails";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

export default function Members() {
  const fields = [
    { flex: 1, field: "STT" },
    { flex: 4, field: "Họ và tên" },
    { flex: 4, field: "Số thẻ đoàn" },
    { flex: 2, field: "Chức vụ" },
    { flex: 2, field: "Trạng thái" },
  ];

  const mapFields = {
    secretary: "Bí thư",
    deputy_secretary: "Phó Bí thư",
    commitee_member: "Ủy viên Ban chấp hành",
    member: "Đoàn viên",
    active: "Hoạt động",
    locked: "Khóa",
    pending: "Chờ duyệt",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");
  const [accountId, setAccountId] = useState("");
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController(); // để có thể hủy fetch nếu cần
    let retryInterval = null;
    let timeout = null;
    let isMounted = true;

    const fetchMembers = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_APP_SERVER_URL
          }/api/members?page=${currentPage}&limit=6&search=${search}&position=${position}`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        console.log(result);

        if (isMounted && result.data.result.length > 0) {
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
    fetchMembers(); // gọi lần đầu ngay lập tức

    // Thử lại mỗi 5 giây
    retryInterval = setInterval(fetchMembers, 5000);

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
  }, [search, currentPage, position, openDetails]);

  return (
    <div className={styles.container}>
      <div className={styles.toolBar}>
        <div className={styles.inputContainer} style={{ flex: 2 }}>
          <label htmlFor="search">Tìm kiếm</label>
          <input
            type="search"
            id="search"
            placeholder="Tìm kiếm theo số thẻ đoàn"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer} style={{ flex: 1 }}>
          <label htmlFor="position">Chức vụ</label>
          <div className={styles.inputSelect}>
            <select
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="secretary">Bí thư</option>
              <option value="deputy_secretary">Phó Bí thư</option>
              <option value="commitee_member">Ủy viên Ban chấp hành</option>
              <option value="member">Đoàn viên</option>
            </select>
          </div>
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
                  setAccountId(item._id);
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
                  <div className={styles.avatarContainer}>
                    <img src={item.avatar?.path || avatar} />
                    <p>{item.fullname}</p>
                  </div>
                </div>
                <div className={styles.cell} style={{ flex: fields[2].flex }}>
                  <p>{item.cardCode}</p>
                </div>
                <div className={styles.cell} style={{ flex: fields[3].flex }}>
                  <p>{mapFields[item.position]}</p>
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

      {openDetails && <AccountDetails id={accountId} open={setOpenDetails} />}
    </div>
  );
}
