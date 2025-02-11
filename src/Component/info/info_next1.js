import React, { Component } from "react";
import BackBtn from "../Images/BackBtn.png";
import Star5 from "../Images/star5.png";
import Strawberry from "../Images/1.png"; // Adjusted paths
import Cabbage from "../Images/2.png";
import Corn from "../Images/3.png";
import style from "./info_next1.module.css";

class info_next1 extends Component {
  render() {
    return (
      <div className={style.main_main}>
        <header className={style.header}>
          <img src={BackBtn} alt="Back Button" />
          <span>내 작물 모아보기</span>
        </header>
        <div className={style.ing_container}>
          <img src={Star5} alt="+버튼" />
          <span>내 작물 등록하기</span>
        </div>
        <main>
          <h2 className={style.main_title}>내 작물 목록</h2>
          {this.renderCropItem(
            Strawberry,
            "딸기, 150일째",
            "2024/09/12",
            "2025/02/20"
          )}
          {this.renderCropItem(
            Cabbage,
            "상추, 7일째",
            "2024/09/12",
            "2025/02/20"
          )}
          {this.renderCropItem(Corn, "벼, 7일째", "2024/09/12", "2025/02/20")}
        </main>
      </div>
    );
  }

  renderCropItem(image, title, plantingDate, harvestDate) {
    return (
      <div className={style.cropItem}>
        <img src={image} alt={title} />
        <div className={style.cropDetails}>
          <span className={style.sub_title}>{title}</span>
          <div className={style.sub_container}>
            <div className={style.dateDetails}>
              <p>파종</p>
              <p>예상 수확일</p>
            </div>
            <div className={style.dateValues}>
              <p> | {plantingDate}</p>
              <p> | {harvestDate}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default info_next1;
