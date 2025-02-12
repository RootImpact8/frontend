import React, { useState } from "react";
import style from "./diary_crops.module.css";
import Logo from "../Images/Color_Logo.png";
import {FaCog} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import one from "../Images/1.png";
import two from "../Images/2.png";
import thr from "../Images/3.png";

const DiaryCrops = () => {
    const [crops] = useState([
        {
            id: 1,
            name: "딸기",
            days: 150,
            sowingDate: "2024/09/12",
            harvestDate: "2025/02/20",
            image: one,// 딸기 이미지
        },
        {
            id: 2,
            name: "상추",
            days: 7,
            sowingDate: "2024/09/12",
            harvestDate: "2024/09/20",
            image: two, // 상추 이미지
        },
        {
            id: 3,
            name: "벼",
            days: 7,
            sowingDate: "2024/09/12",
            harvestDate: "2025/02/20",
            image: thr,// 벼 이미지
        },
    ]);

    //뒤로가기 버튼 이벤트
    const navigate = useNavigate();
    return (
        <div className={style.container}>
            <header className={style.header}>
                <div className={style.header_BackButton}  onClick={() => navigate(-1)}>&lt; </div>
                <h2 className={style.header_Title}>작물 모아보기</h2>
            </header>


            <button className={style.addButton}>
                <div className={style.plusButton}>+</div>
                <div className={style.plusButton_Text}>내 작물 등록하기</div>
            </button>

            <div className={style.myCropsText}>내 작물 목록</div>
            <div className={style.list}>
                {crops.map((crop) => (
                    <div key={crop.id} className={style.cropCard}>
                        <div className={style.cropDetail}>
                            <div className={style.cropImage_style}>
                                <img src={crop.image} alt={crop.name} className={style.cropImage}/>
                            </div>

                            <div className={style.cropInfo}>
                                <h3 className={style.cropName}>
                                    <strong>{crop.name}</strong> <span className={style.greenText}>{crop.days}</span>
                                    <span className={style.darkRedText}> 일째</span>
                                </h3>
                                <div className={style.cropData}>
                                    <p className={style.sowingDate}>🌱 파종<div className={style.sowingDate_detaile}> | {crop.sowingDate}</div></p>
                                    <p className={style.harvestDate}>🍂 예상 수확일<div className={style.harvestDate_detail} >| {crop.harvestDate}</div></p>
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiaryCrops;
