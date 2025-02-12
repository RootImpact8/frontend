import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is imported
import DaumPostcode from 'react-daum-postcode';
import style from './address.module.css'; // Ensure to create or adjust the CSS module for styling

// Modal component
const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={style.modalBackground}>
      <div className={style.modal_find_address}>
        <div className={style.modal_text1} onClick={onClose}>뒤로가기</div>
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
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState({
    city: "",
    state: "",
    country: "South Korea"
  });

  const handleComplete = (data) => {
    console.log(`Full Address: ${data.address}`);
    console.log(`City/Province: ${data.sido}, District: ${data.sigungu}`);
    setAddress({
      city: data.sigungu,
      state: data.sido,
      country: "South Korea"
    });
    console.log(address);
    
    setLocation(`${data.sido} ${data.sigungu}`);

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    axios.post(`${Backend_server_address}/api/user-info/location`, {
      city: data.sigungu,
      state: data.sido,
      country: "South Korea"
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // Assuming you're using Bearer token
      }
    })
    .then(response => {
      console.log('Location update successful:', response.data);
    })
    .catch(error => {
      console.error('Failed to update location:', error);
    });

    setModalOpen(false);  // Close the modal after selection
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
        setLocation('Seoul, Gangnam-gu');  // This should ideally fetch from an API
      }, (error) => {
        console.error(error);
        alert('Unable to retrieve your location');
      });
    }
  };

  return (
    <div className={style.addressContainer}>
        <div className={style.address_header}>
            <span>옆</span>
            <span>주소 설정하기</span>
        </div>
        <span className={style.address_title1}>나의 작물 위치를 저장하고</span>
        <span className={style.address_title2}>보다 정확한 날씨 정보를 받아보세요</span>
      <button onClick={() => setModalOpen(true)} className={style.find_address}>주소 설정하기</button>
      <button onClick={handleLocation} className={style.my_address}>자동으로 현위치 정보 받기</button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <DaumPostcode
          onComplete={handleComplete}
          style={{ width: 460, height: 700 }}
        />
      </Modal>
    </div>
  );
};

export default Address;
