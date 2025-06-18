import React from "react";
import logo from "../../../assets/logo.webp";
import styles from "./LogoSection.module.css";
function LogoSection() {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} />
      <p>HỆ THỐNG QUẢN LÝ ĐOÀN VIÊN</p>
    </div>
  );
}

export default LogoSection;
