import React from "react";
import styles from "./Textarea.module.css";
function Textarea({
  width,
  name,
  placeholder,
  value,
  onChangeValue,
  label,
}) {
  return (
    <>
      <div className={styles.container}  style={{ width: `${width}%` }}>
        {label ? (
          <>
            {" "}
            <label htmlFor={name}>{label}</label>
          </>
        ) : (
          <></>
        )}

        <div className={styles.inputContainer} >
          <textarea
            
            className={styles.input}
            id={name}
            name={name}
            value={value}
            onChange={onChangeValue}
            placeholder={placeholder}
            rows={10}
     
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default Textarea;
