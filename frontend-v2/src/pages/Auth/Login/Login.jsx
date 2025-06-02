import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import banner from "../../../assets/banner.png";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(true);

  const handleLogin = async () => {
    console.log(JSON.stringify({ email, password }));
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      
      const data = await res.json();
      console.log(data);

      // if(data.data.role == 'admin'){
      //   navigate('/admin/accounts')
      // }
      // if(data.data.role == 'manager'){
      //   navigate('/manager/news')
      // }

      if(data.success){navigate('/qldv')}
      
    } catch (error) {
      toast.error('Có lỗi xảy ra')
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.loginForm}>
          <p className={styles.inputLabel}>Email</p>
          <div className={styles.inputContainer}>
            <FaRegUser size={25} color="#0d47a1" />
            <input
              type="text"
              placeholder="Nhập email đăng nhập"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
          </div>

          <p className={styles.inputLabel}>Mật khẩu</p>
          <div className={styles.inputContainer}>
            <LuLock size={35} color="#0d47a1" />
            <input
              placeholder="Nhập mật khẩu của bạn"
              type={togglePassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
            <div 
              className={styles.passwordToggle}
              onClick={() => setTogglePassword((prev) => !prev)}
            >
              {togglePassword ? (
                <LuEye size={25} color="#0d47a1" />
              ) : (
                <LuEyeOff size={25} color="#0d47a1" />
              )}
            </div>
          </div>

          <div className={styles.actionContainer}>
            <div 
              onClick={handleLogin}
              className={styles.loginButton}
            >
              <p className={styles.loginButtonText}>ĐĂNG NHẬP</p>
            </div>
            <NavLink
              to="/"
              className={styles.forgotPassword}
            >
              <p>Quên mật khẩu?</p>
            </NavLink>
          </div>

          <div className={styles.registerPrompt}>
            <span>Bạn chưa có tài khoản?</span>
            <NavLink
              to="/register"
              className={styles.registerLink}
            >
              <p>Đăng ký ngay</p>
            </NavLink>
          </div>
        </div>
      </div>

      <div className={styles.bannerContainer}>
        <img
          src={banner}
          alt="Banner"
          className={styles.bannerImage}
        />
      </div>
    </div>
  );
}

export default Login;