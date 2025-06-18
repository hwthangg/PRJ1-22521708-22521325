import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import logo from "../../../assets/logo.webp";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate()
  const [account, setAccount] = useState({
    email: "",
    phone: "",
    fullname: "",
    birthday: "",
    gender: "",
    password: "",
    role: "",
  });

  const [chapters, setChapters] = useState([]);
  const [roleInfo, setRoleInfo] = useState({
    managerOf:"",
    memberOf: "",
    cardCode: "",
    position: "",
    address: "",
    hometown: "",
    ethnicity: "",
    religion: "",
    eduLevel: "",
    joinedAt: "",
  });
  const [togglePassword, setTogglePassword] = useState(false);

  const handleRegister = async () => {
    try {
      const form = {
        ...account,
        ...roleInfo,
      };

      // Validate từng field
      {
        if (!form.fullname.trim()) {
          return toast.error("Vui lòng nhập họ tên");
        }
        if (!form.email.trim()) {
          return toast.error("Vui lòng nhập email");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
          return toast.error("Email không hợp lệ");
        }
        if (!form.phone.trim()) {
          return toast.error("Vui lòng nhập số điện thoại");
        }
        const phoneRegex = /^(0|\+84)\d{9}$/;
        if (!phoneRegex.test(form.phone)) {
          return toast.error("Số điện thoại không hợp lệ");
        }
        if (!form.password || form.password.length < 6) {
          return toast.error("Mật khẩu phải có ít nhất 6 ký tự");
        }
        if (!form.birthday) {
          return toast.error("Vui lòng chọn ngày sinh");
        }
        if (!form.gender) {
          return toast.error("Vui lòng chọn giới tính");
        }

        // Validate theo role
        if (form.role === "manager") {
          if (!form.managerOf.trim()) {
            return toast.error("Vui lòng chọn chi đoàn quản lý");
          }
        } else if (form.role === "member") {
          if (!form.memberOf.trim()) {
            return toast.error("Vui lòng chọn chi đoàn tham gia");
          }
          if (!form.cardCode.trim()) {
            return toast.error("Vui lòng nhập mã thẻ đoàn");
          }
          if (!form.position.trim()) {
            return toast.error("Vui lòng chọn chức vụ");
          }
          if (!form.address.trim()) {
            return toast.error("Vui lòng nhập địa chỉ");
          }
          if (!form.hometown.trim()) {
            return toast.error("Vui lòng nhập quê quán");
          }
          if (!form.ethnicity.trim()) {
            return toast.error("Vui lòng nhập dân tộc");
          }
          if (!form.religion.trim()) {
            return toast.error("Vui lòng nhập tôn giáo");
          }
          if (!form.eduLevel.trim()) {
            return toast.error("Vui lòng nhập trình độ học vấn");
          }
        }
      }
 console.log("Form to submit:", JSON.stringify({ account, roleInfo }));
      // Nếu mọi thứ hợp lệ
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ account, roleInfo }),
        }
      );
      const data = await res.json();
      console.log(data);

      if(data.success){
         navigate('/')
             toast.success("Đăng ký thành công");
      }

     
  
     
      // TODO: gửi form đến server
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi xảy ra");
    }
  };

  const handleAccountChange = (key, value) => {
    setAccount((prev) => ({ ...prev, [key]: value }));
  };

  const handleRoleInfoChange = (key, value) => {
    setRoleInfo((prev) => ({ ...prev, [key]: value }));
  };
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
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={logo} />
        <p>HỆ THỐNG QUẢN LÝ ĐOÀN VIÊN</p>
      </div>
      <div className={styles.formContainer}>
        {/* Tài khoản chung */}
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Nhập email để đăng ký"
            value={account.email}
            onChange={(e) => handleAccountChange("email", e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="text"
            id="phone"
            placeholder="Nhập số điện thoại"
            value={account.phone}
            onChange={(e) => handleAccountChange("phone", e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="fullname">Họ và tên</label>
          <input
            type="text"
            id="fullname"
            placeholder="Nhập họ và tên"
            value={account.fullname}
            onChange={(e) => handleAccountChange("fullname", e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <label htmlFor="birthday">Ngày sinh</label>
            <input
              type="date"
              id="birthday"
              value={account.birthday}
              onChange={(e) => handleAccountChange("birthday", e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="gender">Giới tính</label>
            <div className={styles.inputSelect}>
              <select
                id="gender"
                value={account.gender}
                onChange={(e) => handleAccountChange("gender", e.target.value)}
              >
                <option  value="" disabled>
                    Chọn giới tính
                  </option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.inputContainer} style={{ position: "relative" }}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type={togglePassword ? "text" : "password"}
            id="password"
            placeholder="Nhập mật khẩu"
            value={account.password}
            onChange={(e) => handleAccountChange("password", e.target.value)}
            style={{ paddingRight: 60 }}
          />
          <div
            onClick={() => setTogglePassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: 20,
              bottom: 12,
              cursor: "pointer",
            }}
          >
            {togglePassword ? (
              <FiEyeOff color="#3c78d8" size={20} />
            ) : (
              <FiEye color="#3c78d8" size={20} />
            )}
          </div>
        </div>

        {/* Vai trò */}
        <div className={styles.inputContainer}>
          <label htmlFor="role">Chọn vai trò</label>
          <div className={styles.inputSelect}>
            <select
              id="role"
              value={account.role}
              onChange={(e) => handleAccountChange("role", e.target.value)}
            >
              <option  value="" disabled>
                    Chọn vai trò
                  </option>
              <option value="manager">Quản lý chi đoàn</option>
              <option value="member">Đoàn viên</option>
            </select>
          </div>
        </div>

        {/* Quản lý chi đoàn */}
        {account.role === "manager" && (
          <div className={styles.inputContainer}>
            <label htmlFor="managerOf">Chi đoàn quản lý</label>
            <div className={styles.inputSelect}>
              <select
                id="managerOf"
                value={roleInfo.managerOf}
                onChange={(e) =>
                  handleRoleInfoChange("managerOf", e.target.value)
                }
              > <option  value="" disabled>
                    Chọn chi đoàn quản lý
                  </option>
                {chapters.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Thông tin đoàn viên */}
        {account.role === "member" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className={styles.inputContainer}>
              <label htmlFor="memberOf">Chi đoàn sinh hoạt</label>
              <div className={styles.inputSelect}>
                <select
                  id="memberOf"
                  value={roleInfo.memberOf}
                  onChange={(e) =>
                    handleRoleInfoChange("memberOf", e.target.value)
                  }
                >
                  <option  value="" disabled>
                    Chọn chi đoàn sinh hoạt
                  </option>
                   {chapters.map((item, index) => (
                  <option key={index} value={item.value}>
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
                  type="text"
                  id="cardCode"
                  placeholder="Nhập số thẻ đoàn"
                  value={roleInfo.cardCode}
                  onChange={(e) =>
                    handleRoleInfoChange("cardCode", e.target.value)
                  }
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="joinedAt">Ngày vào đoàn</label>
                <input
                  type="date"
                  id="joinedAt"
                  value={roleInfo.joinedAt}
                  onChange={(e) =>
                    handleRoleInfoChange("joinedAt", e.target.value)
                  }
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="position">Chức vụ</label>
              <div className={styles.inputSelect}>
                <select
                  id="position"
                  value={roleInfo.position}
                  onChange={(e) =>
                    handleRoleInfoChange("position", e.target.value)
                  }
                >
                  <option  value="" disabled>
                    Chọn chức vụ
                  </option>
                  <option value="secretary">Bí thư</option>
                  <option value="deputy_secretary">Phó Bí thư</option>
                  <option value="committee_member">Ủy viên BCH</option>
                  <option value="member">Đoàn viên</option>
                </select>
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                id="address"
                placeholder="Nhập địa chỉ"
                value={roleInfo.address}
                onChange={(e) =>
                  handleRoleInfoChange("address", e.target.value)
                }
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="hometown">Quê quán</label>
              <input
                type="text"
                id="hometown"
                placeholder="Nhập quê quán"
                value={roleInfo.hometown}
                onChange={(e) =>
                  handleRoleInfoChange("hometown", e.target.value)
                }
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputContainer}>
                <label htmlFor="ethnicity">Dân tộc</label>
                <input
                  type="text"
                  id="ethnicity"
                  placeholder="Nhập dân tộc"
                  value={roleInfo.ethnicity}
                  onChange={(e) =>
                    handleRoleInfoChange("ethnicity", e.target.value)
                  }
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="religion">Tôn giáo</label>
                <input
                  type="text"
                  id="religion"
                  placeholder="Nhập tôn giáo"
                  value={roleInfo.religion}
                  onChange={(e) =>
                    handleRoleInfoChange("religion", e.target.value)
                  }
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="eduLevel">Trình độ học vấn</label>
              <input
                type="text"
                id="eduLevel"
                placeholder="Nhập trình độ học vấn"
                value={roleInfo.eduLevel}
                onChange={(e) =>
                  handleRoleInfoChange("eduLevel", e.target.value)
                }
              />
            </div>
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button onClick={handleRegister}>Đăng ký</button>
        </div>

        <div className={styles.hyperlink}>
          <p>Bạn đã có tài khoản.</p>
          <NavLink to="/">Đăng nhập ngay</NavLink>
        </div>
      </div>
    </div>
  );
}
