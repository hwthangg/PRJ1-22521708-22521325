import React, { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import avatar from "../../assets/avatar.jpg";
import socket from "../../socket";
import Chapter from "../../../../backend/models/chapter.model";

const Chat = ({ chat }) => {
  // const [messages, setMessages] = useState([
  //   { id: 1, text: 'Bạn cho mình hỏi thông tin liên hệ của chi đoàn được không ạ? Bên mình có chương trình về cựu chiến binh nên muốn hợp tác với chi đoàn bạn để cùng tổ chức.', sender: 'left' },
  //   { id: 2, text: 'Đây là thông tin liên hệ của mình, Zalo: 0123456789', sender: 'right' }
  // ]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage = { to: chat._id, text: input, sender: "right" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    socket.emit("chat", newMessage); // chỉ gửi 1 tin nhắn
    console.log(chat);
    return;
  };
  useEffect(() => {
   
  }, []);
  useEffect(() => {
    if (!chat) return;
    fetch(`http://localhost:5000/api/messages/messages/${chat._id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const history = data.map((item) => ({
          to:
            item.sender == item.members[0] ? item.members[1] : item.members[0],
          text: item.content,
          sender: item.sender == chat._id ? "left" : "right",
        }));
        setMessages(history);
      });
    console.log("chat", chat);
    setName(chat.name);

    const handleChat = (msg) => {
      setMessages((prev) => [...prev, { ...msg, sender: "left" }]);
    };

    socket.on("chat", handleChat);

    // Cleanup listener trước khi gắn lại (hoặc khi component bị unmount)
    return () => {
      socket.off("chat", handleChat);
    };
  }, [chat]); // Gắn và dọn listener mỗi khi chat thay đổi

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <img src={avatar} alt="avatar" className={styles.headerAvatar} />
        <span>{name}</span>
      </div>

      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.sender === "right" ? styles.right : styles.left
            }`}
          >
            <div className={styles.text}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nhập tin nhắn..."
          className={styles.input}
        />
        <button onClick={handleSend} className={styles.sendButton}>
          <span>&#9658;</span>
        </button>
      </div>
    </div>
  );
};

export default Chat;
