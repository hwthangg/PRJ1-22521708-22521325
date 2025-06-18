import React, { useState } from "react";
import styles from "./AddChapter.module.css";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { validateChapterForm } from "../../../utils/validate";

export default function AddChapter({ open }) {
  const [data, setData] = useState({
    name: "",
    address: "",
    affiliated: "",
    establishedAt: "",
  });

  const [adding, setAdding] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAdd = async () => {
    const error = validateChapterForm(data, false);
    if (error) {
      toast.error(error);
      return;
    }

    setAdding(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/chapters`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Thêm chi đoàn thành công.");
        setData({
          name: "",
          address: "",
          affiliated: "",
          establishedAt: "",
        });
      } else {
        toast.error(result.message || "Thêm chi đoàn thất bại.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thêm chi đoàn.");
    } finally {
      setAdding(false);
    }
  };

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
                value={data.name}
                onChange={handleChange}
                placeholder="Nhập tên chi đoàn"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputContainer} style={{ flex: 3 }}>
              <label htmlFor="affiliated">Đơn vị trực thuộc</label>
              <input
                id="affiliated"
                type="text"
                value={data.affiliated}
                onChange={handleChange}
                placeholder="Nhập đơn vị trực thuộc"
              />
            </div>
            <div className={styles.inputContainer} style={{ flex: 1 }}>
              <label htmlFor="establishedAt">Ngày thành lập</label>
              <input
                id="establishedAt"
                type="date"
                value={data.establishedAt?.substring(0, 10)}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="address">Địa chỉ</label>
            <input
              id="address"
              type="text"
              value={data.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
            />
          </div>

          <div className={styles.buttonContainer}>
            <button onClick={handleAdd} disabled={adding}>
              {adding ? <ClipLoader size={20} color="#fff" /> : "Thêm mới"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
