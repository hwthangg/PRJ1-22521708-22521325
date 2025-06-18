import React, { useEffect, useState } from "react";
import styles from "./ChapterDetails.module.css";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

export default function ChapterDetails({ id, open }) {
  const [data, setData] = useState({});
  const [update, setUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/chapters/${id}`
        );
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        } else {
          toast.error(result.message || "Không thể tải dữ liệu.");
        }
      } catch (err) {
        console.error("Fetch account failed", err);
        toast.error("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
    setUpdate((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async () => {
    if (!id) return;
    setUpdating(true);
    try {
           const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/chapters/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(update),
          headers:{
            "Content-Type":"application/json"
          }
        }
      );
      const result = await res.json();
      if (result.success) {
        toast.success("Cập nhật thành công.");
        setUpdate({});
      } else {
        toast.error(result.message || "Cập nhật thất bại.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thất bại.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader size={50} color="#36d7b7" />
        <p>Đang tải dữ liệu chi đoàn...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <button className={styles.closeButton} onClick={() => open(false)}>
          <IoCloseCircle size={40} color="red" />
        </button>
        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer} style={{ flex: 3 }}>
              <label htmlFor="name">Tên chi đoàn</label>
              <input
                id="name"
                type="text"
                value={data?.name || ""}
                onChange={handleChange}
                placeholder="Nhập họ tên"
              />
            </div>
            <div className={styles.inputContainer} style={{ flex: 1 }}>
              <label htmlFor="status">Trạng thái</label>
              <div className={styles.inputSelect}>
                <select
                  id="status"
                  value={data?.status || "active"}
                  onChange={handleChange}
                  style={{
                    color:
                      data?.status === "active"
                        ? "green"
                        : data?.status === "locked"
                        ? "red"
                        : "#ff8f00",
                    fontWeight: "bold",
                  }}
                >
                  <option value="active">Hoạt động</option>
                  <option value="locked">Khóa</option>
                  <option value="pending">Chờ duyệt</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputContainer} style={{ flex: 3 }}>
              <label htmlFor="affiliated">Đoàn trực thuộc</label>
              <input
                id="affiliated"
                type="affiliated"
                value={data?.affiliated || ""}
                onChange={handleChange}
                placeholder="Nhập affiliated"
              />
            </div>
            <div className={styles.inputContainer} style={{ flex: 1 }}>
              <label htmlFor="establishedAt">Ngày thành lập</label>
              <input
                id="establishedAt"
                type="date"
                value={data?.establishedAt?.substring(0, 10) || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="address">Địa chỉ</label>
            <input
              id="address"
              type="text"
              value={data?.address || ""}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="address">Người quản lý</label>
                {data.fullname ? <>  <div className={styles.avatarContainer}>
                                <img src={data.avatar?.path || avatar} />
                                <p>{data.fullname}</p>
                              </div></>:<><p>Không</p></>}
          </div>

          

          <div className={styles.buttonContainer}>
            <button onClick={handleUpdate} disabled={updating}>
              {updating ? <ClipLoader size={20} color="#fff" /> : "Lưu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
