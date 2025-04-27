import React, { useRef, useState, useEffect } from 'react';
import styles from './Info_document.module.css';
import fileIcon from '../../assets/file.png';

const Info_document = ({ document = {}, onClose }) => {
  const fileInputRef = useRef(null);

  // State edit
  const [formData, setFormData] = useState({
    tenTaiLieu: '',
    loaiTaiLieu: '',
    ngayBanHanh: '',
    noiBanHanh: '',
    moTa: '',
  });

  useEffect(() => {
    if (document) {
      setFormData({
        tenTaiLieu: document['Tên tài liệu'] || '',
        loaiTaiLieu: document['Loại tài liệu'] || '',
        ngayBanHanh: document['Ngày ban hành'] || '',
        noiBanHanh: document['Nơi ban hành'] || '',
        moTa: document['Mô tả'] || '',
      });
    }
  }, [document]);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file.name);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    const updatedDocument = {
      'Tên tài liệu': formData.tenTaiLieu,
      'Loại tài liệu': formData.loaiTaiLieu,
      'Ngày ban hành': formData.ngayBanHanh,
      'Nơi ban hành': formData.noiBanHanh,
      'Mô tả': formData.moTa,
    };
    console.log('Cập nhật tài liệu với dữ liệu:', updatedDocument);
    // TODO: Thêm logic gửi updatedDocument đi
  };

  const handleDeleteClick = () => {
    console.log('Xóa tài liệu');
    // TODO: Thêm logic xóa tài liệu
  };

  if (!document) return <p>Chưa có tài liệu nào được chọn</p>;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={styles.content}>
          {/* Upload file */}
          <div className={styles.uploadSection} onClick={handleFileSelect}>
            <span className={styles.uploadText}>Chọn tài liệu tải lên</span>
            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <img src={fileIcon} alt="PDF Icon" className={styles.pdfIcon} />
          </div>

          {/* Info tài liệu */}
          <div className={styles.infoSection}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Tên tài liệu</label>
                <input
                  type="text"
                  name="tenTaiLieu"
                  value={formData.tenTaiLieu}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Loại tài liệu</label>
                <input
                  type="text"
                  name="loaiTaiLieu"
                  value={formData.loaiTaiLieu}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.field}>
                <label>Ngày ban hành</label>
                <input
                  type="text"
                  name="ngayBanHanh"
                  value={formData.ngayBanHanh}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.field}>
                <label>Nơi ban hành</label>
                <input
                  type="text"
                  name="noiBanHanh"
                  value={formData.noiBanHanh}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Mô tả tài liệu</label>
                <textarea
                  name="moTa"
                  value={formData.moTa}
                  onChange={handleInputChange}
                  rows="5"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.updateButton} onClick={handleUpdateClick}>
            Cập nhật tài liệu
          </button>
          <button className={styles.deleteButton} onClick={handleDeleteClick}>
            Xóa tài liệu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info_document;
