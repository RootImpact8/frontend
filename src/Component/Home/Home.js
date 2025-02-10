import React, { Component } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import Footer from "./footer";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // 🔹 아이콘 추가

import Logo from "../Images/Logo.png";
import profill2 from "../Images/Profill2.png";
import gps from "../Images/GPS.png";
import cropImage from "../Images/crop.png";
import RedGPS from "../Images/redGPS.png";

import style from "./Home.module.css";

import SliderHeader from "./SliderHeader";
import SliderMain from "./SliderMain";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      latitude: null,
      longitude: null,
      error: null,
      currentDate: this.getCurrentDate(),
      abnormalWeather: null,
      cropWarning: "",
      cropInfo: "",
      activities: [
        {
          id: 1,
          title: "새로운 비료 활용법",
          description: "더 나은 수확을 위한 친환경 비료 사용법",
          type: "수확", // ✅ 비료 → 노란색 표시
          image: require("../Images/star1.png"), // ✅ 과일 이미지 추가
        },
        {
          id: 2,
          title: "봄철 병해충 방제",
          description: "작물을 안전하게 보호하는 효과적인 방법",
          type: "비료", // ✅ 수확 → 빨간색 표시
          image: require("../Images/star2.png"), // ✅ 과일 이미지 추가
        },
        {
          id: 3,
          title: "모든 추천 확인하기"
        }
      ],
      
      /** ✅ 관심 작물 데이터 추가 */
      starCrops: [
        { id: 1, image: require("../Images/star1.png") },
        { id: 2, image: require("../Images/star2.png") },
        { id: 3, image: require("../Images/star3.png") },
        { id: 4, image: require("../Images/star4.png") },
        { id: 5, image: require("../Images/star5.png") },
      ],
    };
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.setState({ latitude, longitude }, () => {
            this.getLocationName(latitude, longitude);
            this.getWeatherData(latitude, longitude);
          });
        },
        (error) => {
          this.setState({ error: "위치 특정 불가" });
        }
      );
    } else {
      this.setState({ error: "위치 특정 불가" });
    }
  }

  getCurrentDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${month}월 ${day}일`;
  }

  getLocationName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            format: "json",
            lat: lat,
            lon: lon,
            zoom: 10,
            addressdetails: 1,
          },
        }
      );

      if (response.data.address) {
        const state = response.data.address.state ?? "";
        const city =
          response.data.address.city ??
          response.data.address.town ??
          response.data.address.county ??
          "";
        const district =
          response.data.address.city_district ??
          response.data.address.suburb ??
          "";

        const locationName = [state, city, district].filter(Boolean).join(" ");
        this.setState({ location: locationName });
      } else {
        this.setState({ location: "위치 정보를 찾을 수 없음" });
      }
    } catch (error) {
      this.setState({ location: "위치 정보를 불러오지 못함" });
    }
  };

  getWeatherData = async (lat, lon) => {
    try {
      const apiKey = "YOUR_WEATHER_API_KEY";
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: apiKey,
            q: `${lat},${lon}`,
            lang: "ko",
          },
        }
      );

      this.checkAbnormalWeather(response.data.current);
    } catch (error) {
      console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  checkAbnormalWeather = (weatherData) => {
    const { temp_c, wind_kph, precip_mm, condition } = weatherData;
    let abnormalType = null;
    let warningMessage = "";
    let advice = "";

    if (temp_c <= -5) {
      abnormalType = "한파 경보";
      warningMessage = "비닐하우스 내부 온도를 유지하세요!";
      advice = "최소 6°C 이상을 유지하여 작물 동해를 예방하세요.";
    } else if (temp_c >= 35) {
      abnormalType = "폭염 경보";
      warningMessage = "햇빛 차단을 위해 차광망을 사용하세요!";
      advice = "낮에는 차광망을 설치하고, 저녁에는 환기를 충분히 하세요.";
    } else if (precip_mm >= 50) {
      abnormalType = "폭우 경보";
      warningMessage = "배수로 점검 및 비닐하우스 방수 작업 필요!";
      advice = "비닐하우스 주변 배수로를 미리 정리하여 침수를 방지하세요.";
    } else if (wind_kph >= 54) {
      abnormalType = "강풍 경보";
      warningMessage = "비닐하우스 고정 및 강풍 대비!";
      advice = "작물이 쓰러지지 않도록 지지대를 설치하고 하우스를 고정하세요.";
    } else if (
      condition.text.includes("폭설") ||
      condition.text.includes("뇌우")
    ) {
      abnormalType = condition.text;
      warningMessage = "강설량 증가, 하우스 적설량 주의!";
      advice = "비닐하우스 지붕의 눈을 미리 제거하여 붕괴를 방지하세요.";
    }

    this.setState({
      abnormalWeather: abnormalType,
      cropWarning: warningMessage,
      cropInfo: advice,
    });
  };
  starSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    arrows: false,
  };

  render() {
    return (
      <>
        <header className={style.header_container}>
          <img src={Logo} alt="로고이미지" className={style.LogoImg} />
          <img
            src={profill2}
            alt="프로필 이미지 2"
            className={style.profillImg}
          />
        </header>

        <main className={style.main_container}>
          <div className={style.gps_container}>
            <p>
              <img src={gps} alt="GPS이미지" />{" "}
              {this.state.error ? this.state.error : this.state.location}
            </p>
          </div>

          <h2 className={style.Today_LongContainer}>
            <div className={style.Today_container}>
              {this.state.currentDate}
            </div>
            의 농사 TIP
          </h2>

          {this.state.latitude && this.state.longitude && (
            <WeatherInfo lat={this.state.latitude} lon={this.state.longitude} />
          )}

          {/* ✅ 관심 작물 슬라이더 */}
          <SliderHeader
            title="나의 관심 작물"
            items={this.state.starCrops}
            slidesToShow={3}
          />

          {/* 이상기후 경보 모달 (이상기후 있을 때만 표시) */}
          {this.state.abnormalWeather && (
            <div className={style.abnormal_weather_modal}>
              <div className={style.abnormal_weather_header}>
                <span className={style.abnormal_location}>
                  <img src={RedGPS} alt="GPS이미지" /> {this.state.location}
                </span>
                <span className={style.abnormal_type}>
                  {this.state.abnormalWeather}
                </span>
              </div>
              <div className={style.abnormal_weather_content}>
                <div>
                  <p className={style.crop_warning}>{this.state.cropWarning}</p>
                  <p className={style.crop_info}>{this.state.cropInfo}</p>
                </div>
                <img
                  src={cropImage}
                  alt="작물 보호 이미지"
                  className={style.crop_image}
                />
              </div>
            </div>
          )}

          {/* 싹 AI 추천활동 & 도매가는 항상 표시 */}
          <SliderMain
            title="싹 AI의 추천 활동"
            activities={this.state.activities}
            slidesToShow={3} // 한번에 3개씩 보이도록 설정
          />
          <div>현재 농작물 도매가</div>
        </main>
        <Footer />
      </>
    );
  }
}

export default function MainWithNavigation(props) {
  const navigate = useNavigate();
  return <Main {...props} navigate={navigate} />;
}
