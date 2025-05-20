import React, { useState, useContext } from 'react'; 
import styles from './Listevent.module.css';
import Table from '../../../components/Table/Table';
import Search from '../../../components/Search/Search';
import Filter from '../../../components/Filter/Filter';
import Add from '../../../components/Add/Add';
import ChatAI from '../../../components/ChatAI/ChatAI';
import { AuthContext } from '../../../../context/AuthContext';

const columns = ['Tên sự kiện', 'Trạng thái', 'Thời gian tổ chức', 'Địa điểm tổ chức', 'Điểm danh'];

const originalData = [
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Chờ',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': '',
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Đang diễn ra',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Bắt đầu điểm danh</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
  {
    'Tên sự kiện': 'Chương trình Mùa hè xanh',
    'Trạng thái': 'Hoàn thành',
    'Thời gian tổ chức': '12/12/2025',
    'Địa điểm tổ chức': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
    'Điểm danh': <a href="#">Xem người tham gia</a>,
  },
];

const Listevent = () => {
 
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');  // Set default value to 'all'
  const { role } = useContext(AuthContext);


  const filteredData = originalData.filter(item => {
    const nameMatch = item['Tên sự kiện'].toLowerCase().includes(searchText.toLowerCase());
    const statusMatch =
      filterStatus === 'all' || item['Trạng thái'].toLowerCase() === filterStatus.toLowerCase();
    return nameMatch && statusMatch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Search
          placeholder="Tìm kiếm tên sự kiện..."
          value={searchText}
          onChange={setSearchText}
        />
        <Filter
          selected={filterStatus}
          onChange={setFilterStatus}
        />
        <Add onClick={() => console.log('Add button clicked')} />
        <ChatAI
  onClick={() => console.log(`ChatAi button clicked ${role}`)}
  fixed={true}
/>

      </div>
      <Table columns={columns} data={filteredData} />
    </div>
  );
};

export default Listevent;
