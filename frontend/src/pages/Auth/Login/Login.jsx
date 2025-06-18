import React, { useContext, useEffect } from "react";
import styles from "./Login.module.css";
import { FaRegUser } from "react-icons/fa";
import { LuLock } from "react-icons/lu";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import banner from "../../../assets/banner.png";

function Login() {
  const {
    ISLOGGED: { setIsLogged },
  } = useContext(AuthContext);
  const [keyAuth, setKeyAuth] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {};

  return (
    // <>
    // <div className={styles.container} style={{border:'12px solid '}}>
    //   <div className={styles.container_login}>
    //     <div className={styles.container_login_form}>
    //       <p className={styles.form_title}>ĐĂNG NHẬP</p>
    //       <div>
    //         <label>Email hoặc số điện thoại</label>
    //         <div className={styles.input_field}>
    //           <FaRegUser size={20} />
    //           <input
    //             type="text"
    //             placeholder="Nhập email hoặc số điện thoại"
    //             value={keyAuth}
    //             onChange={(e) => setKeyAuth(e.target.value)}
    //           />
    //         </div>
    //         {/* <div className={styles.error}>Error!</div> */}

    //         <label>Mật khẩu</label>
    //         <div className={styles.input_field}>
    //           <LuLock size={20} />
    //           <input
    //             type={!isVisiblePassword ? "text" : "password"}
    //             placeholder="Nhập mật khẩu của bạn"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //           <div
    //             className={styles.toggle_password}
    //             onClick={() => setTogglePassword(!isVisiblePassword)}
    //           >
    //             {isVisiblePassword ? (
    //               <IoEyeOutline size={20} />
    //             ) : (
    //               <IoEyeOffOutline size={20} />
    //             )}
    //           </div>
    //         </div>
    //         {/* <div className={styles.error}>Error!</div> */}

    //         <div className={styles.actions}>
    //           <button onClick={handleLogin}>ĐĂNG NHẬP</button>
    //           <a href="#">Quên mật khẩu?</a>
    //         </div>

    //         <div className={styles.register}>
    //           Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className={styles.container_image}></div>
    // </div>
    // </>

    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          border: "1px solid",
          boxSizing: "border-box",
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            border: "1px solid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{display:'flex', border:'1px solid', padding: "40px", width:"400px", borderRadius: "20px", gap:'10px', flexDirection:'column'}}>
         
              <label style={{fontFamily:'serif', color:'ActiveBorder'}}>Email hoặc số điện thoại</label>
              <div className={styles.input_field}>
                <FaRegUser size={20} />
                <input
                  type="text"
                  placeholder="Nhập email hoặc số điện thoại"
                  value={keyAuth}
                  onChange={(e) => setKeyAuth(e.target.value)}
                />
              </div>
              {/* <div className={styles.error}>Error!</div> */}

              <label>Mật khẩu</label>
              <div className={styles.input_field}>
                <LuLock size={20} />
                <input
                  type={!isVisiblePassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className={styles.toggle_password}
                  onClick={() => setTogglePassword(!isVisiblePassword)}
                >
                  {isVisiblePassword ? (
                    <IoEyeOutline size={20} />
                  ) : (
                    <IoEyeOffOutline size={20} />
                  )}
                </div>
              </div>
              {/* <div className={styles.error}>Error!</div> */}

              <div className={styles.actions}>
                <button onClick={handleLogin}>ĐĂNG NHẬP</button>
                <a href="#">Quên mật khẩu?</a>
              </div>

              <div className={styles.register}>
                Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
              </div>
            
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            border: "1px solid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={banner} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    </>
  );
}

export default Login;
