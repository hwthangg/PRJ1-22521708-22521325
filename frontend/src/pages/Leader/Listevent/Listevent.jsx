import React from 'react';
import styles from './Listevent.module.css';
import Table from '../../../components/Table/Table';

const columns = ['Tên sự kiện', 'Trạng thái', 'Thời gian tổ chức', 'Địa điểm tổ chức', 'Điểm danh'];

const data = [
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
];

const Listevent = () => {
  return (
    <div className={styles.container}>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Listevent;
