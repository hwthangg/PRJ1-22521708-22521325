import React, { useState } from 'react';
import styles from './Listunion.module.css';
import Table from '../../../components/Table_union/Table_union';
import Search from '../../../components/Search/Search';
import Filter from '../../../components/Filter/Filter';
import Add from '../../../components/Add/Add';
import Delete from '../../../components/Delete/Delete';
import FormAddmember from '../../../components/FormAddmember/FormAddmember';

const Listunion = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [showFormAdd, setShowFormAdd] = useState(false); 
  const columns = [
    'Tên chi đoàn',
    'Ngày thành lập',
    'Đoàn trực thuộc',
    'Địa chỉ'
  ];

  const data = [
     {
    'Tên chi đoàn': 'Chi đoàn KP A',
    'Ngày thành lập': '17/04/2017',
    'Đoàn trực thuộc': 'Đoàn phường A',
    'Địa chỉ': '11/4 đường Trần Quang Khải, khu phố Đông B, phường Đông Hòa, thành phố Dĩ An, tỉnh Bình Dương',
  },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterBar}>
        <Search 
          value={searchValue} 
          onChange={setSearchValue} 
          placeholder="Nhập thông tin chi đoàn muốn tìm" 
        />
        <Filter 
          selected={filterValue} 
          onChange={setFilterValue} 
        />
        <Add onClick={() => setShowFormAdd(true)} />
        <Delete onClick={() => console.log('Delete button clicked')} />
      </div>

      <Table columns={columns} data={data} />

      {showFormAdd && (
        <FormAddmember onClose={() => setShowFormAdd(false)} />
      )}
    </div>
  );
};

export default Listunion;
