import React from "react";
import logoDoan from "../../../assets/huyhieudoan.png";
import styles from './LogoSection.module.css'
function LogoSection() {
  return (
    <div className={styles.logoSection}>
      <img src={logoDoan} className={styles.logo} />
      <p className={styles.title}>
        HỆ THỐNG HỖ TRỢ <br /> NGHIỆP VỤ CÔNG TÁC ĐOÀN
      </p>
    </div>
  );
}

export default LogoSection;
