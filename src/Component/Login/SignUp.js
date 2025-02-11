import React, { Component } from "react";
import axios from "axios";
import style from "./SignUp.module.css";
import BackBtn from "../Images/BackBtn.png";
import CheckIcon from "../Images/CheckIcon.png"; // ✅ 체크 이미지 추가

const Backend_server_address = "http://43.201.122.113:8081"; // ✅ Backend 주소 변수

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1, // 1: 이메일/비밀번호 입력, 2: 이름 입력, 3: 회원가입 완료
      email: "",
      password: "",
      name: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNext = () => {
    const { step, email, password } = this.state;

    if (step === 1) {
      // ✅ 이메일과 비밀번호를 localStorage에 저장
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      // ✅ 입력값 초기화하고 step 변경
      this.setState({ step: 2, email: "", password: "" });
    } else if (step === 2) {
      // ✅ 이름 입력 완료 → 데이터 전송
      this.handleRegister();
    } else if (step === 3) {
      // ✅ 로그인 페이지로 이동
      window.location.href = "/login";
    }
  };

  handleRegister = async () => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const { name } = this.state;

    const userData = {
      email,
      password,
      name,
    };

    try {
    console.log(userData);
    
      const response = await axios.post(
        `${Backend_server_address}/api/user/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("회원가입 성공:", response.data);

      // ✅ 회원가입 성공 시 step 3으로 변경
      this.setState({ step: 3 });

      // ✅ 회원가입 성공 후 localStorage 초기화
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    } catch (error) {
      console.error(
        "회원가입 실패:",
        error.response ? error.response.data : error.message
      );
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  render() {
    const { step, email, password, name } = this.state;
    const isButtonEnabled =
      step === 1
        ? email.trim() !== "" && password.trim() !== ""
        : step === 2
        ? name.trim() !== ""
        : true; // step 3에서는 버튼 항상 활성화

    return (
      <div className={style.sign_main_container}>
        <div className={style.header_container}>
          <img
            className={style.sign_image}
            src={BackBtn}
            alt="뒤로가기 이미지"
          />
          <span className={style.sign_title}> 회원가입 </span>
        </div>

        <div className={style.main_container}>
          {step === 1 ? (
            <>
              <span className={style.main_top}>이메일과 비밀번호를</span>
              <span className={style.main_bottom}>입력해주세요.</span>
            </>
          ) : step === 2 ? (
            <>
              <span className={style.main_top}>사용자의 이름을</span>
              <span className={style.main_bottom}>입력해주세요.</span>
            </>
          ) : (
            <>
              <span className={style.main_top}>회원가입이</span>
              <span className={style.main_bottom}>완료되었습니다.</span>
              <span className={style.main_sub}>AI로 관리하는 내 영농일기, 싹</span>
              <img
                src={CheckIcon}
                alt="완료 아이콘"
                className={style.check_icon}
              />
            </>
          )}
        </div>

        {step !== 3 && (
          <div className={style.footer_container}>
            {step === 1 ? (
              <>
                <label className={style.input_label} htmlFor="email">
                  이메일
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className={style.input_box}
                  value={email}
                  onChange={this.handleChange}
                />

                <label className={style.input_label} htmlFor="password">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={style.input_box}
                  value={password}
                  onChange={this.handleChange}
                />
              </>
            ) : (
              <>
                <label className={style.input_label} htmlFor="name">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={style.input_box}
                  value={name}
                  onChange={this.handleChange}
                />
              </>
            )}
          </div>
        )}

        <button
          className={`${style.next_btn} ${isButtonEnabled ? style.active : ""}`}
          disabled={!isButtonEnabled}
          onClick={this.handleNext}
        >
          {step === 3 ? "로그인" : "다음"}
        </button>
      </div>
    );
  }
}

export default SignUp;
