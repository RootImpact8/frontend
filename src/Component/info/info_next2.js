import React, { Component } from "react";
import one from "../Images/1.png";
import star5 from "../Images/star5.png";
import pen from "../Images/pen.png";
import style from "./info_next2.module.css";

class info_next2 extends Component {
  render() {
    return (
      <div className={style.container}>
        <header>
          <span className={style.header_detail}>작물 상세</span>
        </header>
        <div className={style.cropHeader}>
          <img src={one} alt="Crop" className={style.cropImage} />
          <span className={style.edit}>
            편집 <img src={pen} alt="Edit" className={style.penIcon} />
          </span>
        </div>
        <h2 className={style.cropTitle}>딸기, 150일째</h2>
        <div className={style.dateInfo}>
          <div className={style.date1}>
            <span>파종</span>
            <span>예상 수확일</span>
          </div>
          <div className={style.date2}>
            <span>| 2024/09/12</span>
            <span>| 2025/02/20</span>
          </div>
        </div>
        <div className={style.iconsContainer}>
          <div className={style.houseIcon}>
            <div className={style.houseIcon_main_container}>
              <div className={style.houseIcon_main}>
                <span> 2월 3일</span>
                <p>1일전</p>
              </div>
              <span>가장 최근</span>
            </div>
            <div className={style.houseIcon_footer}>
              <div>🏠휴식</div>
              <span>온풍기 20 정도 유지 ...</span>
            </div>
          </div>
          <div className={style.houseIcon}>
            <div className={style.houseIcon_main_container}>
              <div className={style.houseIcon_main}>
                <span> 2월 3일</span>
                <p>1일전</p>
              </div>
            </div>
            <div className={style.houseIcon_footer}>
              <div>🏠휴식</div>
              <span>온풍기 20 정도 유지 ...</span>
            </div>
          </div>
        </div>
        <button className={style.diaryButton}>
          <img src={star5} alt="Diary" /> 일지 쓰기
        </button>
        <button className={style.selectCrop}>작물 선택하기</button>
      </div>
    );
  }
}

export default info_next2;
