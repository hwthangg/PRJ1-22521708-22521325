import React, { useEffect, useState } from 'react';
import EventItemList from '../../../../components/EventItemList/EventItemList';

export default function News() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/events?page=1&limit=100`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const result = await res.json();
        console.log(result)
        if (result?.data?.data) {
          setEvents(result.data.data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();

    return () => controller.abort(); // cleanup nếu component bị hủy
  }, []);

  return (
    <div style={{backgroundColor:'var(--light-blue)', minHeight:'100vh'}}>
      <h2>Tin tức / Sự kiện</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div style={{ display:'flex', gap:20,flexDirection:'column', border:'1px solid', justifyItems:'center', alignItems:'center'}}>
          {events.map((event) => (
            <EventItemList event={event}/>
          ))}
        </div>
      )}
    </div>
  );
}
