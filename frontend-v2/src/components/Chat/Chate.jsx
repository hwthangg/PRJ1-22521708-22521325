import React, { useEffect, useRef, useState } from "react";
import styles from "./Chate.module.css";
import avatar from "../../assets/avatar.png";
import { BsFillSendFill } from "react-icons/bs";
import { connectSocket } from "../../../connectSocket";
import { toast } from "react-toastify";

export default function Chate() {
  const [data, setData] = useState([]);
  const [me, setMe] = useState("");
  const [currentManager, setCurrentManager] = useState({});
  const [mesage, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [chat, setChat] = useState([]);

  const bottomRef = useRef(null);

  const sendMessage = async () => {
    try {
      setChat((prev) => [
        ...prev,
        { senderId: me._id, message: mesage, status: "unread" },
      ]);
      const send = { me: me._id, partner: currentManager._id, text: mesage };
      connectSocket.emit("chat", send);
      setMessage("");
    } catch (error) {}
  };

  const RenderChat = ({ me, item }) => {
    return (
      <div
        style={{
          display: "flex",
          margin: "10px 0",
          justifyContent:
            item.senderId != me?._id ? "flex-start" : "flex-end",
          flexDirection: "row",
          alignItems: "center",
          gap: "15px",
          
        }}
        ref={bottomRef}
      >
        {item.senderId != me?._id && (
          <img
            src={currentManager.avatar || avatar}
            style={{ width: "48px", aspectRatio: "1/1" }}
          />
        )}
        <div
          style={{
            boxShadow: "0 0 5px #9e9e9e",
            backgroundColor: "white",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          <p style={{ textAlign: "justify" }}>{item.message}</p>
        </div>
        {item.senderId == me?._id && (
          <img
            src={currentManager.avatar || avatar}
            style={{ width: "48px", aspectRatio: "1/1" }}
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/accounts?page=1&limit=1000&search=${search}&status=active&role=all&sortBy=createdAt&sortOrder=asc`
        );
        const data = await res.json();
        setData(data.data.accounts);
      } catch (error) {}
    };

    const fetchMe = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        setMe(data.data);
      } catch (error) {}
    };

    fetchManagers();
    fetchMe();
  }, [search]);

  useEffect(() => {
    if (!currentManager._id) return;

    

    connectSocket.on("chat", (obj) => {
      setChat((prev) => [...prev, obj]);
      console.log(obj);
          toast.error("Tin nhắn đã được gửi!");
    });


    return () => {

      connectSocket.off("chat");
    };
  }, [currentManager]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#e3f2fd",
        flex: "1",
      }}
    >
      {/* Danh sách quản lý */}
      <div
        style={{
          borderTopRightRadius: "30px",
          boxShadow: "0 0 5px #9e9e9e",
          width: "40%",
          padding: "20px",
          height: "100%",
          gap: "20px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Nhập thông tin tài khoản tìm kiếm"
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          style={{
            flexDirection: "column",
            borderRadius: "20px",
            padding: "20px 20px",
            boxShadow: "0 0 5px #073763",
            height: 'fit-content',
          }}
        >
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#0d47a1",
              fontWeight: "bold",
              fontSize: "large",
            }}
          >
            Danh sách quản lý chi đoàn
          </div>
          <div style={{ overflowY: "auto", height: "400px" }}>
            {data.map((item) => (
              <div
                key={item._id}
                onClick={() => setCurrentManager(item)}
                style={{
                  borderBottom: "1px solid",
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={item.avatar || avatar}
                  style={{ width: "60px", aspectRatio: "1/1" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>{item.fullname}</p>
                  <p>{item.managerOf?.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Khung chat */}
      {currentManager._id ? (
        <div style={{ flex: 5, display: "flex", flexDirection: "column" }}>
          {/* Header người nhận */}
          <div style={{ padding: "30px 0" }}>
            <div
              style={{
                padding: "15px",
                display: "flex",
                gap: "15px",
                backgroundColor: "#073763",
                alignItems: "center",
              }}
            >
              <img
                src={currentManager.avatar || avatar}
                style={{ width: "60px", aspectRatio: "1/1" }}
              />
              <div style={{ color: "white" }}>
                <p>{currentManager.fullname}</p>
                <p>{currentManager.managerOf?.name}</p>
              </div>
            </div>
          </div>

          {/* Tin nhắn */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ height: "100%" }}>
              <div
                style={{
                  padding: "0 10px",
                  height: "460px",
                  overflowY: "auto",
                }}
                
              >
                {chat.map((item, index) => (
                  <RenderChat key={index} item={item} me={me} />
                ))}
                
              </div>
            </div>

            {/* Gửi tin nhắn */}
            <div
              style={{
                height: "60px",
                display: "flex",
                padding: "20px",
                backgroundColor: "#3d85c6",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  boxShadow: "0 0 5px black",
                  padding: "10px",
                  flex: 1,
                  display: "flex",
                  gap: "20px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  alignItems: "center",
                }}
              >
                <input
                  style={{
                    border: "none",
                    outline: "none",
                    caretColor: "black",
                    flex: 1,
                  }}
                  type="text"
                  placeholder="Nhập nội dung tin nhắn"
                  value={mesage}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                />
                <div onClick={sendMessage} style={{ cursor: "pointer" }}>
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
          <p
            style={{
              fontSize: "large",
              fontWeight: "bold",
              color: "#0d47a1",
            }}
          >
            Chọn quản lý muốn trò chuyện
          </p>
        </div>
      )}
    </div>
  );
}
