import React, { useState } from 'react';
import styles from './Uniondetail.module.css';
import Table from '../../../components/Table/Table';
import DocumentTable from '../../../components/Table_doc/Table_doc';
import { ArrowLeft } from 'lucide-react';
import { ChevronDown, ChevronRight } from 'lucide-react'; // Mũi tên đóng/mở

// Dữ liệu mẫu
const memberColumns = ['Họ và tên', 'Ngày sinh', 'Chức vụ'];
const memberData = [
  { 'Họ và tên': 'Nguyễn Văn A', 'Ngày sinh': '01/01/2000', 'Chức vụ': 'Bí thư' },
  { 'Họ và tên': 'Trần Thị B', 'Ngày sinh': '05/03/2001', 'Chức vụ': 'Đoàn viên' },
];

const eventColumns = ['Tên sự kiện', 'Ngày tổ chức', 'Trạng thái'];
const eventData = [
  { 'Tên sự kiện': 'Lễ kết nạp Đoàn', 'Ngày tổ chức': '01/04/2024', 'Trạng thái': 'Đã tổ chức' },
  { 'Tên sự kiện': 'Hội thao', 'Ngày tổ chức': '15/05/2024', 'Trạng thái': 'Sắp diễn ra' },
];

const docColumns = ['Tên tài liệu', 'Loại', 'Ngày phát hành'];
const docData = [
  { 'Tên tài liệu': 'Báo cáo thường niên', 'Loại': 'Báo cáo', 'Ngày phát hành': '01/01/2024' },
  { 'Tên tài liệu': 'Hướng dẫn sinh hoạt chi đoàn', 'Loại': 'Hướng dẫn', 'Ngày phát hành': '15/03/2024' },
];

const UnionDetail = () => {
  const [formData, setFormData] = useState({
    name: 'Chi đoàn KP A',
    parent: 'Đoàn phường A',
    address: '11/4 đường Trần Quang Khải, khu phố Đông B, phường Đông Hòa, thành phố Dĩ An',
    foundedDate: '2004-10-25',
    manager: 'Đặng Hữu Thắng',
  });

  const [showMembers, setShowMembers] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [showDocs, setShowDocs] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton}>
        <ArrowLeft size={20} /> Trở về
      </button>

      <div className={styles.header}>
        <div className={styles.infoGroup}>
          <label><strong>Tên chi đoàn:</strong></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label><strong>Đoàn trực thuộc:</strong></label>
          <input
            type="text"
            name="parent"
            value={formData.parent}
            onChange={handleChange}
          />

          <label><strong>Địa chỉ:</strong></label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className={styles.infoGroup}>
          <label><strong>Ngày thành lập:</strong></label>
          <input
            type="date"
            name="foundedDate"
            value={formData.foundedDate}
            onChange={handleChange}
          />

          <label><strong>Người quản lý:</strong></label>
          <input
            type="text"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Danh sách đoàn viên */}
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionTitle} onClick={() => setShowMembers(!showMembers)}>
          {showMembers ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span>Danh sách đoàn viên</span>
        </div>
        {showMembers && <Table columns={memberColumns} data={memberData} />}
      </div>

      {/* Danh sách sự kiện */}
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionTitle} onClick={() => setShowEvents(!showEvents)}>
          {showEvents ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span>Danh sách sự kiện</span>
        </div>
        {showEvents && <Table columns={eventColumns} data={eventData} />}
      </div>

      {/* Danh sách tài liệu */}
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionTitle} onClick={() => setShowDocs(!showDocs)}>
          {showDocs ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span>Danh sách tài liệu</span>
        </div>
        {showDocs && <DocumentTable columns={docColumns} data={docData} />}
      </div>
    </div>
  );
};

export default UnionDetail;
