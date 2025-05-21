// import React, { useState } from 'react';
// import styles from './Info_event.module.css';
// import Table from '../Table/Table';
// import sample1 from '../../assets/a1.jpg';
// import sample2 from '../../assets/a2.jpg';
// import sample3 from '../../assets/a3.jpg';

// const Info_event = () => {
//   const columns = ['Họ và tên', 'Số thẻ đoàn', 'Thời gian', 'Chức vụ'];
//   const data = [
//     {
//       'Họ và tên': 'Trần Phương Vy',
//       'Số thẻ đoàn': '00110000000',
//       'Thời gian': '25/10/2004',
//       'Chức vụ': 'Đoàn viên'
//     },
//     {
//       'Họ và tên': 'Đặng Hữu Thắng',
//       'Số thẻ đoàn': '00000000000',
//       'Thời gian': '25/10/2004',
//       'Chức vụ': 'Đoàn viên'
//     },
//     {
//       'Họ và tên': 'Đặng Hữu Thắng',
//       'Số thẻ đoàn': '00000000000',
//       'Thời gian': '25/10/2004',
//       'Chức vụ': 'Đoàn viên'
//     },
//     {
//       'Họ và tên': 'Đặng Hữu Thắng',
//       'Số thẻ đoàn': '00000000000',
//       'Thời gian': '25/10/2004',
//       'Chức vụ': 'Đoàn viên'
//     },
//     {
//       'Họ và tên': 'Đặng Hữu Thắng',
//       'Số thẻ đoàn': '00000000000',
//       'Thời gian': '25/10/2004',
//       'Chức vụ': 'Đoàn viên'
//     },
//   ];
  

//   const [selectedTopics, setSelectedTopics] = useState({
//     'Giáo dục': true,
//     'Chính trị': false,
//     'Công nghệ': true,
//     'Thiếu nhi': false,
//     'Tình nguyện': false,
//     'Môi trường': false,
//     'Nghệ thuật': false,
//   });

//   const [previewImage, setPreviewImage] = useState(null);

// const handleImageClick = (src) => {
//   setPreviewImage(src);
// };

// const closePreview = () => {
//   setPreviewImage(null);
// };

//   const [status, setStatus] = useState('Đang diễn ra');
//   const [startDate, setStartDate] = useState('2004-10-25');

//   const handleCheckboxChange = (topic) => {
//     setSelectedTopics((prev) => ({
//       ...prev,
//       [topic]: !prev[topic],
//     }));
//   };
//   const [imageList, setImageList] = useState([sample1, sample2, sample3]);

//   const handleImageUpload = (e) => {
//     const files = e.target.files;
//     if (files) {
//       const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
//       setImageList((prevList) => [...prevList, ...newImages]);
//     }
//   };
//   const handleDeleteImage = (index) => {
//     setImageList((prevList) => prevList.filter((_, i) => i !== index));  
//   };
  
  

//   return (
//     <div className={styles.container}>
//       <div className={styles.infoGroup}>
//         <div className={styles.row}>
//           <div className={styles.inputBox}>
//             <label>Tên sự kiện</label>
//             <input type="text" value="Tập huấn chuyển đề chuyển đổi số" />
//           </div>
//           <div className={`${styles.inputBox} ${styles.halfWidth}`}>
//             <label>Tình trạng</label>
//             <select value={status} onChange={(e) => setStatus(e.target.value)}>
//               <option>Đang diễn ra</option>
//               <option>Đã kết thúc</option>
//               <option>Sắp diễn ra</option>
//             </select>
//           </div>
//         </div>

//         <div className={styles.row}>
//           <div className={styles.inputBox}>
//             <label>Nơi tổ chức</label>
//             <input type="text" value="UBND phường A" />
//           </div>
//           <div className={`${styles.inputBox} ${styles.halfWidth}`}>
//             <label>Ngày bắt đầu</label>
//             <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//           </div>
//         </div>

//         <div className={styles.inputBox}>
//           <label>Yêu cầu</label>
//           <textarea
//             value="Mang theo CCCD và điện thoại thông minh để thực hiện chữ ký số, thao tác trên cổng dịch vụ công quốc gia."
//           />
//         </div>

//         <div className={styles.themes}>
//           <label>Chủ đề</label>
//           <div className={styles.themeOptions}>
//             {Object.entries(selectedTopics).map(([topic, checked]) => (
//               <label key={topic} className={styles.checkboxItem}>
//                 <input
//                   type="checkbox"
//                   checked={checked}
//                   onChange={() => handleCheckboxChange(topic)}
//                 />
//                 {topic}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className={styles.inputBox}>
//           <label>Mô tả sự kiện</label>
//           <textarea
//             value="Tập huấn chuyển đề chuyển đổi số nhằm trang bị kiến thức và kỹ năng cơ bản về chuyển đổi số cho cán bộ, đoàn viên, giúp nâng cao năng lực ứng dụng công nghệ trong công tác quản lý, điều hành và hoạt động Đoàn..."
//           />
//         </div>

//         <div className={styles.imageGroup}>
//   <div className={styles.imageLabel}>
//     <label>Hình ảnh liên quan</label>
//     <label className={styles.uploadButton}>
//       <input
//         type="file"
//         accept="image/*"
//         hidden
//         multiple 
//         onChange={handleImageUpload} 
//       />
//       +
//     </label>
//   </div>

//   <div className={styles.images}>
//   {imageList.map((img, i) => (
//     <div key={i} className={styles.imageContainer}>
//       <img
//         src={img}
//         alt={`Ảnh ${i + 1}`}
//         onClick={() => handleImageClick(img)}
//         className={styles.imageItem}
//       />
//       <button
//         className={styles.deleteButton}
//         onClick={() => handleDeleteImage(i)}  
//       >
//         X
//       </button>
//     </div>
//   ))}
// </div>


//   {previewImage && (
//     <div className={styles.previewOverlay}>
//       <button className={styles.closeButton} onClick={closePreview}>×</button>
//       <div className={styles.previewContent}>
//         <img src={previewImage} alt="Preview" />
//       </div>
//     </div>
//   )}
// </div>



//       </div>

//       <div className={styles.tableSection}>
//         <h3>Điểm danh đoàn viên</h3>
//         <Table columns={columns} data={data} />
//       </div>

//       <div className={styles.buttonGroup}>
//         <button className={styles.updateBtn}>Cập nhật thông tin sự kiện</button>
//         <button className={styles.deleteBtn}>Xóa sự kiện</button>
//       </div>
//     </div>
//   );
// };

// export default Info_event;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Info_event.module.css';
import Table from '../Table/Table';
import sample1 from '../../assets/a1.jpg';
import sample2 from '../../assets/a2.jpg';
import sample3 from '../../assets/a3.jpg';

// Dữ liệu mẫu (có thể thay bằng fetch từ API)
const sampleEvents = {
  '1': {
    name: 'Tập huấn chuyển đổi số',
    location: 'UBND phường A',
    description:
      'Tập huấn chuyển đề chuyển đổi số nhằm trang bị kiến thức và kỹ năng cơ bản về chuyển đổi số cho cán bộ, đoàn viên, giúp nâng cao năng lực ứng dụng công nghệ trong công tác quản lý, điều hành và hoạt động Đoàn...',
    requirement:
      'Mang theo CCCD và điện thoại thông minh để thực hiện chữ ký số, thao tác trên cổng dịch vụ công quốc gia.',
    topics: ['Giáo dục', 'Công nghệ'],
    status: 'Đang diễn ra',
    startDate: '2004-10-25',
    images: [sample1, sample2, sample3],
    attendance: [
      {
        'Họ và tên': 'Trần Phương Vy',
        'Số thẻ đoàn': '00110000000',
        'Thời gian': '25/10/2004',
        'Chức vụ': 'Đoàn viên',
      },
      {
        'Họ và tên': 'Đặng Hữu Thắng',
        'Số thẻ đoàn': '00000000000',
        'Thời gian': '25/10/2004',
        'Chức vụ': 'Đoàn viên',
      },
    ],
  },
  '2': {
    name: 'Chương trình mùa hè xanh',
    location: 'UBND phường A',
    description:
      'Tập huấn chuyển đề chuyển đổi số nhằm trang bị kiến thức và kỹ năng cơ bản về chuyển đổi số cho cán bộ, đoàn viên, giúp nâng cao năng lực ứng dụng công nghệ trong công tác quản lý, điều hành và hoạt động Đoàn...',
    requirement:
      'Mang theo CCCD và điện thoại thông minh để thực hiện chữ ký số, thao tác trên cổng dịch vụ công quốc gia.',
    topics: ['Giáo dục', 'Công nghệ'],
    status: 'Đang diễn ra',
    startDate: '2004-10-25',
    images: [sample1, sample2, sample3],
    attendance: [
      {
        'Họ và tên': 'Trần Phương Vy',
        'Số thẻ đoàn': '00110000000',
        'Thời gian': '25/10/2004',
        'Chức vụ': 'Đoàn viên',
      },
      {
        'Họ và tên': 'Đặng Hữu Thắng',
        'Số thẻ đoàn': '00000000000',
        'Thời gian': '25/10/2004',
        'Chức vụ': 'Đoàn viên',
      },
    ],
  },
};

const Info_event = () => {
  const { eventId } = useParams();

  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirement, setRequirement] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [imageList, setImageList] = useState([]);
  const [data, setData] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState({
    'Giáo dục': false,
    'Chính trị': false,
    'Công nghệ': false,
    'Thiếu nhi': false,
    'Tình nguyện': false,
    'Môi trường': false,
    'Nghệ thuật': false,
  });

  useEffect(() => {
    const eventData = sampleEvents[eventId];
    if (eventData) {
      setEventName(eventData.name);
      setLocation(eventData.location);
      setDescription(eventData.description);
      setRequirement(eventData.requirement);
      setStatus(eventData.status);
      setStartDate(eventData.startDate);
      setImageList(eventData.images);
      setData(eventData.attendance);

      // Cập nhật các checkbox chủ đề
      setSelectedTopics((prev) => {
        const updated = {};
        Object.keys(prev).forEach((key) => {
          updated[key] = eventData.topics.includes(key);
        });
        return updated;
      });
    }
  }, [eventId]);

  const handleCheckboxChange = (topic) => {
    setSelectedTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
  };

  const handleImageClick = (src) => {
    setPreviewImage(src);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImageList((prevList) => [...prevList, ...newImages]);
    }
  };

  const handleDeleteImage = (index) => {
    setImageList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const columns = ['Họ và tên', 'Số thẻ đoàn', 'Thời gian', 'Chức vụ'];

  return (
    <div className={styles.container}>
      <div className={styles.infoGroup}>
        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>Tên sự kiện</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className={`${styles.inputBox} ${styles.halfWidth}`}>
            <label>Tình trạng</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Đang diễn ra</option>
              <option>Đã kết thúc</option>
              <option>Sắp diễn ra</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputBox}>
            <label>Nơi tổ chức</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className={`${styles.inputBox} ${styles.halfWidth}`}>
            <label>Ngày bắt đầu</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputBox}>
          <label>Yêu cầu</label>
          <textarea
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
              <button className={styles.closeButton} onClick={closePreview}>
                ×
              </button>
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
