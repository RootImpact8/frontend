import React, { Component } from "react";
import style from "./info.module.css";
import LogoImg from "../Images/Logo.png";
import GPS from '../Images/GPS.png';

import green1 from '../Images/green_heart.png';
import green2 from '../Images/green_job.png';
import right from '../Images/rigit_arrow.png';
import bottom from '../Images/bottom_arrow.png';

class info extends Component {
  render() {
    return (
      <div>
        <header>
          <div className={style.header_container}>
            <span className={style.header_text1}>신승아 님,</span>
            <span className={style.header_text2}>안녕하세요!</span>
          </div>
          <div>
            <img src={LogoImg} className={style.Logo_image} alt="로고이미지" />
          </div>
        </header>
        <main>
          <div className={style.main_container}>
            <span><img src={GPS} alt="GPS위치 이미지" />내 위치</span>
            <span>강원도 원주시 <img src={bottom}/></span>
          </div>
          <div className={style.main_sub_container}>
            <div className={style.main_sub1}>
                <img src={green1}/>
                <span>관심작물</span>
                <p>모든 작물 확인하기 > </p>
            </div>
            <div className={style.main_sub2}>
                <img src={green2}/>
                <span>내 작물</span>
                <p>모든 작물 확인하기</p>
            </div>
          </div>
        </main>
        <div className={style.footer_container}>
            <div>로그인 정보 <img src={right}/></div>
            <div>고객 센터 <img src={right}/></div>
            <div>비전 정보 <img src={right}/></div>
        </div>
      </div>
    );
  }
}

export default info;
