// File: pages/leader/ChatwithAI.jsx
import React from 'react';
import styles from './ChatwithAI.module.css';
import { ArrowLeft, Send } from 'lucide-react';

const ChatwithAI = () => {
  const topics = [
    'Giáo dục', 'Chính trị', 'Công nghệ', 'Thể chất',
    'Tình nguyện', 'Môi trường', 'Nghệ thuật'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <div className={styles.backArrow}>
          <ArrowLeft size={20} />
        </div>

        <h2 className={styles.title}>Hãy chọn chủ đề cho sự kiện của bạn</h2>

        <div className={styles.topics}>
{topics.map((topic, index) => (
  <label key={index} className={styles.checkboxLabel}>
    <input type="checkbox" />
    <span>{topic}</span>
  </label>
))}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Bạn có yêu cầu gì khác không"
            className={styles.inputField}
          />
          <button className={styles.sendButton}>
            <Send size={16} />
          </button>
        </div>
      </div>

      <div className={styles.rightPane}>
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default ChatwithAI;
