import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import styles from "./Chat.module.css";
import { getSocket } from "../../../../utils/socket";
import avatar from "../../../assets/avatar.png";
import { toast } from "react-toastify";

export default function Chat() {
  const [me, setMe] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [currentContact, setCurrentContact] = useState(null);

  const [admin, setAdmin] = useState(null);
  const [managers, setManagers] = useState([]);
  const [manager, setManager] = useState(null);
  const [members, setMembers] = useState([]);

  // Lấy thông tin người dùng hiện tại
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/auth`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setMe(data.data);
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi lấy thông tin người dùng");
      }
    };
    fetchMe();
  }, []);

  // Lấy danh sách liên hệ
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/messages/contacts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        console.log(data.data)
        if (data.data.admin) setAdmin(data.data.admin);
        if (data.data.managers) setManagers(data.data.managers);
        if (data.data.manager) setManager(data.data.manager);
        if (data.data.members) setMembers(data.data.members);
      } catch (error) {
        console.error(error);
        toast.error("Lỗi khi lấy danh sách liên hệ");
      }
    };
    fetchContacts();
  }, [search]);

  // Lấy tin nhắn với người hiện tại
  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentContact) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/messages/${currentContact._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setChat(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [currentContact]);

  // Lắng nghe socket
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleReceive = (data) => {
      setChat((prev) => [...prev, data]);
    };

    socket.on("chat", handleReceive);
    return () => {
      socket.off("chat", handleReceive);
    };
  }, []);

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!message || !currentContact || !me) return;

    const socket = getSocket();
    socket.emit("chat", { text: message, to: currentContact._id });

    setChat((prev) => [
      ...prev,
      { senderId: me._id, message, status: "unread" },
    ]);
    setMessage("");

    try {
      await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/messages/${currentContact._id}`,
        {
          method: "POST",
          body: JSON.stringify({ text: message }),
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Không gửi được tin nhắn");
    }
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#e3f2fd", height: "100%" }}>
      {/* Phần chat */}
      {currentContact ? (
        <div className={styles.chatBox}>
          {/* Header */}
          <div style={{ padding: "30px 0" }}>
            <div
              style={{
                padding: "15px",
                display: "flex",
                gap: "15px",
                backgroundColor: "#073763",
                color: "white",
              }}
            >
              <img
                src={currentContact.avatar?.path || avatar}
                style={{ width: "60px", aspectRatio: "1/1" }}
              />
              <div>
                <p>{currentContact.fullname}</p>
                <p>{currentContact.managerOf?.name}</p>
              </div>
            </div>
          </div>

          {/* Nội dung tin nhắn */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                height: "100%",
                overflowY: "auto",
                padding: 20,
                backgroundColor: "white",
                border: "1px solid",
                borderRadius: 10,
                margin: 10,
              }}
            >
              {chat.map((item, index) => (
                <RenderChat
                  key={index}
                  item={item}
                  me={me}
                  partner={currentContact}
                />
              ))}
            </div>

            {/* Input */}
            <div style={{ backgroundColor: "#3d85c6", padding: 20 }}>
              <div
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 10,
                  padding: "0 10px",
                }}
              >
                <input
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    height: 30,
                  }}
                  type="text"
                  placeholder="Nhập nội dung tin nhắn"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div onClick={sendMessage}>
                  <BsFillSendFill size={30} color="#073763" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "large", fontWeight: "bold", color: "#0d47a1" }}>
            Chọn người để bắt đầu trò chuyện
          </p>
        </div>
      )}

      {/* Danh sách liên hệ */}
      <div className={styles.managerList}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Nhập thông tin tài khoản tìm kiếm"
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ padding: 20 }}>
          <p style={{ fontSize: "large", fontWeight: "bold", color: "#0d47a1" }}>
            Danh sách liên hệ
          </p>
        </div>

        <div style={{ overflowY: "auto", height: "80%" }}>
          {admin && admin._id !== me?._id && (
            <>
              <p style={{ fontWeight: "bold", color: "#0d47a1", padding: "10px" }}>
                Quản trị viên
              </p>
              <ContactItem item={admin} onClick={() => setCurrentContact(admin)} />
            </>
          )}

          {managers.length > 0 &&   (
            <>
              <p style={{ fontWeight: "bold", color: "#0d47a1", padding: "10px" }}>
                Các quản lý chi đoàn
              </p>
              {managers
                .filter((item) => item._id !== me?._id)
                .map((item) => (
                  <ContactItem
                    key={item._id}
                    item={item}
                    onClick={() => setCurrentContact(item)}
                  />
                ))}
            </>
          )}

          {manager && manager._id && manager._id !== me?._id && (
            <>
              <p style={{ fontWeight: "bold", color: "#0d47a1", padding: "10px" }}>
                Quản lý chi đoàn 
              </p>
              <ContactItem
                item={manager}
                onClick={() => setCurrentContact(manager)}
              />
            </>
          )}

          {members.length > 0 && (
            <>
              <p style={{ fontWeight: "bold", color: "#0d47a1", padding: "10px" }}>
                Danh sách đoàn viên
              </p>
              {members
                .filter((item) => item._id !== me?._id)
                .map((item) => (
                  <ContactItem
                    key={item._id}
                    item={item}
                    onClick={() => setCurrentContact(item)}
                  />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Component hiển thị tin nhắn
function RenderChat({ me, item, partner }) {
  const isMe = item.senderId === me?._id;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMe ? "flex-end" : "flex-start",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {!isMe && (
        <img
          src={partner.avatar?.path || avatar}
          style={{ width: "48px", aspectRatio: "1/1" }}
        />
      )}
      <div
        style={{
          backgroundColor: "white",
          padding: "10px 20px",
          borderRadius: "10px",
          boxShadow: "0 0 5px #9e9e9e",
        }}
      >
        <p style={{ textAlign: "justify" }}>{item.message}</p>
      </div>
      {isMe && (
        <img
          src={me.avatar?.path || avatar}
          style={{ width: "48px", aspectRatio: "1/1" }}
        />
      )}
    </div>
  );
}

// Component hiển thị một liên hệ
function ContactItem({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderBottom: "1px solid",
        display: "flex",
        gap: "15px",
        padding: "10px",
        cursor: "pointer",
      }}
    >
      <img
        src={item.avatar?.path || avatar}
        style={{ width: "60px", aspectRatio: "1/1" }}
      />
      <div>
        <p>{item.fullname}</p>
        <p>{item.managerOf?.name || item.email}</p>
      </div>
    </div>
  );
}
