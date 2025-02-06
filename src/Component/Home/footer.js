import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate 사용
import book from '../Images/Book.png';
import home from '../Images/Home.png';
import profill from '../Images/Profill.png';

import style from './footer.module.css';

const Footer = () => {
    const navigate = useNavigate(); // ✅ 페이지 이동을 위한 네비게이터

    return (
        <footer className={style.footer_container}>
            <div onClick={() => navigate('/diary')}> {/* ✅ 네비게이션 사용 */}
                <img src={book} alt='북이미지' />
                <span>영농일지</span>
            </div>
            <div onClick={() => navigate('/')}> {/* ✅ 홈 이동 */}
                <img src={home} alt='홈화면' />
                <span>홈</span>
            </div>
            <div onClick={() => navigate('/info')}> {/* ✅ 내 정보 이동 */}
                <img src={profill} alt='사용자 프로필' />
                <span>내 정보</span>
            </div>
        </footer>
    );
};

export default Footer;
