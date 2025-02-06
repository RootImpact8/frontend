import React, { Component } from 'react';
import axios from 'axios';
import style from './WeatherInfo.module.css';

class WeatherInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: null,
            error: null
        };
    }

    componentDidMount() {
        this.getWeatherData(this.props.location);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.getWeatherData(this.props.location);
        }
    }

    getWeatherData = async (location) => {
        if (!location) return;

        try {
            const apiKey = "YOUR_API_KEY"; // OpenWeatherMap API 키 입력
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: location, // 가져온 지역 정보를 기반으로 검색
                    appid: apiKey,
                    units: "metric",
                    lang: "kr"
                }
            });

            this.setState({ weatherData: response.data });
        } catch (error) {
            this.setState({ error: "날씨 정보를 불러오지 못함" });
        }
    };

    render() {
        const { weatherData, error } = this.state;

        return (
            <div className={style.weather_container}>
                {error ? (
                    <p>{error}</p>
                ) : weatherData ? (
                    <>
                        <h3>📅 {new Date().toLocaleDateString()} 날씨 정보</h3>
                        <p>🌍 지역: {weatherData.name}</p>
                        <p>🌡️ 현재 온도: {weatherData.main.temp}°C</p>
                        <p>☀️ 날씨: {weatherData.weather[0].description}</p>
                        <p>🌡️ 최고 기온: {weatherData.main.temp_max}°C</p>
                        <p>❄️ 최저 기온: {weatherData.main.temp_min}°C</p>
                        <p>💨 풍속: {weatherData.wind.speed} m/s</p>
                        <p>🌧️ 강수 확률: {weatherData.clouds.all}%</p>
                    </>
                ) : (
                    <p>날씨 정보를 불러오는 중...</p>
                )}
            </div>
        );
    }
}

export default WeatherInfo;
