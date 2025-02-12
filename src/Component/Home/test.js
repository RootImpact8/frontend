import React, { Component } from "react";
import axios from "axios";


class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      priceInfo: [], // Array of price data
      news: "", // Single news item
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchLocation();
    this.fetchPrice();
    this.fetchNews();
  }

  fetchLocation = async () => {
    const token = localStorage.getItem("token");
    const url = "http://43.201.122.113:8081/api/user-info/location";

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.setState({ location: response.data, loading: false });
    } catch (error) {
      this.setState({ error: error.toString(), loading: false });
    }
  };

  fetchPrice = async () => {
    const token = localStorage.getItem("token");
    const url = "http://43.201.122.113:8081/api/farm/price?cropName=딸기";

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const priceData = [
        {
          date: response.data.previousDate,
          price: response.data.previousPrice,
        },
        { date: response.data.currentDate, price: response.data.currentPrice },
      ];
      this.setState({ priceInfo: priceData, loading: false });
    } catch (error) {
      this.setState({ error: error.toString(), loading: false });
    }
  };

  fetchNews = async () => {
    const token = localStorage.getItem("token");
    const cropName = "딸기";
    
    // 토큰 확인용 콘솔 로그 추가
    console.log("Token:", token);
    
    const url = `http://43.201.122.113:8081/api/farm/crop-news?cropName=${cropName}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          // 추가 헤더 설정
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      this.setState({ news: response.data.news, loading: false });
    } catch (error) {
      // 에러 상세 정보 출력
      console.log("Error details:", error.response);
      this.setState({ error: error.toString(), loading: false });
    }
};

  render() {
    const {news} = this.state;
    return (
      <div>
            {news && (
              <div>
                <h2>Latest News on Strawberries</h2>
                <p>{news}</p>
              </div>
            )}
          </div>
        )}
  }

export default Test;
