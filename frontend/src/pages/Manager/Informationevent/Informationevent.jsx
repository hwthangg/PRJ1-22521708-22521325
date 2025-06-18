import React, { useEffect } from 'react';
import styles from './Informationevent.module.css';
import Sidebar_infoevent from '../../../components/Sidebar_infoevent/Sidebar_infoevent';
import Info_event from '../../../components/Info_event/Info_event';
import { useParams } from 'react-router-dom';

const Informationevent = () => {
  const {eventId} = useParams()

  useEffect(()=>{
    console.log(eventId)
  }, [])
  return (
    <div className={styles.container}>
      <Sidebar_infoevent />
      <div className={styles.content}>
        <Info_event eventId={eventId} />
      </div>
    </div>
  );
};

export default Informationevent;
