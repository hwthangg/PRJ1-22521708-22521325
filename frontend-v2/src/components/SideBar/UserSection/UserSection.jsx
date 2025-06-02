import React, { useState } from "react";
import styles from "./UserSection.module.css";
import avatar from "../../../assets/avatar.png";
import { FaBell, FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserSection({ user }) {
  const [notifications, setNotifications] = useState(
    [
      {type: 'account', text: 'Bạn có yêu cầu phê duyệt từ Nguyễn Thị Thanh Hằng', id: '123' },
      
      {type: 'event', text: 'Sự kiện "Ngày Thanh niên" sẽ bắt đầu sau 12 giờ nứa, hãy chuẩn bị', id: '123' },
    ]
  )
  const navigate = useNavigate()
  const handleClickNotification = async(item)=>{
    try {
      if(item.type == 'event'){
        navigate(`/manager/events/${item.id}`)
      }
      else{
        navigate(`/${user.role}/accounts/${item.id}`)
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra')
      console.log(error)
    }
  }
  const [showProfileOptions, setShowProfileOptions] = useState(false)
  const [showNotifitions, setShowNotifications] = useState(false)
  const [hasBadge, setHasBadge] = useState(false)
  return (
    <>
      <div className={styles.profileSection}>
        <div className={styles.profile} onClick={()=>{setShowProfileOptions(prev => !prev)}}>
          <img src={user.avatar || avatar} />
          <p>{user.fullname}</p>
          <div className={styles.profileOptions} style={showProfileOptions ? {}:{display:'none'}}>
            <button><FaUser/><>Trang cá nhân</></button>
            <button><FaSignOutAlt/><>Đăng xuất</></button>
          </div>
        </div>
        <div className={styles.notification}>
          <FaBell size={30} color="white" onClick={()=>{setShowNotifications(prev => !prev)}}/>
          <div className={styles.badge} style={hasBadge ? {}:{display:'none'}}><p >99+</p></div>
          <div className={styles.notificationList} style={showNotifitions ? {}:{display:'none'}}>
            {notifications.map((item, index)=>(
              <div key={index} onClick={()=>handleClickNotification(item)}> <p>{item.text}</p>
              
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSection;
