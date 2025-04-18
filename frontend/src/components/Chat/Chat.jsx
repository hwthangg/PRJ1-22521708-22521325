import React, { useState } from 'react';
import styles from './Chat.module.css';
import avatar from '../../assets/avatar.jpg';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Bạn cho mình hỏi thông tin liên hệ của chi đoàn được không ạ? Bên mình có chương trình về cựu chiến binh nên muốn hợp tác với chi đoàn bạn để cùng tổ chức.', sender: 'left' },
    { id: 2, text: 'Đây là thông tin liên hệ của mình, Zalo: 0123456789', sender: 'right' }
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'right' }]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
  <img src={avatar} alt="avatar" className={styles.headerAvatar} />
  <span>Chi đoàn KP B</span>
</div>

      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${msg.sender === 'right' ? styles.right : styles.left}`}
          >
            <img src={avatar} alt="avatar" className={styles.avatar} />
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
