import React, { Component } from 'react';
import axios from 'axios';
import WeatherInfo from './WeatherInfo'; 
import Footer from './footer';
import Slider from 'react-slick'; // ✅ 슬라이더 추가
import { useNavigate } from 'react-router-dom';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Logo from '../Images/Logo.png';
import profill2 from '../Images/Profill2.png';
import gps from '../Images/GPS.png';

import style from './Home.module.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "위치 불러오는 중...",
            error: null,
            currentDate: this.getCurrentDate(),
            activities: [
                { id: 1, title: "새로운 비료 활용법", description: "더 나은 수확을 위한 친환경 비료 사용법" },
                { id: 2, title: "봄철 병해충 방제", description: "작물을 안전하게 보호하는 효과적인 방법" },
            ]
        };
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.getLocationName(latitude, longitude);
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
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
                params: {
                    format: "json",
                    lat: lat,
                    lon: lon,
                    zoom: 10,
                    addressdetails: 1
                }
            });

            if (response.data.address) {
                const state = response.data.address.state ?? '';  
                const city = response.data.address.city ?? response.data.address.town ?? response.data.address.county ?? '';  
                const district = response.data.address.city_district ?? response.data.address.suburb ?? '';  

                const locationName = [state, city, district].filter(Boolean).join(", ");
                this.setState({ location: locationName });
            } else {
                this.setState({ location: "위치 정보를 찾을 수 없음" });
            }
        } catch (error) {
            this.setState({ location: "위치 정보를 불러오지 못함" });
        }
    };

    render() {
        const sliderSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };

        return (
            <>
                <header className={style.header_container}>
                    <img src={Logo} alt='로고이미지' />
                    <img src={profill2} alt='프로필 이미지 2' />
                </header>
                
                <main className={style.main_container}>
                    <div className={style.gps_container}>
                        <p><img src={gps} alt='GPS이미지'/> {this.state.error ? this.state.error : this.state.location}</p>
                    </div>

                    <h2>{this.state.currentDate}의 농사 TIP</h2> 

                    {/* 날씨 정보 컴포넌트 추가 */}
                    <WeatherInfo />

                    <div className={style.slider_container}>
                        <h3>싹 AI의 추천 활동</h3>
                        <Slider {...sliderSettings}>
                            {this.state.activities.map(activity => (
                                <div key={activity.id} className={style.slider_item}>
                                    <h4>{activity.title}</h4>
                                    <p>{activity.description}</p>
                                </div>
                            ))}
                            {/* 전체보기 버튼을 슬라이드 끝에 배치 */}
                            <div className={style.view_all_container}>
                                <button className={style.view_all_button} onClick={() => this.props.navigate('/activities')}>
                                    전체보기 →
                                </button>
                            </div>
                        </Slider>
                    </div>

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
