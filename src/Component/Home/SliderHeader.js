import React from "react";
import Slider from "react-slick";
import style from "./SliderHeader.module.css";
import { useNavigate } from 'react-router-dom';

const SliderHeader = ({ title, items, slidesToShow }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const navigate = useNavigate();

  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };

  const fruitHandler = (name) => {
    navigate(`/Details/${name}`); // Navigate to the detail page
  };

  const progress = ((currentSlide + 1) / Math.ceil(items.length / slidesToShow)) * 100; // Progress calculation

  return (
    <div className={style.slider_container}>
      <div className={style.slider_header}>
        <h3>{title}</h3>
        <span className={style.view_all}
          onClick={() => navigate("/all-crops")}>모든 작물 확인하기</span>
      </div>

      <Slider
        dots={false}
        infinite={false}
        speed={500}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        arrows={false}
        className={style.custom_slider}
        beforeChange={handleBeforeChange}
      >
        {items.map((item) => (
          <div key={item.id} className={style.slider_item} onClick={() => fruitHandler(item.name)}>
            <img src={item.image} alt={item.name} className={style.slider_image} />
          </div>
        ))}
      </Slider>

      <div className={style.progress_bar}>
        <div className={style.progress_fill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default SliderHeader;
