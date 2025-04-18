import React from 'react';
import styles from './ChatAI.module.css';
import trashIcon from '../../assets/AI.png'; 

const ChatAI = ({ onClick }) => {
  return (
    <div className={styles.tooltipWrapper}>
      <button className={styles.ChatButton} onClick={onClick}>
        <img src={trashIcon} alt="ChatAI" className={styles.icon} />
      </button>
      <span className={styles.tooltipText}>Tạo sự kiện với AI</span>
    </div>
  );
};

export default ChatAI;
