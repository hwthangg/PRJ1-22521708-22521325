import React, { useContext, useEffect } from "react";
import styles from "./Login.module.css";
import { FaRegUser } from "react-icons/fa";
import { LuLock } from "react-icons/lu";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import socket from "../../../socket";



function Login() {
  const {ISLOGGED:{setIsLogged}} = useContext(AuthContext)
  const [keyAuth, setKeyAuth] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async() =>{
    alert('login')
    const credentials = {email: null, phone: null, password: null}
    credentials.password = password
    if(keyAuth.includes('@')){
      credentials.email = keyAuth
    }
    else{
      credentials.phone = keyAuth
    }

    console.log(JSON.stringify({credentials}))

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credentials }),
    });

    const data =  await res.json()
    console.log(data)
    const account = data.data.account

    if(account.role == 'manager'){
      navigate('/home')
    }


  }

  useEffect(()=>{
   socket.on('connect', () => {
      console.log('✅ Connected with ID:', socket.id);
    });
    socket.emit('send_invite', {
  senderId: '682cebe579ac6e9f45305b34',
  eventId: '682c1d7d7dec2da8617274dc',
  inviteeId: '682cee30a36ff8f103e32c2e'
});
  },[])

  return (
    // <div className={styles.container}>
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
    <><div>
      
      </div></>
  );
}

export default Login;
