import React from "react";
import { FaRegUser } from "react-icons/fa";
import { LuLock } from "react-icons/lu";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import styles from "../Register/Register.module.css";

import { LuMail } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
function Register() {
  return (
    <>
  
      <div className={styles.container}>
        <div className={styles.container_login}>
          <div className={styles.container_login_form}>
            <p className={styles.form_title}>ĐĂNG KÝ</p>
            <form onSubmit={() => alert(1)}>
              <label>Họ và tên</label>
              <div className={styles.input_field}>
                <FaRegUser size={20} />
                <input type="text" placeholder="Nhập họ và tên của bạn" />
              </div>
              {/* <div className={styles.error}>Error!</div> */}
              <label>Email</label>
              <div className={styles.input_field}>
                <LuMail size={20} />

                <input type="text" placeholder="Nhập email của bạn" />
              </div>
              {/* <div className={styles.error}>Error!</div> */}
              <label>Số điện thoại</label>
              <div className={styles.input_field}>
                <FiPhone size={20} />
                <input
                  type="text"
                  placeholder="Nhập email hoặc số điện thoại"
                />
              </div>
              {/* <div className={styles.error}>Error!</div> */}
              <div className={styles.container_birthday_gender}>
                <div className={styles.container_birthday}>
                  <label>Ngày sinh</label> 
                  {/* Làm lại bằng input date cho dễ đi thắng à, ngu v tr */}
                  <div className={[styles.input_field, styles.birthday].join(' ')}>
                    <FaRegCalendarAlt size={20} />
                    <input
                      type="text"
                      placeholder="Ngày"
                      maxLength={2}
                    />/
                     <input
                      type="text"
                      placeholder="Tháng"
                      maxLength={2}
                    />/ <input
                    type="text"
                    placeholder="Năm"
                    maxLength={4}
                  />
                  </div>
                  {/* <div className={styles.error}>Error!</div> */}
                </div>
                <div className={styles.container_gender}>
                  <label>Giới tính</label>
                  <div className={[styles.input_field, styles.gender].join(' ')}>
                    <select>
                      <option label="Nam"/>
                      <option label="Nữ"/>
                    </select>
                    
                  </div>
                  {/* <div className={styles.error}>Error!</div> */}
                </div>
              </div>

              <label>Mật khẩu</label>
              <div className={styles.input_field}>
                <LuLock size={20} />
                <input type="password" placeholder="Nhập mật khẩu của bạn" />
                {1 ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
              </div>
              {/* <div className={styles.error}>Error!</div> */}
              <label>Mật khẩu</label>
              <div className={styles.input_field}>
                <LuLock size={20} />
                <input type="password" placeholder="Nhập mật khẩu của bạn" />
                {1 ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
              </div>
              {/* <div className={styles.error}>Error!</div> */}

              <div className={styles.actions}>
                <button type="submit">ĐĂNG KÝ</button>
              </div>

              <div className={styles.register}>
                Bạn đã tài khoản <a href="/">Đăng nhập ngay</a>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.container_image}></div>
      </div>
    </>
  );
}

export default Register;