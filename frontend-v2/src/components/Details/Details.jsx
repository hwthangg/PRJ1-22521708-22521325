import React from "react";
import styles from './Details.module.css'
import AccountDetails from "./AccountDetails/AccountDetails";
function Details({ name, id, setOpen }) {
  return (
    <>
      <div className={styles.container}>
        {name == 'account'? <><AccountDetails id={id}/></>:<> </>}
    <div onClick={()=>setOpen(false)}>{id}</div>
      </div>
    </>
  );
}

export default Details;
