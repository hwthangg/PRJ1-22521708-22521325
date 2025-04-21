import React from 'react';
import styles from './Informationevent.module.css';
import Sidebar_infoevent from '../../../components/Sidebar_infoevent/Sidebar_infoevent';
import Info_event from '../../../components/Info_event/Info_event';

const Informationevent = () => {
  return (
    <div className={styles.container}>
      <Sidebar_infoevent />
      <div className={styles.content}>
        <Info_event />
      </div>
    </div>
  );
};

export default Informationevent;
