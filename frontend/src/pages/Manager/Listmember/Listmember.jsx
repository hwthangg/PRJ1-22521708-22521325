import React, { useState } from 'react';
import styles from './Listmember.module.css';
import Table from '../../../components/Table/Table';
import Search from '../../../components/Search/Search';
import Filter from '../../../components/Filter/Filter';
import Add from '../../../components/Add/Add';
import Delete from '../../../components/Delete/Delete';
import FormAddmember from '../../../components/FormAddmember/FormAddmember';
import { useEffect } from 'react';

const Listmember = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [showFormAdd, setShowFormAdd] = useState(false); 
  const columns = [
    'Họ và tên',
    'Giới tính',
    'Ngày sinh',
    'Chức vụ',
    'Địa chỉ thường trú',
    'Thông tin liên hệ'
  ];

  const data = [
    {
      'Họ và tên': 'Đặng Hữu Thắng',
      'Giới tính': 'Nam',
      'Ngày sinh': '25/10/2004',
      'Chức vụ': 'Phó bí thư',
      'Địa chỉ thường trú': '1/1 đường A, khu phố A, phường A, huyện A, tỉnh A',
      'Thông tin liên hệ': 'Email: dht@gmail.com\nSĐT: 0123456789',
    },
  ];

  const [members, setMembers] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/api/members', {
      method: 'GET',
      credentials:'include',
      
    }).then(res => res.json())
    .then(data => {
      const arrMember = data.data.members.map(item => ({
        id: item.account._id,
      'Họ và tên': item.account.fullname,
      'Giới tính': item.account.gender,
      'Ngày sinh': new Date(item.account.birthday).toLocaleDateString('vi-VN'),
      'Chức vụ': item.position,
      'Địa chỉ thường trú': item.address,
      'Thông tin liên hệ': `Email: ${item.account.email}\nSĐT: ${item.account.phone}`,}))
      setMembers(arrMember)
      console.log(arrMember)
    })
  },[])

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterBar}>
        <Search 
          value={searchValue} 
          onChange={setSearchValue} 
          placeholder="Nhập thông tin đoàn viên muốn tìm" 
        />
        <Filter 
          selected={filterValue} 
          onChange={setFilterValue} 
        />
        <Add onClick={() => setShowFormAdd(true)} />
        <Delete onClick={() => console.log('Delete button clicked')} />
      </div>

      <Table columns={columns} data={members} />

      {showFormAdd && (
        <FormAddmember onClose={() => setShowFormAdd(false)} />
      )}
    </div>
  );
};

export default Listmember;
