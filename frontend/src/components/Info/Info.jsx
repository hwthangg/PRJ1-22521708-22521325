import React, { useState } from 'react';
import styles from './Info.module.css';
import defaultAvatar from '../../assets/avatar_icon.png'; 

const Info = ({ onClose }) => {
  const [avatar, setAvatar] = useState(defaultAvatar); 

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click(); 
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.avatar} onClick={handleAvatarClick}>
          <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        </div>
        <button className={styles.close} onClick={onClose}>×</button>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.inputGroup}>
          <label>Số thẻ đoàn</label>
          <input type="text" defaultValue="000011110000" />
        </div>
        <div className={styles.inputGroup}>
          <label>Họ tên đoàn viên</label>
          <input type="text" defaultValue="Đặng Hữu Thắng" />
        </div>
        <div className={styles.inputGroup}>
          <label>Ngày sinh</label>
          <input type="date" defaultValue="2004-10-25" />
        </div>
        <div className={styles.inputGroup}>
          <label>Giới tính</label>
          <select defaultValue="Nam">
            <option>Nam</option>
            <option>Nữ</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Quê quán</label>
          <input type="text" defaultValue="Nam Định" />
        </div>
        <div className={styles.inputGroup}>
          <label>Dân tộc</label>
          <input type="text" defaultValue="Không" />
        </div>
        <div className={styles.inputGroup}>
          <label>Tôn giáo</label>
          <input type="text" defaultValue="Không" />
        </div>
        <div className={styles.inputGroup}>
          <label>Trình độ học vấn</label>
          <input type="text" defaultValue="Không" />
        </div>
        <div className={styles.inputGroup}>
          <label>Ngày vào đoàn</label>
          <input type="date" defaultValue="2004-10-25" />
        </div>
        <div className={styles.inputGroup}>
          <label>Chức vụ</label>
          <select defaultValue="Đoàn viên">
            <option>Đoàn viên</option>
            <option>Bí thư</option>
            <option>Phó bí thư</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input type="email" defaultValue="dht@gmail.com" />
        </div>
        <div className={styles.inputGroup}>
          <label>Số điện thoại</label>
          <input type="text" defaultValue="0123456789" />
        </div>
      </div>

      <div className={styles.addressGroup}>
        <label>Địa chỉ liên lạc</label>
        <textarea defaultValue="11/4 đường Trần Quang Khải, khu phố Đông B, phường Đông Hòa, thành phố Dĩ An, tỉnh Bình Dương" />
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.update}>Cập nhật thông tin đoàn viên</button>
        <button className={styles.delete}>Xóa đoàn viên</button>
      </div>

      {/* Hidden file input */}
      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        style={{ display: 'none' }} 
      />
    </div>
  );
};

export default Info;
