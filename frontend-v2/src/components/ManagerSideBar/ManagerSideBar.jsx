import React, { useEffect, useState } from "react";
import logoDoan from "../../assets/huyhieudoan.png";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import avatar from "../../assets/avatar.png";
import { FaMessage } from "react-icons/fa6";

function ManagerSideBar() {
  const navigate = useNavigate();
  const [openInfo, setOpenInfo] = useState(false);
  const handleLogout = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {}
  };

  useEffect(()=>{
    connectSocket.connect();
    
        connectSocket.on("connect", () => {
          console.log("✅ Connected to socket:", connectSocket.id);
        });

         connectSocket.on("disconnect", () => {
              console.log("❌ Disconnected from socket");
            });
        
            return () => {
              connectSocket.disconnect();
              connectSocket.off("connect");
              connectSocket.off("disconnect");
          
            };
  },[])
  return (
    <>
      <div
        style={{
          width: "360px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "fixed",
            boxSizing: "border-box",
            height: "100vh",
            width: "360px",
            display: "flex",
            flexDirection: "column",

            backgroundColor: "#073763",
          }}
        >
          <div
            style={{
              padding: "20px 15px 15px 15px",
              flex: 1,

              display: "flex",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "40px",
              }}
            >
              {" "}
              <div
                style={{
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src={logoDoan}
                  style={{ height: "120px", width: "120px" }}
                />
                <p
                  style={{
                    fontSize: "22px",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  HỆ THỐNG HỖ TRỢ <br /> NGHIỆP VỤ CÔNG TÁC ĐOÀN
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <NavLink
                  to="/manager/news"
                  style={{
                    all: "unset",
                    color: "white",
                    height: "60px",
                    borderBottom: "1px solid",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "large",
                    paddingLeft: "40px",
                    cursor: "pointer",
                  }}
                >
                  Bảng tin
                </NavLink>
                <NavLink
                  to="/manager/members"
                  style={{
                    all: "unset",
                    color: "white",
                    height: "60px",
                    borderBottom: "1px solid",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "large",
                    paddingLeft: "40px",
                    cursor: "pointer",
                  }}
                >
                  Danh sách đoàn viên
                </NavLink>
                <NavLink
                 to="/manager/request-members"
                  style={{
                    all: "unset",
                    color: "white",
                    height: "60px",
                    borderBottom: "1px solid",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "large",
                    paddingLeft: "40px",
                    cursor: "pointer",
                  }}
                >
                  Yêu cầu phê duyệt
                </NavLink>
                <NavLink
                 to="/manager/events"
                  style={{
                    all: "unset",
                    color: "white",
                    height: "60px",
                    borderBottom: "1px solid",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "large",
                    paddingLeft: "40px",
                    cursor: "pointer",
                  }}
                >
                  Danh sách sự kiện
                </NavLink>
                <NavLink
                 to="/manager/documents"
                  style={{
                    all: "unset",
                    color: "white",
                    height: "60px",
                    borderBottom: "1px solid",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "large",
                    paddingLeft: "40px",
                    cursor: "pointer",
                  }}
                >
                  Danh sách tài liệu
                </NavLink>
                <NavLink
                  to="/manager/statistic"
                  style={{
                    all: "unset",
                    color: "white",
                    height: "60px",
                    borderBottom: "1px solid",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontSize: "large",
                    paddingLeft: "40px",
                    cursor: "pointer",
                  }}
                >
                  Báo cáo thống kê
                </NavLink>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#3d85c6",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "15px",

                  position: "relative",
                }}
                onClick={() => setOpenInfo((prev) => !prev)}
              >
                <img
                  src={avatar}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "100px",
                    border: "1px solid white",
                  }}
                />
                <p
                  style={{
                    color: "white",
                    fontWeight: "550",
                    fontSize: "large",
                  }}
                >
                  Đặng Hữu Thắng
                </p>
                {openInfo ? (
                  <>
                    {" "}
                    <div
                      style={{
                        position: "absolute",
                        borderRadius: "10px",
                        backgroundColor: "white",
                        boxShadow: "0 0 10px #616161",
                        bottom: "105%",

                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        left: "10px",
                      }}
                    >
                      <div style={{ padding: "10px" }} onClick={() => alert(1)}>
                        Hồ sơ cá nhân
                      </div>
                      <div
                        style={{ padding: "10px" }}
                        onClick={() => handleLogout()}
                      >
                        Đăng xuất
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <FaMessage
                size={30}
                color="white"
                onClick={() => navigate("/manager/chat")}
              />
              <IoNotifications size={35} color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerSideBar;
