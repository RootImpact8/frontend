import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Details = () => {
  const { date } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const [news, setNews] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const token = localStorage.getItem("token");
      const path = window.location.pathname;
      const parts = path.split("/");
      const cropName = parts[parts.length - 1]; // Get the last part of the URL
      
        const url = `http://43.201.122.113:8081/api/farm/crop-news?cropId=${cropName}`;

        try {
        setLoading(true);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
        setNews(response.data.news);
        setLoading(false);
      } catch (error) {
        setError(error.toString());
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
=======
>>>>>>> 36fab81beaf12ba396cd3f7ab0e251eeed464684

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="bg-green-600 text-white flex items-center p-4">
        <FaArrowLeft
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold ml-4">상세 일정</h1>
      </header>

      <div className="p-6">
        <h2 className="text-xl font-bold text-green-700">{date} 일정</h2>
        <p className="mt-2 text-gray-600">이 날짜의 농업 일정 세부 정보를 추가하세요.</p>
      </div>
    </div>
  );
};

export default Details;
