import React from 'react';
import styles from './Info_event.module.css';
import Table from '../Table/Table';

const Info_event = () => {
  const columns = ['STT', 'Họ và tên', 'Số thẻ đoàn', 'Thời gian', 'Chức vụ'];
  const data = [
    ['1', 'Đặng Hữu Thắng', '00000000000', '25/10/2004', 'Đoàn viên'],
    ['2', 'Đặng Hữu Thắng', '00000000000', '25/10/2004', 'Đoàn viên'],
    ['3', 'Đặng Hữu Thắng', '00000000000', '25/10/2004', 'Đoàn viên'],
    ['4', 'Đặng Hữu Thắng', '00000000000', '25/10/2004', 'Đoàn viên'],
  ];

  return (
    <div className={styles.container}>
      <div className={styles.infoGroup}>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>Tên sự kiện</label>
            <input type="text" value="Tập huấn chuyển đề chuyển đổi số" readOnly />
          </div>
          <div className={styles.inputBox}>
            <label>Tình trạng</label>
            <select disabled>
              <option>Đang diễn ra</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>Nơi tổ chức</label>
            <input type="text" value="UBND phường A" readOnly />
          </div>
          <div className={styles.inputBox}>
            <label>Ngày bắt đầu</label>
            <input type="text" value="25/10/2004" readOnly />
          </div>
        </div>

        <div className={styles.inputBox}>
          <label>Yêu cầu</label>
          <textarea readOnly value="Mang theo CCCD và điện thoại thông minh để thực hiện chữ ký số, thao tác trên cổng dịch vụ công quốc gia." />
        </div>

        <div className={styles.themes}>
          <label>Chủ đề</label>
          <div className={styles.themeOptions}>
            <span className={`${styles.tag} ${styles.selected}`}>Giáo dục</span>
            <span className={`${styles.tag}`}>Chính trị</span>
            <span className={`${styles.tag} ${styles.selected}`}>Công nghệ</span>
            <span className={styles.tag}>Thiếu nhi</span>
            <span className={styles.tag}>Tình nguyện</span>
            <span className={styles.tag}>Môi trường</span>
            <span className={styles.tag}>Nghệ thuật</span>
          </div>
        </div>

        <div className={styles.inputBox}>
          <label>Mô tả sự kiện</label>
          <textarea readOnly value="Tập huấn chuyển đề chuyển đổi số nhằm trang bị kiến thức và kỹ năng cơ bản về chuyển đổi số cho cán bộ, đoàn viên, giúp nâng cao năng lực ứng dụng công nghệ trong công tác quản lý, điều hành và hoạt động Đoàn..." />
        </div>

        <div className={styles.imageGroup}>
          <label>Hình ảnh liên quan</label>
          <div className={styles.images}>
            <img src="/images/sample1.jpg" alt="1" />
            <img src="/images/sample2.jpg" alt="2" />
            <img src="/images/sample3.jpg" alt="3" />
            <img src="/images/sample4.jpg" alt="4" />
          </div>
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
