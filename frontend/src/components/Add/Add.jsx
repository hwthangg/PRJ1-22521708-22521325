import React from 'react';
import styles from './Add.module.css';
import trashIcon from '../../assets/addicon.png'; 

const Add = ({ onClick }) => {
  return (
    <button className={styles.addButton} onClick={onClick}>
      <img src={trashIcon} alt="Add" className={styles.icon} />
    </button>
  );
};

export default Add;
