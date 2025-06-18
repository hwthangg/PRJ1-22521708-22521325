import React from "react";
import styles from "./PasswordInput.module.css";

import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
function PasswordInput({
  width,
  name,
  placeholder = "Enter any text",
  value,
  onChangeValue,
  label,
}) {
  const [toggle, setToggle] = useState(false)
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
            type={toggle ? 'text' : 'password'}
            className={styles.input}
            id={name}
            name={name}
            value={value}
            onChange={onChangeValue}
            placeholder={placeholder}
     
          />
          <div onClick={()=>setToggle(prev => !prev)}>{toggle ? <><LuEyeClosed size={20}/></>:<><LuEye size={20}/></>}</div>

        </div>
      </div>
    </>
  );
}

export default PasswordInput;
