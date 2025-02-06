import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa"; // 톱니바퀴 아이콘
import { IoLeafOutline } from "react-icons/io5"; // 로고 아이콘
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Diary = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 예제 사용자 데이터
  const user = {
    name: "신승아",
    crops: [
      { id: 1, name: "딸기", emoji: "🍓" },
      { id: 2, name: "상추", emoji: "🥬" },
      { id: 3, name: "벼", emoji: "🌾" },
    ],
  };

  // 날짜 선택 시 상세페이지로 이동
  const handleDateClick = (date) => {
    setSelectedDate(date);
    navigate(`/details/${date.toISOString().split("T")[0]}`);
  };

  return (
    <div className="min-h-screen bg-green-100">
      {/* 헤더 */}
      <header className="bg-green-600 text-white flex justify-between items-center p-4">
        <IoLeafOutline size={28} />
        <h1 className="text-xl font-bold">영농일지</h1>
        <FaCog size={24} className="cursor-pointer" />
      </header>

      {/* 사용자 정보 */}
      <div className="bg-green-500 text-white p-4">
        <h2 className="text-lg font-bold">{user.name} 님의 영농일지</h2>
      </div>

      {/* 내 작물 정보 */}
      <div className="p-4 bg-white shadow-md rounded-lg m-4">
        <h3 className="text-green-700 font-semibold">내 작물 정보</h3>
        <div className="flex gap-3 mt-2">
          {user.crops.map((crop) => (
            <div key={crop.id} className="bg-green-200 p-2 rounded-md">
              <span className="text-xl">{crop.emoji}</span>
              <p className="text-sm">{crop.name}</p>
            </div>
          ))}
          <button className="bg-gray-200 p-2 rounded-md">+</button>
        </div>
      </div>

      {/* 캘린더 */}
      <div className="p-4">
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          className="border-none shadow-lg"
        />
      </div>
    </div>
  );
};

export default Diary;
