import React, { Component } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import style from "./SliderMain.module.css";

class SliderMain extends Component {
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
  }

  handlePrev = () => {
    if (this.sliderRef.current) {
      this.sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  handleNext = () => {
    if (this.sliderRef.current) {
      this.sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  handleViewAll = () => {
    alert("전체 추천 페이지로 이동");
  };

  render() {
    const { title, activities } = this.props;

    return (
      <div className={style.slider_container}>
        <div className={style.slider_header}>
          <h3>{title}</h3>
          <div className={style.arrow_container}>
            <FaChevronLeft className={style.arrow} onClick={this.handlePrev} />
            <FaChevronRight className={style.arrow} onClick={this.handleNext} />
          </div>
        </div>

        <div className={style.slider_wrapper}>
          {activities.map((activity) =>
            activity.title === "모든 추천 확인하기" ? (
              <div
                key={activity.id}
                className={style.view_all_button}
                onClick={() => this.props.navigate("/#")}
              >
                {activity.title}
              </div>
            ) : (
              <div key={activity.id} className={style.slider_item}>
                <span
                  className={`${style.category} ${
                    activity.type === "수확" ? style.harvest : style.fertilizer
                  }`}
                >
                  {activity.type}
                </span>

                <img
                  src={activity.image}
                  alt={activity.title}
                  className={style.slider_image}
                />

                <div>
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default SliderMain;
