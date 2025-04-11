import React from 'react';
import styles from './Listunionmember.module.css';
import Table from '../../../components/Table/Table';

const Listunionmember = () => {
  const columns = ['STT', 'Họ và tên', 'Giới tính', 'Ngày sinh', 'Chức vụ', 'Địa chỉ thường trú', 'Thông tin liên hệ'];

  const data = [
    {
      STT: '1',
      'Họ và tên': 'Đặng Hữu Thắng',
      'Giới tính': 'Nam',
      'Ngày sinh': '25/10/2004',
      'Chức vụ': 'Phó bí thư',
      'Địa chỉ thường trú': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
      'Thông tin liên hệ': 'Email: dht@gmail.com\nSĐT: 0123456789'
    },
    {
      STT: '2',
      'Họ và tên': 'Đặng Hữu Thắng',
      'Giới tính': 'Nam',
      'Ngày sinh': '25/10/2004',
      'Chức vụ': 'Bí thư',
      'Địa chỉ thường trú': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
      'Thông tin liên hệ': 'Email: dht@gmail.com\nSĐT: 0123456789'
    },
    // Thêm dòng khác nếu cần
  ];

  return (
    <div className={styles.wrapper}>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Listunionmember;
