import React from "react";
import style from "./login.module.css";

const Login = () => {
  return (
    <div className={style.main_container}>
      <span className={style.main_title}>Login</span>
      <div className={style.login_container}>
        <input type="text" placeholder="ID" className={style.input_box} />
        <input type="password" placeholder="Password" className={style.input_box} />
      </div>
      <button className={style.login_btn}>LOGIN</button>
      <div className={style.find_container}>
        <span className={style.find_ps}>Find Password</span>
        <span className={style.sign_up}>Sign UP</span>
      </div>
    </div>
  );
};

export default Login;
