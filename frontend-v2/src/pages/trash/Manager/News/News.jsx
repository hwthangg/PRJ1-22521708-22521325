import React, { useEffect, useState } from "react";
import EventItemList from "../../../components/EventItemList/EventItemList"; // Import the new component
import avatar from "../../../assets/avatar.png";

export default function News() {
  const [data, setData] = useState([]);

  const formatVietnameseDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `ngày ${day} tháng ${month} năm ${year}`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/events?page=1&limit=100&scope=all&search=&status=all&sortBy=createdAt&sortOrder=asc",
          { method: "GET", credentials: "include" }
        );
        const result = await res.json();
        setData(result.data.events);
      } catch (error) {}
    };
    fetchNews();
  }, []);

  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ height: "100%", width: "100%" }}>
        {/* Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "80px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            backgroundColor: "#0091ea",
            boxShadow: "0 0 5px #9e9e9e",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              padding: "10px",
              width: "200px",
              borderRadius: "10px",
              boxShadow: "0 0 5px #9e9e9e",
              backgroundColor: "white",
            }}
          >
            <select style={{ border: "none", outline: "none", width: "100%" }}>
              <option>-- Chọn trạng thái -- </option>
              <option>Hoàn thành</option>
              <option value="pending">Sắp diễn ra</option>
            </select>
          </div>
        </div>

        {/* Event List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {data.map((event, index) => (
            <EventItemList 
              key={index} 
              event={event} 
              formatVietnameseDate={formatVietnameseDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}