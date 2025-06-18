import React from 'react';
import styles from './Listunionmember.module.css';
import Table from '../../../components/Table/Table';

const Listunionmember = () => {
  const columns = [
    'Họ và tên',
    'Ngày yêu cầu',
    'Chi đoàn yêu cầu chuyển sinh hoạt',
    'Nội dung chuyển sinh hoạt',
    'Trạng thái'
  ];

const data = [
  {
    id: 1,
    'Họ và tên': 'Đặng Hữu Thắng',
    'Ngày yêu cầu': '25/10/2004',
    'Chi đoàn yêu cầu chuyển sinh hoạt': 'Chi đoàn KP A',
    'Nội dung chuyển sinh hoạt': 'Xét chuyển sinh hoạt do chuyển hộ khẩu',
    'Trạng thái': 'Đã tiếp nhận',
  },
  {
    id: 2,
    'Họ và tên': 'Trần Phương Vy',
    'Ngày yêu cầu': '25/10/2004',
    'Chi đoàn yêu cầu chuyển sinh hoạt': 'Chi đoàn KP B',
    'Nội dung chuyển sinh hoạt': 'Xét chuyển sinh hoạt do chuyển hộ khẩu',
    'Trạng thái': 'Tiếp nhận Từ chối',
  },
  {
    id: 3,
    'Họ và tên': 'Đặng Hữu Thắng',
    'Ngày yêu cầu': '25/10/2004',
    'Chi đoàn yêu cầu chuyển sinh hoạt': 'Chi đoàn KP B',
    'Nội dung chuyển sinh hoạt': 'Xét chuyển sinh hoạt do chuyển hộ khẩu',
    'Trạng thái': 'Tiếp nhận Từ chối',
  },
  {
    id: 4,
    'Họ và tên': 'Đặng Hữu Thắng',
    'Ngày yêu cầu': '25/10/2004',
    'Chi đoàn yêu cầu chuyển sinh hoạt': 'Chi đoàn D',
    'Nội dung chuyển sinh hoạt': 'Xét chuyển sinh hoạt do chuyển hộ khẩu',
    'Trạng thái': 'Tiếp nhận Từ chối',
  },
];

  return (
    <div className={styles.wrapper}>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Listunionmember;
