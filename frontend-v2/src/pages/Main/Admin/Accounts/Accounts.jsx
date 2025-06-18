import React, { useEffect, useState } from "react";
import styles from "./Accounts.module.css";
import avatar from "../../../../assets/avatar.png";
import Pagination from "../../../../components/Pagination/Pagination";
import AccountDetails from "../../../../components/AccountDetails/AccountDetails";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

export default function Accounts() {
  const fields = [
    { flex: 1, field: "STT" },
    { flex: 4, field: "Họ và tên" },
    { flex: 4, field: "Email" },
    { flex: 2, field: "Vai trò" },
    { flex: 2, field: "Trạng thái" },
  ];

  const mapFields = {
    admin: "Quản trị viên",
    manager: "Quản lý chi đoàn",
    member: "Đoàn viên",
    active: "Hoạt động",
    locked: "Khóa",
    pending: "Chờ duyệt",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [accountId, setAccountId] = useState("");
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController(); // để có thể hủy fetch nếu cần
    let retryInterval = null;
    let timeout = null;
    let isMounted = true;

    const fetchAccounts = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_APP_SERVER_URL
          }/api/accounts?page=${currentPage}&limit=6&search=${search}&role=${role}&status=${status}`,
          { signal: controller.signal }
        );
        const result = await res.json();

        if (isMounted && result.data?.accounts?.length > 0) {
          clearInterval(retryInterval);
          clearTimeout(timeout);
          setData(result.data.accounts);
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
    fetchAccounts(); // gọi lần đầu ngay lập tức

    // Thử lại mỗi 5 giây
    retryInterval = setInterval(fetchAccounts, 5000);

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
  }, [search, currentPage, role, status, openDetails]);

  return (
    <div className={styles.container}>
      <div className={styles.toolBar}>
        <div className={styles.inputContainer} style={{ flex: 2 }}>
          <label htmlFor="search">Tìm kiếm</label>
          <input
            type="search"
            id="search"
            placeholder="Tìm kiếm theo họ tên, email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer} style={{ flex: 1 }}>
          <label htmlFor="role">Vai trò</label>
          <div className={styles.inputSelect}>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="admin">Quản trị viên</option>
              <option value="manager">Quản lý chi đoàn</option>
              <option value="member">Đoàn viên</option>
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
                  <p>{item.email}</p>
                </div>
                <div className={styles.cell} style={{ flex: fields[3].flex }}>
                  <p>{mapFields[item.role]}</p>
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
