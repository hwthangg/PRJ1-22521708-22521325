import React, { useState } from 'react';
import styles from './Info_event.module.css';
import Table from '../Table/Table';
import sample1 from '../../assets/a1.jpg';
import sample2 from '../../assets/a2.jpg';
import sample3 from '../../assets/a3.jpg';

const Info_event = () => {
  const columns = ['STT', 'Họ và tên', 'Số thẻ đoàn', 'Thời gian', 'Chức vụ'];
  const data = [
    ['1', 'Đặng Hữu Thắng', '00000000000', '25/10/2004', 'Đoàn viên'],
    ['2', 'Đặng Hữu Thắng', '00000000000', '25/10/2004', 'Đoàn viên'],
    ['3', 'Đặng Hữu Thắng', '00000000000', '25/10/2004', 'Đoàn viên'],
    ['4', 'Đặng Hữu Thắng', '00000000000', '25/10/2004', 'Đoàn viên'],
  ];

  const [selectedTopics, setSelectedTopics] = useState({
    'Giáo dục': true,
    'Chính trị': false,
    'Công nghệ': true,
    'Thiếu nhi': false,
    'Tình nguyện': false,
    'Môi trường': false,
    'Nghệ thuật': false,
  });

  const [previewImage, setPreviewImage] = useState(null);

const handleImageClick = (src) => {
  setPreviewImage(src);
};

const closePreview = () => {
  setPreviewImage(null);
};

  const [status, setStatus] = useState('Đang diễn ra');
  const [startDate, setStartDate] = useState('2004-10-25');

  const handleCheckboxChange = (topic) => {
    setSelectedTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
  };
  const imageList = [sample1, sample2, sample3];

  return (
    <div className={styles.container}>
      <div className={styles.infoGroup}>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>Tên sự kiện</label>
            <input type="text" value="Tập huấn chuyển đề chuyển đổi số" />
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
            <input type="text" value="UBND phường A" />
          </div>
          <div className={`${styles.inputBox} ${styles.halfWidth}`}>
            <label>Ngày bắt đầu</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
        </div>

        <div className={styles.inputBox}>
          <label>Yêu cầu</label>
          <textarea
            value="Mang theo CCCD và điện thoại thông minh để thực hiện chữ ký số, thao tác trên cổng dịch vụ công quốc gia."
          />
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
          <textarea
            value="Tập huấn chuyển đề chuyển đổi số nhằm trang bị kiến thức và kỹ năng cơ bản về chuyển đổi số cho cán bộ, đoàn viên, giúp nâng cao năng lực ứng dụng công nghệ trong công tác quản lý, điều hành và hoạt động Đoàn..."
          />
        </div>

        <div className={styles.imageGroup}>
          <label>Hình ảnh liên quan</label>
          <div className={styles.images}>
  {imageList.map((img, i) => (
    <img
      key={i}
      src={img}
      alt={`Ảnh ${i + 1}`}
      onClick={() => handleImageClick(img)}
      className={styles.imageItem}
    />
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
        <button className={styles.updateBtn}>Cập nhật thông tin sự kiện</button>
        <button className={styles.deleteBtn}>Xóa sự kiện</button>
      </div>
    </div>
  );
};

export default Info_event;
