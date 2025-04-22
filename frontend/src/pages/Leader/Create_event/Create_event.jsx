import React from 'react';
import styles from './Create_event.module.css';
import Sidebar_infoevent from '../../../components/Sidebar_infoevent/Sidebar_infoevent';
import Addevent from '../../../components/Addevent/Addevent';

const Create_event = () => {
  return (
    <div className={styles.container}>
      <Sidebar_infoevent />
      <div className={styles.content}>
        <Addevent />
      </div>
    </div>
  );
};

export default Create_event;
