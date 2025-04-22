import React from 'react';
import styles from './TestPage.module.css';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { MdArrowDropDown } from 'react-icons/md';

function TestPage() {
  return (
    <div className={styles.container}>
      <div className={styles.form_wrapper}>
        <div className={styles.title}>ĐĂNG KÝ</div>
        <form className={styles.form_grid}>
          {/* Họ tên */}
          <div className={styles.field_group}>
            <label className={styles.label}>Họ tên</label>
            <div className={styles.input_wrapper}>
              <FaUser />
              <input type="text" placeholder="Nhập họ tên của bạn" />
            </div>
            <div className={styles.error}>Error!</div>
          </div>

          {/* Ngày sinh */}
          <div className={styles.field_group}>
            <label className={styles.label}>Ngày sinh</label>
            <div className={styles.input_wrapper}>
              <AiOutlineCalendar />
              <input type="text" placeholder="DD/MM/YYYY" />
            </div>
            <div className={styles.error}>Error!</div>
          </div>

          {/* Email */}
          <div className={styles.field_group}>
            <label className={styles.label}>Email</label>
            <div className={styles.input_wrapper}>
              <FaEnvelope />
              <input type="email" placeholder="Nhập email của bạn" />
            </div>
            <div className={styles.error}>Error!</div>
          </div>

          {/* Số điện thoại */}
          <div className={styles.field_group}>
            <label className={styles.label}>Số điện thoại</label>
            <div className={styles.input_wrapper}>
              <FaPhone />
              <input type="tel" placeholder="Nhập số điện thoại của bạn" />
            </div>
            <div className={styles.error}>Error!</div>
          </div>

          {/* Mật khẩu */}
          <div className={styles.field_group}>
            <label className={styles.label}>Mật khẩu</label>
            <div className={styles.input_wrapper}>
              <FaLock />
              <input type="password" placeholder="Nhập mật khẩu của bạn" />
            </div>
            <div className={styles.error}>Error!</div>
          </div>

          {/* Xác nhận lại mật khẩu */}
          <div className={styles.field_group}>
            <label className={styles.label}>Xác nhận lại mật khẩu</label>
            <div className={styles.input_wrapper}>
              <FaLock />
              <input type="password" placeholder="Xác nhận lại mật khẩu" />
              <BsEye />
            </div>
            <div className={styles.error}>Error!</div>
          </div>

          {/* Giới tính */}
          <div className={styles.field_group}>
            <label className={styles.label}>Giới tính</label>
            <div className={styles.input_wrapper}>
              <select>
                <option>Giới tính</option>
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
              </select>
              <MdArrowDropDown />
            </div>
          </div>
        </form>

        <div className={styles.button_wrapper}>
          <button type="submit">ĐĂNG KÝ</button>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
