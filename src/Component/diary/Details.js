import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Details = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-green-600 text-white flex items-center p-4">
        <FaArrowLeft
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold ml-4">Crop Details</h1>
      </header>

      <div className="p-6">
        <h2 className="text-xl font-bold text-green-700">Details</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p className="mt-2 text-gray-600">{news || "No news available."}</p>
        )}
      </div>
    </div>
  );
};

export default Details;
