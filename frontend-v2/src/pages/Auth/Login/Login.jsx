
import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../../assets/logo.webp";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../contexts/Auth.jsx";

export default function Login() {
  const [account, setAccount] = useState({
    email: "",
    password: "",

  });
const [togglePassword, setTogglePassword] = useState(false);
 const {login} = useAuth()
 const handleLogin = async () => {
  try {
    const form = {
      ...account,
    };

    
    if (!form.email.trim()) {
      return toast.error("Vui lòng nhập email");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return toast.error("Email không hợp lệ");
    }
   
    if (!form.password || form.password.length < 6) {
      return toast.error("Mật khẩu phải có ít nhất 6 nhập tự");
    }
    const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/auth/login`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    console.log(data)
    login(data.data)
    // Nếu mọi thứ hợp lệ
    console.log("Form to submit:", form);
    toast.success("Đăng nhập thành công");

    // TODO: gửi form đến server
  } catch (error) {
    console.error(error);
    toast.error("Đã có lỗi xảy ra");
  }
};


  const handleAccountChange = (key, value) => {
    setAccount((prev) => ({ ...prev, [key]: value }));
  };



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
            placeholder="Nhập email để đăng nhập"
            value={account.email}
            onChange={(e) => handleAccountChange("email", e.target.value)}
          />
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
            style={{ position: "absolute", right: 20, bottom: 12, cursor: "pointer" }}
          >
            {togglePassword ? <FiEyeOff color="#3c78d8" size={20} /> : <FiEye color="#3c78d8" size={20} />}
          </div>
        </div>

    

        <div className={styles.buttonContainer}>
          <button onClick={handleLogin}>Đăng nhập</button>
        </div>

        <div className={styles.hyperlink}>
          <p>Bạn chưa có tài khoản.</p>
          <NavLink to="/register">Đăng ký ngay</NavLink>
        </div>
      </div>
    </div>
  );
}
