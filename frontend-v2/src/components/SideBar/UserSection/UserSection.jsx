import React, { useEffect, useState } from "react";
import styles from "./UserSection.module.css";
import avatar from "../../../assets/avatar.png";
import { FaBell, FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AccountDetails from "../../AccountDetails/AccountDetails";
import { useAuth } from "../../../../contexts/Auth";
import { getSocket } from "../../../../utils/socket";

function UserSection({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showNotifitions, setShowNotifications] = useState(false);
  const [hasBadge, setHasBadge] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);
  const [socketReady, setSocketReady] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Đợi socket sẵn sàng
  useEffect(() => {
    const interval = setInterval(() => {
      const socket = getSocket();
      if (socket) {
        setSocketReady(true);
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Lắng nghe sự kiện từ socket
  useEffect(() => {
    if (!socketReady) return;
    const socket = getSocket();

    const handleAdminReq = (text) => {
      const newNotification = {
        id: Date.now(), // ID tạm thời
        text,
        type: "info",
        status: "unread",
      };
      setNotifications((prev) => [newNotification, ...prev]);
      setHasBadge((prev) => prev + 1);
      toast.info(text);
    };

    socket.on("admin_req", handleAdminReq);

    return () => {
      socket.off("admin_req", handleAdminReq);
    };
  }, [socketReady]);

  // Fetch toàn bộ thông báo khi mở danh sách
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/notifications`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setNotifications(data.data);
        setHasBadge(data.data.filter((item) => item.status === "unread").length);
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra khi lấy thông báo");
      }
    };

   fetchNotification()
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleClickNotification = async (item) => {
    try {
      if (item.type === "event") {
        navigate(`/manager/events/${item.id}`);
      } else {
        navigate(`/${user.role}/accounts/${item.id}`);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      console.log(error);
    }
  };

  const readNotification = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/notifications`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(notifications),
        }
      );
      setHasBadge(0)
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi đánh dấu thông báo");
    }
  };

  return (
    <>
      <div className={styles.profileSection}>
        <div
          className={styles.profile}
          onClick={() => setShowProfileOptions((prev) => !prev)}
        >
          <img src={user?.avatar?.path || avatar} />
          <p>{user?.fullname}</p>
          <div
            className={styles.profileOptions}
            style={showProfileOptions ? {} : { display: "none" }}
          >
            <button onClick={() => setOpenProfile(true)}>
              <FaUser />
              <>Trang cá nhân</>
            </button>
            <button onClick={handleLogout}>
              <FaSignOutAlt />
              <>Đăng xuất</>
            </button>
          </div>
        </div>

        <div
          className={styles.notification}
          onClick={() => {
            setShowNotifications((prev) => !prev);
            readNotification();
          }}
        >
          <FaBell size={30} color="white" />
          <div
            className={styles.badge}
            style={hasBadge ? {} : { display: "none" }}
          >
            <p>{hasBadge}</p>
          </div>
          <div
            className={styles.notificationList}
            style={showNotifitions ? {} : { display: "none" }}
          >
            {notifications.map((item, index) => (
              <div key={index} onClick={() => handleClickNotification(item)}>
                <p style={{fontWeight: item.status == 'unread'?'bold':'normal'}}>{item.text} </p>
              </div>
            ))}
          </div>
        </div>

        {openProfile && (
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              top: 0,
              left: 0,
              zIndex: 100,
              display: "flex",
            }}
          >
            <AccountDetails
              id={user._id}
              open={setOpenProfile}
              profile={true}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default UserSection;
