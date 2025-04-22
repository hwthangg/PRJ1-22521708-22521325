import React, { useState } from 'react';
import styles from './Listdocument.module.css';
import Table from '../../../components/Table/Table';
import Search from '../../../components/Search/Search';
import Filter from '../../../components/Filter/Filter';
import Add from '../../../components/Add/Add';
import ChatAI from '../../../components/ChatAI/ChatAI';
import downloadIcon from '../../../assets/download-icon.png'; 
import Delete from '../../../components/Delete/Delete';

const columns = ['Tên tài liệu', 'Loại tài liệu', 'Ngày ban hành', 'Nơi ban hành', 'Tải tài liệu'];

const originalData = [
  {
    'Tên tài liệu': 'Thông báo họp đoàn',
    'Loại tài liệu': 'Thông báo',
    'Ngày ban hành': '01/01/2025',
    'Nơi ban hành': 'Đoàn trường ABC',
    'Tải tài liệu': '/docs/thongbao1.pdf',
  },
  {
    'Tên tài liệu': 'Kế hoạch công tác quý I',
    'Loại tài liệu': 'Kế hoạch',
    'Ngày ban hành': '10/02/2025',
    'Nơi ban hành': 'Chi đoàn Khoa CNTT',
    'Tải tài liệu': '/docs/kehoach1.pdf',
  },
  {
    'Tên tài liệu': 'Biên bản họp đoàn',
    'Loại tài liệu': 'Biên bản',
    'Ngày ban hành': '15/03/2025',
    'Nơi ban hành': 'Đoàn trường ABC',
    'Tải tài liệu': '/docs/bienban1.pdf',
  },
];

const Listdocument = () => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); 

  const filteredData = originalData
    .filter(item =>
      item['Tên tài liệu'].toLowerCase().includes(searchText.toLowerCase())
    )
    .map((item, index) => ({
      STT: index + 1,
      ...item,
      'Tải tài liệu': (
        <a href={item['Tải tài liệu']} download>
          <img src={downloadIcon} alt="Tải về" style={{ width: '24px', cursor: 'pointer' }} />
        </a>
      ),
    }));

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Search
          placeholder="Tìm kiếm tên tài liệu..."
          value={searchText}
          onChange={setSearchText}
        />
        <Filter
          selected={filterStatus}
          onChange={setFilterStatus}
        />
        <Add onClick={() => console.log('Add button clicked')} />
        <Delete onClick={() => console.log('Delete buttton clicked')}/>
      </div>
      <Table columns={columns} data={filteredData} />
    </div>
  );
};

export default Listdocument;
