import React, { useEffect, useState } from "react";
import {
  FaIdCard,
  FaBook,
  FaHouseUser,
  FaRegUser,
  FaUserFriends,
  FaUsers,
  FaUserTag,
} from "react-icons/fa";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { MdEmail, MdOutlineFamilyRestroom, MdPhone } from "react-icons/md";
import banner from "../../../assets/banner.png";
import avatar from "../../../assets/avatar.png";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [avatarFile, setAvatarFile] = useState();
  const [togglePassword, setTogglePassword] = useState(true);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/chapters/all", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setChapters(data.data.chapters);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chi đoàn:", error);
      }
    };
    fetchChapters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const RenderChapters = () =>
    chapters.map((item) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ));

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatar: file }));
      setAvatarFile(imageUrl);
    }
  };

  const handleRegister = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await res.json();
      console.log("Response:", data);
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.registerForm}>
          {/* Avatar Section */}
          <div className={styles.avatarSection}>
            <img
              src={avatarFile || avatar}
              alt="avatar"
              className={styles.avatarImage}
            />
            <input
              type="file"
              accept="image/*"
              id="avatar"
              name="avatar"
              onChange={handleAvatarChange}
              className={styles.avatarInput}
            />
            <div className={styles.avatarButton}>
              <label htmlFor="avatar" style={{ cursor: "pointer" }}>
                Chọn ảnh đại diện
              </label>
            </div>
          </div>

          {/* Email Field */}
          <p className={styles.inputLabel}>Email</p>
          <div className={styles.inputContainer}>
            <MdEmail size={30} color="#0d47a1" />
            <input
              type="email"
              placeholder="Nhập email đăng nhập"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          {/* Phone Field */}
          <p className={styles.inputLabel}>Số điện thoại</p>
          <div className={styles.inputContainer}>
            <MdPhone size={30} color="#0d47a1" />
            <input
              type="tel"
              placeholder="Nhập số điện thoại"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          {/* Fullname Field */}
          <p className={styles.inputLabel}>Họ và tên</p>
          <div className={styles.inputContainer}>
            <FaRegUser size={25} color="#0d47a1" />
            <input
              type="text"
              placeholder="Nhập họ và tên"
              name="fullname"
              value={formData.fullname || ''}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          {/* Birthday and Gender Row */}
          <div className={styles.rowContainer}>
            {/* Birthday Field */}
            <div className={styles.column}>
              <p className={styles.inputLabel}>Ngày sinh</p>
              <div className={styles.inputContainer}>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday || ''}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>
            </div>

            {/* Gender Field */}
            <div className={styles.column}>
              <p className={styles.inputLabel}>Giới tính</p>
              <div className={styles.inputContainer}>
                <select
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleChange}
                  className={styles.selectField}
                >
                  <option value="" disabled>Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <p className={styles.inputLabel}>Mật khẩu</p>
          <div className={styles.inputContainer}>
            <LuLock size={30} color="#0d47a1" />
            <input
              placeholder="Nhập mật khẩu của bạn"
              type={togglePassword ? "password" : "text"}
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
              className={styles.inputField}
            />
            <div 
              onClick={() => setTogglePassword((prev) => !prev)}
              className={styles.passwordToggle}
            >
              {togglePassword ? (
                <LuEye size={25} color="#0d47a1" />
              ) : (
                <LuEyeOff size={25} color="#0d47a1" />
              )}
            </div>
          </div>

          {/* Role Field */}
          <p className={styles.inputLabel}>Vai trò</p>
          <div className={styles.inputContainer}>
            <select
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
              className={styles.selectField}
            >
              <option value="" disabled>Chọn vai trò</option>
              <option value="member">Đoàn viên</option>
              <option value="manager">Quản lý</option>
            </select>
          </div>

          {/* Member-specific fields */}
          {formData.role === "member" ? (
            <>
              <p className={styles.inputLabel}>Chi đoàn sinh hoạt</p>
              <div className={styles.inputContainer}>
                <select
                  name="chapterId"
                  value={formData.chapterId || ''}
                  onChange={handleChange}
                  className={styles.selectField}
                >
                  <option value="" disabled>Chọn chi đoàn</option>
                  <RenderChapters />
                </select>
              </div>

              <p className={styles.inputLabel}>Số thẻ đoàn viên</p>
              <div className={styles.inputContainer}>
                <FaIdCard size={25} color="#0d47a1" />
                <input
                  type="text"
                  placeholder="Nhập số thẻ đoàn viên"
                  name="cardId"
                  value={formData.cardId || ''}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.rowContainer}>
                <div className={styles.column}>
                  <p className={styles.inputLabel}>Chức vụ</p>
                  <div className={styles.inputContainer}>
                    <FaUserTag size={25} color="#0d47a1" />
                    <select
                      name="position"
                      value={formData.position || ''}
                      onChange={handleChange}
                      className={styles.selectField}
                    >
                      <option value="" disabled>Chọn chức vụ</option>
                      <option value="Bí thư">Bí thư</option>
                      <option value="Phó Bí thư">Phó Bí thư</option>
                      <option value="Ủy viên BCH">Ủy viên BCH</option>
                      <option value="Đoàn viên">Đoàn viên</option>
                    </select>
                  </div>
                </div>

                <div className={styles.column}>
                  <p className={styles.inputLabel}>Ngày vào đoàn</p>
                  <div className={styles.inputContainer}>
                    <input
                      type="date"
                      name="joinedAt"
                      value={formData.joinedAt || ''}
                      onChange={handleChange}
                      className={styles.inputField}
                    />
                  </div>
                </div>
              </div>

              <p className={styles.inputLabel}>Địa chỉ</p>
              <div className={styles.inputContainer}>
                <FaHouseUser size={25} color="#0d47a1" />
                <input
                  type="text"
                  placeholder="Nhập địa chỉ"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              <p className={styles.inputLabel}>Quê quán</p>
              <div className={styles.inputContainer}>
                <FaUsers size={25} color="#0d47a1" />
                <input
                  type="text"
                  placeholder="Nhập quê quán"
                  name="hometown"
                  value={formData.hometown || ''}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              <p className={styles.inputLabel}>Dân tộc</p>
              <div className={styles.inputContainer}>
                <FaUserFriends size={25} color="#0d47a1" />
                <input
                  type="text"
                  placeholder="Nhập dân tộc"
                  name="ethnicity"
                  value={formData.ethnicity || ''}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              <p className={styles.inputLabel}>Tôn giáo</p>
              <div className={styles.inputContainer}>
                <MdOutlineFamilyRestroom size={25} color="#0d47a1" />
                <input
                  type="text"
                  placeholder="Nhập tôn giáo"
                  name="religion"
                  value={formData.religion || ''}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              <p className={styles.inputLabel}>Trình độ học vấn</p>
              <div className={styles.inputContainer}>
                <FaBook size={25} color="#0d47a1" />
                <input
                  type="text"
                  placeholder="Nhập trình độ học vấn"
                  name="eduLevel"
                  value={formData.eduLevel || ''}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>
            </>
          ) : (
            <>
              <p className={styles.inputLabel}>Chi đoàn quản lý</p>
              <div className={styles.inputContainer}>
                <select
                  name="chapterId"
                  value={formData.chapterId || ''}
                  onChange={handleChange}
                  className={styles.selectField}
                >
                  <option value="" disabled>Chọn chi đoàn</option>
                  <RenderChapters />
                </select>
              </div>
            </>
          )}

          {/* Register Button */}
          <button
            onClick={handleRegister}
            type="submit"
            className={styles.registerButton}
          >
            Đăng ký
          </button>

          {/* Login Link */}
          <NavLink to="/" className={styles.loginLink}>
            Đã có tài khoản? <ins>Đăng nhập ngay</ins>
          </NavLink>
        </div>
      </div>

      {/* Banner Section */}
      <div className={styles.bannerContainer}>
        <img src={banner} alt="Banner" className={styles.bannerImage} />
      </div>
    </div>
  );
}

export default Register;