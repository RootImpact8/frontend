import React, { useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import style from './address.module.css'; // Ensure your styling remains unaffected

import backBtn from '../Images/BackBtn.png';
import longBtn from '../Images/LongBack.png';

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={style.modalBackground}>
      <div className={style.modal_find_address}>
        <img src={longBtn} alt='모달 닫기 버튼' className={style.modal_text1} onClick={onClose}/>
        <div className={style.modal_text2}>주소 검색</div>
      </div>
      <div className={style.modalContainer}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Address = () => {
  const Backend_server_address = "http://43.201.122.113:8081";
  const [modalOpen, setModalOpen] = useState(false);
  const [address, setAddress] = useState({
    city: "",
    state: "",
    country: "South Korea"
  });

  const handleComplete = (data) => {
    setAddress({
      city: data.sigungu,
      state: data.sido,
      country: "South Korea"
    });

    postLocation({
      city: data.sigungu,
      state: data.sido,
      country: "South Korea"
    });

    setModalOpen(false);
  };

  const postLocation = (locationData) => {
    const token = localStorage.getItem('token');
    axios.post(`${Backend_server_address}/api/user-info/location`, locationData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Location update successful:', response.data);
    })
    .catch(error => {
      console.error('Failed to update location:', error);
    });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const { address } = response.data;
          const locationData = {
            city: address.city || address.town || address.village,
            state: address.borough,
            country: address.country
          };
          
          postLocation(locationData);
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          alert('Failed to retrieve location details');
        }
      }, (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to retrieve your location');
      });
    }
  };

  return (
    <div className={style.addressContainer}>
        <div className={style.address_header}>
            <img src={backBtn} alt='뒤로가기 버튼' className={style.addredd_header_btn}/>
            <span className={style.addredd_header_title}>주소 설정하기</span>
        </div>
      <button onClick={() => setModalOpen(true)} className={style.find_address}>주소 설정하기</button>
      <button onClick={handleLocation} className={style.my_address}>자동으로 현위치 정보 받기</button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <DaumPostcode onComplete={handleComplete} style={{ width: 460, height: 600 }} />
      </Modal>
    </div>
  );
};

export default Address;
