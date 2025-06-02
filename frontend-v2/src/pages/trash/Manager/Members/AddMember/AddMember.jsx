import React, { useEffect, useState } from "react";
import styles from "./AddAccount.module.css";
import avatar from "../../../../assets/avatar.png";
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
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";

function AddMember({setOpen}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullname: "",
    birthday: "",
    gender: "",
    role: "",
    password: "",
    chapterId: "",
    cardId: "",
    position: "",
    joinedAt: "",
    address: "",
    hometown: "",
    ethnicity: "",
    religion: "",
    eduLevel: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState();
  const [togglePassword, setTogglePassword] = useState(true);
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/chapters/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setChapters(data.data.chapters);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chi đoàn:", error);
      }
    };

    fetchChapters();
  }, []);

  useEffect(() => {
    console.log("Chapters sau khi set:", chapters);
  }, [chapters]); // Theo dõi thay đổi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const RenderChapters = () => {
    return (
      <>
        {chapters.map((item) => (
          <>
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          </>
        ))}
      </>
    );
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: imageUrl, // để show ảnh preview
      }));
      setAvatarFile(file); // lưu file thật để gửi
    }
  };

  const handleCreateAccount = async () => {
    try {
      const formDataToSend = new FormData();

      // Thêm các trường text vào FormData (ngoại trừ avatar)
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "avatar") {
          formDataToSend.append(key, value);
        }
      });

      // Thêm file avatar thật (nếu có)
      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      }

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formDataToSend, // gửi multipart/form-data
      });

      const data = await res.json();
      console.log("Response:", data);
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <>
     <div
              style={{
          position: "absolute",
          zIndex: 1,
          display: "flex",
          backgroundColor: "rgb(70,96,170, 0.5)",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
              boxSizing: "border-box",
        }}
           >
             <div
              style={{
            width: "50%",
            backgroundColor: "white",
            borderRadius: "20px",

        
            position: "relative",
          }}
             >
               <div
                 style={{ position: "absolute", top: 5, right: 5 }}
                 onClick={() => setOpen(false)}
               >
                 <IoIosCloseCircle size={40} color="red" />
               </div>
               <div
                style={{
              overflowY: "auto",
              height: "600px",
              margin: "80px 10px 20px",
              padding: "5px 10px 20px",
            }}
               >
                 <div className={styles.wrapper}>
                   <div className={styles.formSection}>
                     <div
                       className={styles.formBox}
                       style={{ position: "relative" }}
                     >
                       <div
                         className={styles.fieldWrapper}
                         style={{
                           flexDirection: "column",
                           justifyContent: "center",
                           alignItems: "center",
                           gap: "10px",
                           border: "none",
                           height: "fit-content",
     
                           display: "flex",
                         }}
                       >
        <div className={styles.formSection}>
          <form className={styles.formBox} onSubmit={(e) => e.preventDefault()}>
            <div
              className={styles.fieldWrapper}
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                border: "none",
                height: "fit-content",
              }}
            >
              <img
                style={{
                  width: "160px",
                  aspectRatio: "1 / 1",
                  borderRadius: "100px",
                }}
                src={formData.avatar || avatar}
                alt="avatar"
              />
              <input
                className={styles.input}
                style={{ all: "unset", border: "1px solid", display: "none" }}
                type="file"
                accept="image/*"
                id="avatar"
                name="avatar"
                onChange={handleAvatarChange}
              />
             
                <label htmlFor="avatar"   style={{
                        border: "2px solid #0d47a1",
                        padding: "10px",
                        color: "#0d47a1", 
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}>
                  Chọn ảnh đại diện
                </label>
         
            </div>

            {/* Email */}
            <p className={styles.label}>Email</p>
            <div className={styles.fieldWrapper}>
              <MdEmail size={30} color="#0d47a1" />
              <input
                className={styles.input}
                type="email"
                placeholder="Nhập email đăng nhập"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <p className={styles.label}>Số điện thoại</p>
            <div className={styles.fieldWrapper}>
              <MdPhone size={30} color="#0d47a1" />
              <input
                className={styles.input}
                type="tel"
                placeholder="Nhập số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Fullname */}
            <p className={styles.label}>Họ và tên</p>
            <div className={styles.fieldWrapper}>
              <FaRegUser size={25} color="#0d47a1" />
              <input
                className={styles.input}
                type="text"
                placeholder="Nhập họ và tên"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "30px",
              }}
            >
              {/* Birthday */}
              <div style={{ flex: 1 }}>
                <p className={styles.label}>Ngày sinh</p>
                <div className={styles.fieldWrapper} style={{ paddingLeft: 0 }}>
                  <input
                    className={styles.input}
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Gender */}
              <div style={{ flex: 1 }}>
                <p className={styles.label}>Giới tính</p>
                <div className={styles.fieldWrapper}>
                  <select
                    name="gender"
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      color: "#0d47a1",
                    }}
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      -- Chọn giới tính --
                    </option>

                    <option value="Nam" defaultChecked>
                      Nam
                    </option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Password */}
            <p className={styles.label}>Mật khẩu</p>
            <div className={styles.fieldWrapper}>
              <LuLock size={30} color="#0d47a1" />
              <input
                className={styles.input}
                placeholder="Nhập mật khẩu của bạn"
                type={togglePassword ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className={styles.passwordToggle}
                onClick={() => setTogglePassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {togglePassword ? (
                  <LuEye size={25} color="#0d47a1" />
                ) : (
                  <LuEyeOff size={25} color="#0d47a1" />
                )}
              </div>
            </div>

            {/* Role */}
            <p className={styles.label}>Vai trò</p>
            <div className={styles.fieldWrapper}>
              <select
                name="role"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  color: "#0d47a1",
                }}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" disabled>
                  -- Chọn vai trò --
                </option>

                <option value="member">Đoàn viên</option>
                <option value="manager">Người quản lý chi đoàn</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </div>
            {formData.role == "member" ? (
              <>
                <>
                  <p className={styles.label}>Chi đoàn sinh hoạt</p>
                  <div className={styles.fieldWrapper}>
                    <select
                      name="chapterId"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        color: "#0d47a1",
                      }}
                      value={formData.chapterId}
                      onChange={handleChange}
                    >
                      <option value="">Chọn chi đoàn</option>
                      <RenderChapters />
                    </select>
                  </div>

                  {/* CardId */}
                  <p className={styles.label}>Số thẻ đoàn</p>
                  <div className={styles.fieldWrapper}>
                    <FaIdCard size={30} color="#0d47a1" />
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Nhập số thẻ đoàn"
                      name="cardId"
                      value={formData.cardId}
                      onChange={handleChange}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",

                      justifyContent: "space-between",
                      gap: "30px",
                    }}
                  >
                    {/* Position */}
                    <div style={{ flex: 1 }}>
                      <p className={styles.label}>Chức vụ</p>
                      <div className={styles.fieldWrapper}>
                        <FaUserTag size={30} color="#0d47a1" />
                        <select
                          name="position"
                          style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            paddingLeft: "9px",
                            color: "#0d47a1",
                          }}
                          value={formData.position}
                          onChange={handleChange}
                        >
                           <option value="" disabled>-- Chọn chức vụ --</option>
                          <option value="Đoàn viên">Đoàn viên</option>
                          <option value="Phó Bí thư">Phó Bí thư</option>
                          <option value="Bí thư">Bí thư</option>
                        </select>
                      </div>
                    </div>

                    {/* JoinedAt */}
                    <div style={{ flex: 1 }}>
                      <p className={styles.label}>Ngày vào đoàn</p>
                      <div
                        className={styles.fieldWrapper}
                        style={{ paddingLeft: 0 }}
                      >
                        <input
                          className={styles.input}
                          type="date"
                          name="joinedAt"
                          value={formData.joinedAt}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <p className={styles.label}>Địa chỉ</p>
                  <div className={styles.fieldWrapper}>
                    <FaHouseUser size={30} color="#0d47a1" />
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Nhập địa chỉ"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Hometown */}
                  <p className={styles.label}>Quê quán</p>
                  <div className={styles.fieldWrapper}>
                    <MdOutlineFamilyRestroom size={30} color="#0d47a1" />
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Nhập quê quán"
                      name="hometown"
                      value={formData.hometown}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Ethnicity */}
                  <p className={styles.label}>Dân tộc</p>
                  <div className={styles.fieldWrapper}>
                    <FaUsers size={25} color="#0d47a1" />
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Nhập dân tộc"
                      name="ethnicity"
                      value={formData.ethnicity}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Religion */}
                  <p className={styles.label}>Tôn giáo</p>
                  <div className={styles.fieldWrapper}>
                    <FaUserFriends size={25} color="#0d47a1" />
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Nhập tôn giáo"
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                    />
                  </div>

                  {/* EduLevel */}
                  <p className={styles.label}>Trình độ học vấn</p>
                  <div className={styles.fieldWrapper}>
                    <FaBook size={25} color="#0d47a1" />
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Nhập trình độ học vấn"
                      name="eduLevel"
                      value={formData.eduLevel}
                      onChange={handleChange}
                    />
                  </div>
                </>
              </>
            ) : (
              <></>
            )}
            {formData.role == "manager" ? (
              <>
                <p className={styles.label}>Chi đoàn quản lý</p>
                <div className={styles.fieldWrapper}>
                  <select
                    name="chapterId"
                    style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            color: "#0d47a1",
                          }}
                    value={formData.chapterId}
                    onChange={handleChange}
                  >
                    <option value="">Chọn chi đoàn</option>
                    <RenderChapters
                      key={formData.chapterId}
                      setKey={handleChange}
                    />
                  </select>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* ChapterId */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                flexDirection: "column",
              }}
            >
              <button
                className={styles.submitBtn}
                type="submit"
                onClick={handleCreateAccount}
              >
                <p className={styles.submitText}>Tạo tài khoản</p>
              </button>
             
            </div>
          </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>

      
      </div>
    </>
  );
}

export default AddMember;
