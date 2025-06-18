import React from "react";
import styles from "./Dropdown.module.css";
export default function Dropdown({
  width = "150px",
  label,
  name,
  value,
  onChangeValue,
  options,
}) {
  return (
    <div className={styles.container} style={{ width: `${width}%` }}>
      {label ? (
        <>
          {" "}
          <label htmlFor={name}>{label}</label>
        </>
      ) : (
        <></>
      )}
      <div className={styles.selectContainer}>
        <select
          name={name}
          value={value}
          onChange={onChangeValue}
          className={styles.dropdown}
        >
          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
