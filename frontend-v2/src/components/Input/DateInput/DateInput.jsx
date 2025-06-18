import React from "react";
import styles from "./DateInput.module.css";
function DateInput({
  width,
  name,
  value,
onChangeValue,
  label,
}) {
  return (
    <>
      <div className={styles.container}             style={{ width: `${width}%` }}>
        {label ? (
          <>
            {" "}
            <label htmlFor={name}>{label}</label>
          </>
        ) : (
          <></>
        )}

        <div className={styles.inputContainer}>
          <input
            type="date"
            className={styles.input}
            id={name}
            name={name}
            value={value}
            onChange={onChangeValue}

          />
        </div>
      </div>
    </>
  );
}

export default DateInput;
