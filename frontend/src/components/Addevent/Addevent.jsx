import React, { useState } from 'react';
import styles from './Addevent.module.css';
import Table from '../Table/Table';

const Addevent = () => {
  const columns = ['Họ và tên', 'Số thẻ đoàn', 'Thời gian', 'Chức vụ'];

  const data = []; // Rỗng vì đang thêm mới

  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [description, setDescription] = useState('');

  const [selectedTopics, setSelectedTopics] = useState({
    'Giáo dục': false,
    'Chính trị': false,
    'Công nghệ': false,
    'Thiếu nhi': false,
    'Tình nguyện': false,
    'Môi trường': false,
    'Nghệ thuật': false,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [status, setStatus] = useState('Đang diễn ra');
  const [startDate, setStartDate] = useState('');

  const handleCheckboxChange = (topic) => {
    setSelectedTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImageList((prevList) => [...prevList, ...newImages]);
    }
  };

  const handleDeleteImage = (index) => {
    setImageList((prevList) => prevList.filter((_, i) => i !== index));  
  };

  const handleImageClick = (src) => setPreviewImage(src);
  const closePreview = () => setPreviewImage(null);

  return (
    <div className={styles.container}>
      <div className={styles.infoGroup}>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>Tên sự kiện</label>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div className={`${styles.inputBox} ${styles.halfWidth}`}>
            <label>Tình trạng</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Đang diễn ra</option>
              <option>Đã kết thúc</option>
              <option>Sắp diễn ra</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>Nơi tổ chức</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className={`${styles.inputBox} ${styles.halfWidth}`}>
            <label>Ngày bắt đầu</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
        </div>

        <div className={styles.inputBox}>
          <label>Yêu cầu</label>
          <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} />
        </div>

        <div className={styles.themes}>
          <label>Chủ đề</label>
          <div className={styles.themeOptions}>
            {Object.entries(selectedTopics).map(([topic, checked]) => (
              <label key={topic} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCheckboxChange(topic)}
                />
                {topic}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.inputBox}>
          <label>Mô tả sự kiện</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className={styles.imageGroup}>
          <div className={styles.imageLabel}>
            <label>Hình ảnh liên quan</label>
            <label className={styles.uploadButton}>
              <input
                type="file"
                accept="image/*"
                hidden
                multiple 
                onChange={handleImageUpload} 
              />
              +
            </label>
          </div>

          <div className={styles.images}>
            {imageList.map((img, i) => (
              <div key={i} className={styles.imageContainer}>
                <img
                  src={img}
                  alt={`Ảnh ${i + 1}`}
                  onClick={() => handleImageClick(img)}
                  className={styles.imageItem}
                />
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteImage(i)}  
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {previewImage && (
            <div className={styles.previewOverlay}>
              <button className={styles.closeButton} onClick={closePreview}>×</button>
              <div className={styles.previewContent}>
                <img src={previewImage} alt="Preview" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.tableSection}>
        <h3>Điểm danh đoàn viên</h3>
        <Table columns={columns} data={data} />
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.updateBtn}>Thêm sự kiện</button>
        <button className={styles.deleteBtn}>Huỷ</button>
      </div>
    </div>
  );
};

export default Addevent;
