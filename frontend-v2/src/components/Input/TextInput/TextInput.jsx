import React from "react";
import styles from "./TextInput.module.css";
function TextInput({
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
          <input
            type="text"
            className={styles.input}
            id={name}
            name={name}
            value={value}
            onChange={onChangeValue}
            placeholder={placeholder}
     
          />
        </div>
      </div>
    </>
  );
}

export default TextInput;
