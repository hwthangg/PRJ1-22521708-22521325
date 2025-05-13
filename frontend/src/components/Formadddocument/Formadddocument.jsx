import React, { useRef, useState, useEffect } from 'react';
import styles from './Formadddocument.module.css';
import fileIcon from '../../assets/file.png';

const Formadddocument = ({ document = {}, onClose }) => {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);

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
      setUploadedFile(file);
      console.log('Tệp đã chọn:', file.name);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    const newDocument = {
      'Tên tài liệu': formData.tenTaiLieu,
      'Loại tài liệu': formData.loaiTaiLieu,
      'Ngày ban hành': formData.ngayBanHanh,
      'Nơi ban hành': formData.noiBanHanh,
      'Mô tả': formData.moTa,
      'Tài liệu': uploadedFile ? uploadedFile.name : (document['Tải tài liệu'] || ''),
    };
    console.log('Thêm tài liệu với dữ liệu:', newDocument);
  };


  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
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
            {uploadedFile ? (
              <p className={styles.fileName}>{uploadedFile.name}</p>
            ) : (
              document['Tải tài liệu'] && <p className={styles.fileName}>{document['Tải tài liệu']}</p>
            )}
          </div>

          {/* Info tài liệu */}
          <div className={styles.infoSection}>
            {/* Dòng 1: Tên tài liệu */}
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

            {/* Dòng 2: Loại tài liệu, Ngày ban hành, Nơi ban hành */}
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
                  type="date"
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

            {/* Dòng 3: Mô tả */}
            <div className={styles.row}>
              <div className={styles.fieldFullWidth}>
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

        {/* Nút Thêm tài liệu */}
        <div className={styles.buttonGroup}>
          <button className={styles.addButton} onClick={handleAddClick}>
            Thêm tài liệu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Formadddocument;
