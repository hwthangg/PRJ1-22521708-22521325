import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ChatAI.module.css';
import trashIcon from '../../assets/AI.png'; 

const ChatAI = ({ fixed = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ChatwithAI');
  };

  return (
    <div className={`${styles.tooltipWrapper} ${fixed ? styles.fixedChatButton : ''}`}>
      <button className={styles.ChatButton} onClick={handleClick}>
        <img src={trashIcon} alt="ChatAI" className={styles.icon} />
      </button>
      <span className={styles.tooltipText}>Tạo sự kiện với AI</span>
    </div>
  );
};

export default ChatAI;
