import React from 'react';
import styles from "./Login.module.css";
import { FaRegUser } from "react-icons/fa";
import { LuLock } from "react-icons/lu";
import { IoEyeOutline, IoEyeOffOutline  } from "react-icons/io5";


function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.container_login}>
        <div className={styles.container_login_form}>
          <p className={styles.form_title}>ĐĂNG NHẬP</p>
          <form onSubmit={() => alert(1)}>
            <label>Email hoặc số điện thoại</label>
            <div className={styles.input_field}>
              <FaRegUser size={20}/>
              <input type='text' placeholder='Nhập email hoặc số điện thoại' />
            </div>
            {/* <div className={styles.error}>Error!</div> */}

            <label>Mật khẩu</label>
            <div className={styles.input_field}>
              <LuLock size={20}/>
              <input type='password' placeholder='Nhập mật khẩu của bạn' />
              {1?(<IoEyeOutline size={20}/>):(<IoEyeOffOutline  size={20}/>)}
            </div>
            {/* <div className={styles.error}>Error!</div> */}

            <div className={styles.actions}>
              <button type='submit'>ĐĂNG NHẬP</button>
              <a href="#">Quên mật khẩu?</a>
            </div>

            <div className={styles.register}>
              Bạn chưa có tài khoản? <a href="#">Đăng ký ngay</a>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.container_image}></div>
    </div>
  );
}

export default Login;
