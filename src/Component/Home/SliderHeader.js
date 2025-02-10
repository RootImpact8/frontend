import React, { Component } from "react";
import Slider from "react-slick";
import style from "./SliderHeader.module.css";

class SliderHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0, // ✅ 현재 슬라이드 위치 상태 추가
    };
  }

  handleBeforeChange = (oldIndex, newIndex) => {
    this.setState({ currentSlide: newIndex });
  };

  render() {
    const { title, items, slidesToShow } = this.props;
    const { currentSlide } = this.state;
    const progress = ((currentSlide + 1) / Math.ceil(items.length / slidesToShow)) * 100; // ✅ 진행률 계산

    return (
      <div className={style.slider_container}>
        <div className={style.slider_header}>
          <h3>{title}</h3>
          <span className={style.view_all}>모든 작물 확인하기</span>
        </div>

        <Slider
          ref={(c) => (this.slider = c)}
          dots={false}
          infinite={false}
          speed={500}
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          arrows={false}
          className={style.custom_slider}
          beforeChange={this.handleBeforeChange} // ✅ 슬라이드 변경 이벤트 추가
        >
          {items.map((item) => (
            <div key={item.id} className={style.slider_item}>
              <img src={item.image} alt={item.name} className={style.slider_image} />
              <span>{item.name}</span>
            </div>
          ))}
        </Slider>

        {/* ✅ 진행 바 추가 */}
        <div className={style.progress_bar}>
          <div className={style.progress_fill} style={{ width: `${progress}%` }} />
        </div>
      </div>
    );
  }
}

export default SliderHeader;
