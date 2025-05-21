// import React, { useState } from 'react';
// import styles from './Info.module.css';
// import defaultAvatar from '../../assets/avatar_icon.png'; 

// const Info = ({ onClose }) => {
//   const [avatar, setAvatar] = useState(defaultAvatar); 

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatar(reader.result); 
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAvatarClick = () => {
//     document.getElementById('avatarInput').click(); 
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.header}>
//         <div className={styles.avatar} onClick={handleAvatarClick}>
//           <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
//         </div>
//         <button className={styles.close} onClick={onClose}>×</button>
//       </div>

//       <div className={styles.infoGrid}>
//         <div className={styles.inputGroup}>
//           <label>Số thẻ đoàn</label>
//           <input type="text" defaultValue="000011110000" />
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Họ tên đoàn viên</label>
//           <input type="text" defaultValue="Đặng Hữu Thắng" />
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Ngày sinh</label>
//           <input type="date" defaultValue="2004-10-25" />
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Giới tính</label>
//           <select defaultValue="Nam">
//             <option>Nam</option>
//             <option>Nữ</option>
//           </select>
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Quê quán</label>
//           <input type="text" defaultValue="Nam Định" />
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Dân tộc</label>
//           <input type="text" defaultValue="Không" />
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Tôn giáo</label>
//           <input type="text" defaultValue="Không" />
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Trình độ học vấn</label>
//           <input type="text" defaultValue="Không" />
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Ngày vào đoàn</label>
//           <input type="date" defaultValue="2004-10-25" />
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Chức vụ</label>
//           <select defaultValue="Đoàn viên">
//             <option>Đoàn viên</option>
//             <option>Bí thư</option>
//             <option>Phó bí thư</option>
//           </select>
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Email</label>
//           <input type="email" defaultValue="dht@gmail.com" />
//         </div>
//         <div className={styles.inputGroup}>
//           <label>Số điện thoại</label>
//           <input type="text" defaultValue="0123456789" />
//         </div>
//       </div>

//       <div className={styles.addressGroup}>
//         <label>Địa chỉ liên lạc</label>
//         <textarea defaultValue="11/4 đường Trần Quang Khải, khu phố Đông B, phường Đông Hòa, thành phố Dĩ An, tỉnh Bình Dương" />
//       </div>

//       <div className={styles.buttonGroup}>
//         <button className={styles.update}>Cập nhật thông tin đoàn viên</button>
//         <button className={styles.delete}>Xóa đoàn viên</button>
//       </div>

//       {/* Hidden file input */}
//       <input
//         id="avatarInput"
//         type="file"
//         accept="image/*"
//         onChange={handleAvatarChange}
//         style={{ display: 'none' }} 
//       />
//     </div>
//   );
// };

// export default Info;
import React, { useState, useEffect } from 'react';
import styles from './Info.module.css';
import defaultAvatar from '../../assets/avatar_icon.png'; 

const Info = ({ data, onClose, onUpdate, onDelete }) => {

  const [avatar, setAvatar] = useState(defaultAvatar);


  const [memberInfo, setMemberInfo] = useState({
    soTheDoan: '',
    hoTen: '',
    ngaySinh: '',
    gioiTinh: '',
    queQuan: '',
    danToc: '',
    tonGiao: '',
    trinhDoHocVan: '',
    ngayVaoDoan: '',
    chucVu: '',
    email: '',
    soDienThoai: '',
    diaChiLienLac: '',
  });


  useEffect(() => {
    if (data) {
      setAvatar(data.avatar || defaultAvatar);
      setMemberInfo({
        soTheDoan: data.soTheDoan || '',
        hoTen: data['Họ và tên'] || '',
        ngaySinh: data['Ngày sinh'] ? formatDateForInput(data['Ngày sinh']) : '',
        gioiTinh: data['Giới tính'] || '',
        queQuan: data['Quê quán'] || '',
        danToc: data['Dân tộc'] || '',
        tonGiao: data['Tôn giáo'] || '',
        trinhDoHocVan: data['Trình độ học vấn'] || '',
        ngayVaoDoan: data['Ngày vào đoàn'] ? formatDateForInput(data['Ngày vào đoàn']) : '',
        chucVu: data['Chức vụ'] || '',
        email: data['Email'] || '',
        soDienThoai: data['Số điện thoại'] || '',
        diaChiLienLac: data['Địa chỉ liên lạc'] || '',
      });
    }
  }, [data]);


  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    if (dateString.includes('/')) {
      const parts = dateString.split('/');
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateString; 
  };


  const formatDateForOutput = (dateString) => {
    if (!dateString) return '';
    if (dateString.includes('-')) {
      const parts = dateString.split('-');
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleUpdate = () => {

    const updatedData = {
      ...data,
      avatar,
      soTheDoan: memberInfo.soTheDoan,
      'Họ và tên': memberInfo.hoTen,
      'Ngày sinh': formatDateForOutput(memberInfo.ngaySinh),
      'Giới tính': memberInfo.gioiTinh,
      'Quê quán': memberInfo.queQuan,
      'Dân tộc': memberInfo.danToc,
      'Tôn giáo': memberInfo.tonGiao,
      'Trình độ học vấn': memberInfo.trinhDoHocVan,
      'Ngày vào đoàn': formatDateForOutput(memberInfo.ngayVaoDoan),
      'Chức vụ': memberInfo.chucVu,
      'Email': memberInfo.email,
      'Số điện thoại': memberInfo.soDienThoai,
      'Địa chỉ liên lạc': memberInfo.diaChiLienLac,
    };
    if (onUpdate) onUpdate(updatedData);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(data.id);
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
          <input
            type="text"
            name="soTheDoan"
            value={memberInfo.soTheDoan}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Họ tên đoàn viên</label>
          <input
            type="text"
            name="hoTen"
            value={memberInfo.hoTen}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Ngày sinh</label>
          <input
            type="date"
            name="ngaySinh"
            value={memberInfo.ngaySinh}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Giới tính</label>
          <select
            name="gioiTinh"
            value={memberInfo.gioiTinh}
            onChange={handleChange}
          >
            <option>Nam</option>
            <option>Nữ</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Quê quán</label>
          <input
            type="text"
            name="queQuan"
            value={memberInfo.queQuan}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Dân tộc</label>
          <input
            type="text"
            name="danToc"
            value={memberInfo.danToc}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Tôn giáo</label>
          <input
            type="text"
            name="tonGiao"
            value={memberInfo.tonGiao}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Trình độ học vấn</label>
          <input
            type="text"
            name="trinhDoHocVan"
            value={memberInfo.trinhDoHocVan}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Ngày vào đoàn</label>
          <input
            type="date"
            name="ngayVaoDoan"
            value={memberInfo.ngayVaoDoan}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Chức vụ</label>
          <select
            name="chucVu"
            value={memberInfo.chucVu}
            onChange={handleChange}
          >
            <option>Đoàn viên</option>
            <option>Bí thư</option>
            <option>Phó bí thư</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={memberInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Số điện thoại</label>
          <input
            type="text"
            name="soDienThoai"
            value={memberInfo.soDienThoai}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.addressGroup}>
        <label>Địa chỉ liên lạc</label>
        <textarea
          name="diaChiLienLac"
          value={memberInfo.diaChiLienLac}
          onChange={handleChange}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.update} onClick={handleUpdate}>Cập nhật thông tin đoàn viên</button>
        <button className={styles.delete} onClick={handleDelete}>Xóa đoàn viên</button>
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
