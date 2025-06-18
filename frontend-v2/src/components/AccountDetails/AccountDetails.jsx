import React, { useEffect, useState } from "react";
import styles from "./AccountDetails.module.css";
import { IoCloseCircle } from "react-icons/io5";
import avatarDefault from "../../assets/avatar.png";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

export default function AccountDetails({ id, open, profile }) {
  const [data, setData] = useState({});
  const [update, setUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [chapters, setChapters] = useState([]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const formData = new FormData();
      for (const key in update) {
        if (update.hasOwnProperty(key)) {
          formData.append(key, update[key]);
        }
      }
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/accounts/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const result = await res.json();
      console.log(result)
      if (result.success) {
        toast.success("Cập nhật thành công.");
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

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/accounts/${id}`
        );
        const result = await res.json();
         console.log(result)
        setData(result.data);
      } catch (err) {
        console.error("Fetch account failed", err);
        toast.error("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
useEffect(()=>{
   const fetchChapters = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_APP_SERVER_URL
          }/api/chapters?page=1&limit=10000`,
         
        );

        const result = await res.json();
        
        console.log(result);

        setChapters(result.data.result.map(item=>({value:item._id, name:item.name})))

       
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    fetchChapters()
},[])
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
    setUpdate((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size < 5 * 1024 * 1024) {
      setUpdate((prev) => ({ ...prev, avatar: file }));
    } else {
      toast.info("Ảnh vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn.");
    }
  };

  const renderAvatar = () => {
    if (update.avatar) return URL.createObjectURL(update.avatar);
    if (data.avatar) return data.avatar?.path;
    return avatarDefault;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader size={50} color="#36d7b7" />
        <p>Đang tải dữ liệu người dùng...</p>
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
          <div className={styles.accountInfo}>
            <div className={styles.avatarContainer}>
              <img src={renderAvatar()} alt="avatar" />
              <label htmlFor="avatar">Thay ảnh đại diện</label>
              <input
                type="file"
                id="avatar"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            <div className={styles.information}>
              <div className={styles.inputGroup}>
                <div className={styles.inputContainer} style={{ flex: 3 }}>
                  <label htmlFor="fullname">Họ và tên</label>
                  <input
                    id="fullname"
                    type="text"
                    value={data.fullname || ""}
                    onChange={handleChange}
                    placeholder="Nhập họ tên"
                  />
                </div>
                <div
                  className={styles.inputContainer}
                  style={{ flex: 1, display: profile ? "none" : "flex" }}
                >
                  <label htmlFor="status">Trạng thái</label>
                  <div className={styles.inputSelect}>
                    <select
                      id="status"
                      value={data.status || "active"}
                      onChange={handleChange}
                      style={{
                        color:
                          data.status == "active"
                            ? "green"
                            : data.status == "locked"
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
                <div className={styles.inputContainer} style={{ flex: 2 }}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={data.email || ""}
                    onChange={handleChange}
                    placeholder="Nhập email"
                  />
                </div>
                <div className={styles.inputContainer} style={{ flex: 1 }}>
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    id="phone"
                    type="text"
                    value={data.phone || ""}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputContainer}>
                  <label htmlFor="birthday">Ngày sinh</label>
                  <input
                    id="birthday"
                    type="date"
                    value={data.birthday?.substring(0, 10) || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="role">Vai trò</label>
                  <div className={styles.inputSelect}>
                    <select
                      id="role"
                      value={data.role || ""}
                      onChange={handleChange}
                      disabled={profile}
                    >
                      <option value="admin">Quản trị viên</option>
                      <option value="manager">Quản lý chi đoàn</option>
                      <option value="member">Đoàn viên</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.roleInfo}>
            <div
              className={styles.inputContainer}
              style={{ display: data.role == "manager" ? "flex" : "none" }}
            >
              <label htmlFor="managerOf">Chi đoàn quản lý</label>
              <div className={styles.inputSelect}>
                <select
                  id="managerOf"
                  value={data.managerOf || ""}
                  onChange={handleChange}
                >
                  {chapters.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                display: data.role == "member" ? "flex" : "none",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div className={styles.inputContainer}>
                <label htmlFor="memberOf">Chi đoàn sinh hoạt</label>
                <div className={styles.inputSelect}>
                  <select
                    id="memberOf"
                    value={data.memberOf || ""}
                    onChange={handleChange}
                  >
                    {chapters.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputContainer}>
                  <label htmlFor="cardCode">Số thẻ đoàn</label>
                  <input
                    id="cardCode"
                    type="text"
                    value={data.cardCode || ""}
                    onChange={handleChange}
                    placeholder="Nhập số thẻ đoàn"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="joinedAt">Ngày vào đoàn</label>
                  <input
                    id="joinedAt"
                    type="date"
                    value={data.joinedAt?.substring(0, 10) || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="position">Chức vụ</label>
                  <div className={styles.inputSelect}>
                    <select
                      id="position"
                      value={data.position || ""}
                      onChange={handleChange}
                    >
                      <option value="secretary">Bí thư</option>
                      <option value="deputy_secretary">Phó Bí thư</option>
                      <option value="committee_member">Ủy viên BCH</option>
                      <option value="member">Đoàn viên</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  id="address"
                  type="text"
                  value={data.address || ""}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="hometown">Quê quán</label>
                <input
                  id="hometown"
                  type="text"
                  value={data.hometown || ""}
                  onChange={handleChange}
                  placeholder="Nhập quê quán"
                />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputContainer}>
                  <label htmlFor="ethnicity">Dân tộc</label>
                  <input
                    id="ethnicity"
                    type="text"
                    value={data.ethnicity || ""}
                    onChange={handleChange}
                    placeholder="Nhập dân tộc"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="religion">Tôn giáo</label>
                  <input
                    id="religion"
                    type="text"
                    value={data.religion || ""}
                    onChange={handleChange}
                    placeholder="Nhập tôn giáo"
                  />
                </div>
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="eduLevel">Trình độ học vấn</label>
                <input
                  id="eduLevel"
                  type="text"
                  value={data.eduLevel || ""}
                  onChange={handleChange}
                  placeholder="Nhập trình độ học vấn"
                />
              </div>
            </div>
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
