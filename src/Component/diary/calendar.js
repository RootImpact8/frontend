import React, { useState,useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendar.css';

const CalendarComponent = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const eventDetailsRef = useRef(null);

    // 예제 데이터
    const events = [
        { title: 'Event 1', date: '2025-02-01' },
        { title: 'Event 2', date: '2025-02-07' }
    ];

    // 이벤트 상세 날짜를 '날짜.요일' 형식으로 변환
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0'); // 두 자리 숫자로 변환
        const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date);
        return `${day}.${weekday}`;
    };

    // ko 설정으로 인한 일,월 텍스트 제거
    const handleDayCellContent = (arg) => {
        const dayNumber = arg.dayNumberText.replace("일", "");
        return dayNumber;
    };

    // 날짜 클릭시 해당 날짜 이벤트 상세 출력 및 스크롤 이동
    const handleDateClick = (arg) => {
        setSelectedDate(formatDate(arg.dateStr));
        const filteredEvents = events.filter(event =>
            new Date(event.date).toISOString().split('T')[0] === arg.dateStr
        );
        setSelectedEvents(filteredEvents);

        setTimeout(() => {
            if (eventDetailsRef.current) {
                eventDetailsRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    return (
        <div>
        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="ko"
            fixedWeekCount={false}      //5주만 보이게 해줌

            titleFormat= {{ year: 'numeric', month: 'numeric' }}
            events={events}
            dateClick={handleDateClick}
            dayCellContent={handleDayCellContent}
            height="auto"
            dayMaxEventRows={true}  // 모든 날짜를 다 보이게 설정
        />
            {selectedDate && (
                <div ref={eventDetailsRef} className="event-details">
                    <h3>{selectedDate}</h3>
                    {selectedEvents.length > 0 ? (
                        <ul>
                            {selectedEvents.map((event, index) => (
                                <li key={index}>{event.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>이 날짜에는 이벤트가 없습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default CalendarComponent;