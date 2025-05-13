import React, { useState, useRef } from 'react';
import styles from './FormAddmember.module.css';

const FormAddmember = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [birthDateFocused, setBirthDateFocused] = useState(false);
  const [joinDateFocused, setJoinDateFocused] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setAvatar(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.content}>
          <div className={styles.avatar}>
            <div
              className={styles.avatarCircle}
              onClick={handleAvatarClick}
              style={{ backgroundImage: avatar ? `url(${avatar})` : 'none' }}
            >
              {!avatar && <span className={styles.cameraIcon}>📷</span>}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          <div className={styles.form}>
            <div className={styles.row}>
              <input type="text" placeholder="Số thẻ đoàn" />
              <input type="text" placeholder="Họ tên đoàn viên" />
              <input
                type={birthDateFocused ? "date" : "text"}
                placeholder="Ngày sinh"
                onFocus={() => setBirthDateFocused(true)}
                onBlur={(e) => {
                  if (!e.target.value) setBirthDateFocused(false);
                }}
              />
              <select>
                <option value="">Giới tính</option>
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
              </select>
            </div>

            <div className={styles.row}>
              <input type="text" placeholder="Quê quán" />
              <input type="text" placeholder="Dân tộc" />
              <input type="text" placeholder="Tôn giáo" />
              <input type="text" placeholder="Trình độ học vấn" />
            </div>

            <div className={styles.row}>
              <input type="text" placeholder="Chức vụ" />
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Số điện thoại" />
              <input
                type={joinDateFocused ? "date" : "text"}
                placeholder="Ngày vào đoàn"
                onFocus={() => setJoinDateFocused(true)}
                onBlur={(e) => {
                  if (!e.target.value) setJoinDateFocused(false);
                }}
              />
            </div>

            <div className={styles.row}>
              <textarea placeholder="Địa chỉ liên lạc" rows="2" />
            </div>

            <div className={styles.buttonWrapper}>
              <button className={styles.addButton}>Thêm đoàn viên</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddmember;
