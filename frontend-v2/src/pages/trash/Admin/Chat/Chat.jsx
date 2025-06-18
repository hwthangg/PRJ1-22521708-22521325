import React, { useEffect, useState } from "react";

import { BsFillSendFill } from "react-icons/bs";
import { connectSocket } from "../../../../connectSocket";

export default function Chate() {
  const [data, setData] = useState([]);
  const [me, setMe] = useState("");
  const [currentManager, setCurrentManager] = useState({});
  const [mesage, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [chat, setChat] = useState([
    // { senderId: "partner", text: "hell o", status: "read" },
    // {
    //   senderId: "me",
    //   text: "hello u hello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello uhello u",
    //   status: "read",
    // },
  ]);
  const sendMessage = async (e) => {
    try {
      setChat((prev) => [
        ...prev,
        { senderId: me._id, message: mesage, status: "unread" },
      ]);
      setMessage("");
    } catch (error) {}
  };
  const RenderChat = ({ me, item }) => {
    return (
      <>
        <div
          style={{
            display: "flex",

            justifyContent:
              item.senderId != me?._id ? "flex-start" : "flex-end",
            flexDirection: "row",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {item.senderId != me?._id ? (
            <>
              <img
                src={currentManager.avatar || avatar}
                style={{ width: "48px", aspectRatio: "1/1" }}
              />
            </>
          ) : (
            <></>
          )}
          <div
            style={{
              boxShadow: "0 0 5px #9e9e9e",
              backgroundColor: "white",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
          >
            {" "}
            <p style={{ textAlign: "justify" }}>{item.message}</p>{" "}
          </div>

          {item.senderId == me?._id ? (
            <>
              {" "}
              <img
                src={currentManager.avatar || avatar}
                style={{ width: "48px", aspectRatio: "1/1" }}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/accounts?page=1&limit=1000&search=${search}&status=active&role=manager&sortBy=createdAt&sortOrder=asc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setData(data.data.accounts);
      } catch (error) {}
    };

    const fetchMe = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log(data.data._id);
        setMe(data.data);
      } catch (error) {}
    };

    fetchManagers();
    fetchMe();

    console.log(chat);
  }, [search]);
  useEffect(() => {
    console.log(data);
    console.log(me);
  }, [data, me]);
  useEffect(() => {
    if (!currentManager._id) return;

    // Kết nối socket
    connectSocket.connect();

    connectSocket.on("connect", () => {
      console.log("✅ Connected to socket:", connectSocket.id);
    });
    const send = {me: me._id, partner: currentManager._id, text: 'hello'}
    connectSocket.emit("chat", send);
    connectSocket.on("chat", (obj) => {
      setChat((prev) => [...prev, obj]);
    });

    connectSocket.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
    });

    return () => {
      // Cleanup đúng cách
      connectSocket.disconnect();
      connectSocket.off("connect");
      connectSocket.off("disconnect");
    };
  }, [currentManager]);
  return (
    <>
      <div
        style={{
          display: "flex",
          // border: "10px solid",
          boxSizing: "border-box",
          backgroundColor: "#e3f2fd",
          flex: "1",
        }}
      >
        <div
          style={{
            borderTopRightRadius: "30px",
            boxShadow: "0 0 5px #9e9e9e",
            width: "40%",
            padding: "20px",
            boxSizing: "border-box",
            height: "100vh",
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
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",

              flexDirection: "column",
              borderRadius: "20px",
              padding: "0 20px",
              boxSizing: "border-box",
              boxShadow: "0 0 5px #073763",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                padding: "20px",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  fontSize: "large",
                  fontWeight: "bold",
                  color: "#0d47a1",
                }}
              >
                Danh sách quản lý chi đoàn
              </p>
            </div>
            <div
              style={{
                flexDirection: "column",
                overflowY: "auto",
                height: "36em",
              }}
            >
              {data.map((item, index) => (
                <div
                  onClick={() => setCurrentManager(item)}
                  key={item._id}
                  style={{
                    borderBottom: "1px solid",
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.avatar || avatar}
                      style={{ width: "60px", aspectRatio: "1/1" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      justifyContent: "flex-start",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <p>{item.fullname}</p>
                    </div>
                    <div>
                      <p>{item.managerOf?.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {currentManager._id ? (
          <>
            {" "}
            <div
              style={{
                flex: 5,
                display: "flex",
                flexDirection: "column",

                boxSizing: "border-box",
              }}
            >
              <div style={{ padding: "30px 0" }}>
                <div
                  style={{
                    padding: "15px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "#073763",
                  }}
                >
                  <div>
                    <img
                      src={currentManager.avatar || avatar}
                      style={{ width: "60px", aspectRatio: "1/1" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      justifyContent: "flex-start",
                      alignItems: "start",
                      color: "white",
                    }}
                  >
                    <div>
                      <p>{currentManager.fullname}</p>
                    </div>
                    <div>
                      <p>{currentManager.managerOf?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                <div
                  style={{
                    height: "100%",
                    overflowY: "auto",
                    padding: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {chat.map((item, index) => (
                      <RenderChat key={index} item={item} me={me} />
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    height: "60px",
                    display: "flex",
                    flexDirection: "row",
                    padding: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3d85c6",
                  }}
                >
                  <div
                    style={{
                      boxShadow: "0 0 5px black",
                      padding: "10px",
                      height: "30px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "20px",
                      backgroundColor: "white",
                      borderRadius: "10px",
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
                    />
                    <div onClick={() => sendMessage()}>
                      <BsFillSendFill size={30} color="#073763" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
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
          </>
        )}
      </div>
    </>
  );
}
