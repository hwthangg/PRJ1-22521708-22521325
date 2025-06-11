import React, { useEffect, useState } from "react";
import styles from "./Avatar.module.css";
import avatar from "../../../assets/avatar.png";
function Avatar({ value, onChangeValue}) {


  useEffect(() => {
    console.log(value)
  }, [value]);
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={value || avatar} alt="avatar" />
      </div>
      <div className={styles.changeImgBtn}>
        <label htmlFor="avatar">Chọn ảnh đại diện</label>
      </div>
      <input
        type="file"
        id="avatar"
        name="avatar"
        style={{ display: "none" }}
        onChange={onChangeValue}
      />
    </div>
  );
}

export default Avatar;
