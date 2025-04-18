import React from 'react';
import styles from './SidebarChat.module.css';

const SidebarChat = ({ name, message, avatar, isActive, onClick }) => {
  return (
    <div
      className={`${styles.chatItem} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <img src={avatar} alt={name} className={styles.avatar} />
      <div className={styles.chatInfo}>
        <div className={styles.name}>{name}</div>
        <div className={styles.messageBox}>
          <div className={styles.message}>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default SidebarChat;
