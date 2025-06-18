import React, { useEffect, useState } from "react";
import styles from "./AttendeeItem.module.css";
import avatar from '../../assets/avatar.png'

export default function AttendeeItem({ item }) {
  const mapFields = {
    secretary: "Bí thư",
    deputy_secretary: "Phó Bí thư",
    commitee_member: "Ủy viên Ban chấp hành",
    member: "Đoàn viên",
  
  };
  const [checkin, setCheckin] = useState(item.status == 'attended')
  const handleCheckin = async()=>{
    try {
      
      const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/event-registrations/${item._id}`,{
        method:'PATCH'
      })
      const data = await res.json()
      if(data.success){
        setCheckin(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
 
  },[checkin])
  return (
    <div className={styles.container}>
      <img
        src={item?.avatar?.path || avatar}
        alt="avatar"
        className={styles.avatar}
      />

      <div className={styles.info}>
        <p><strong>Họ tên:</strong> {item?.fullname}</p>
        <p><strong>Chi đoàn:</strong> {item?.memberOf.name}</p>
        <p><strong>Chức vụ:</strong> {mapFields[item?.position]}</p>
        <p><strong>Số thẻ Đoàn:</strong> {item?.cardCode}</p>
      </div>

      <div className={styles.action}>
        {checkin ? (
          <p className={styles.checked}>✅ Đã có mặt</p>
        ) : (
          <button onClick={handleCheckin} className={styles.checkinBtn}>
            Điểm danh
          </button>
        )}
      </div>
    </div>
  );
}
