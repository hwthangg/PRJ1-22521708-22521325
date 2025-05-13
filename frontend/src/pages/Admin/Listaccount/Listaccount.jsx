import React, { useState } from 'react';
import styles from './Listaccount.module.css';
import Table from '../../../components/Table_account/Table_account';
import Search from '../../../components/Search/Search';
import Filter from '../../../components/Filter/Filter';
import Add from '../../../components/Add/Add';
import Delete from '../../../components/Delete/Delete';
import FormAddmember from '../../../components/FormAddmember/FormAddmember';

const Listaccount = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [showFormAdd, setShowFormAdd] = useState(false); 
  const columns = [
    'Họ và tên',
    'Email',
    'Số điện thoại',
    'Chi đoàn quản lý',
    'Vai trò'
  ];

  const data = [
     {
    'Họ và tên': 'Đặng Hữu Thắng',
    'Email': 'dht@gmail.com',
    'Số điện thoại': '0123456789',
    'Chi đoàn quản lý': 'Chi đoàn A',
    'Vai trò': 'Phó bí thư',
  },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterBar}>
        <Search 
          value={searchValue} 
          onChange={setSearchValue} 
          placeholder="Nhập thông tin tài khoản muốn tìm" 
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

export default Listaccount;
