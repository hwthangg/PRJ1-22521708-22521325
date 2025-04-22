import React, { useContext, useEffect } from "react";
import styles from "./Login.module.css";
import { FaRegUser } from "react-icons/fa";
import { LuLock } from "react-icons/lu";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";



function Login() {
  const {ROLE:{setRole}} = useContext(AuthContext)
  const [keyAuth, setKeyAuth] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate()

  const handleLogin = (e) =>{
    e.preventDefault()
    const credentials = {keyAuth: keyAuth, password: password}
   

    if(keyAuth == 'admin'){
      setRole('admin')
      navigate('/AdminDashboard')
    }
    else if(keyAuth == 'leader'){
      setRole('leader')
      navigate('/home')
    }


    
  }

  useEffect(()=>{
setRole('')
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.container_login}>
        <div className={styles.container_login_form}>
          <p className={styles.form_title}>ĐĂNG NHẬP</p>
          <form onSubmit={handleLogin}>
            <label>Email hoặc số điện thoại</label>
            <div className={styles.input_field}>
              <FaRegUser size={20} />
              <input
                type="text"
                placeholder="Nhập email hoặc số điện thoại"
                value={keyAuth}
                onChange={(e) => setKeyAuth(e.target.value)}
              />
            </div>
            {/* <div className={styles.error}>Error!</div> */}

            <label>Mật khẩu</label>
            <div className={styles.input_field}>
              <LuLock size={20} />
              <input
                type={!isVisiblePassword ? "text" : "password"}
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className={styles.toggle_password}
                onClick={() => setTogglePassword(!isVisiblePassword)}
              >
                {isVisiblePassword ? (
                  <IoEyeOutline size={20} />
                ) : (
                  <IoEyeOffOutline size={20} />
                )}
              </div>
            </div>
            {/* <div className={styles.error}>Error!</div> */}

            <div className={styles.actions}>
              <button type="submit">ĐĂNG NHẬP</button>
              <a href="#">Quên mật khẩu?</a>
            </div>

            <div className={styles.register}>
              Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.container_image}></div>
    </div>
  );
}

export default Login;
