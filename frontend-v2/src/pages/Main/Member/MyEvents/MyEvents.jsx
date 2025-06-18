import React, { useEffect, useState } from "react";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [confirmEvent, setConfirmEvent] = useState(null);
  const [message, setMessage] = useState("");

  

  useEffect(() => {
   const fetchMyEvents = async(req, res)=>{
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/event-registrations/my-events`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      
      const data = await res.json()
      setEvents(data.data)
    } catch (error) {
      console.log(error)

    }
   }
   fetchMyEvents()
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    const h = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    return `${d}/${m}/${y} ${h}:${min}`;
  };

  const handleCancel = async() => {
    await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/event-registrations/${confirmEvent._id}`,{
      method:'DELETE',
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    setEvents((prev) => prev.filter((e) => e._id !== confirmEvent._id));
    setMessage("✅ Đã hủy đăng ký sự kiện: " + confirmEvent.name);
    setConfirmEvent(null);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sự kiện đã đăng ký</h2>

      {message && <div style={styles.alert}>{message}</div>}

      {events.length === 0 ? (
        <p>Bạn chưa đăng ký sự kiện nào.</p>
      ) : (
        <div style={styles.grid}>
          {events.map((event) => (
            <div key={event._id} style={styles.card}>
              <h3 style={styles.name}>{event.name}</h3>
              <p><strong>Thời gian:</strong> {formatDate(event.startTime)}</p>
              <p><strong>Địa điểm:</strong> {event.location}</p>
              <p><strong>Trạng thái:</strong> {event.status === "completed" ? "Đã diễn ra" : "Sắp diễn ra"}</p>
              <button
                style={{
                  ...styles.cancelBtn,
                  ...(event.status === "completed" ? styles.disabledBtn : {})
                }}
                disabled={event.status === "completed"}
                onClick={() => setConfirmEvent(event)}
              >
                Hủy đăng ký
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal xác nhận */}
      {confirmEvent && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h4>Bạn có chắc muốn hủy đăng ký?</h4>
            <p><strong>{confirmEvent.name}</strong></p>
            <div style={styles.modalActions}>
              <button onClick={handleCancel} style={styles.confirmBtn}>Xác nhận</button>
              <button onClick={() => setConfirmEvent(null)} style={styles.cancelBtn}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const blue = "#007BFF";

const styles = {
  container: {
    padding: 24,
    backgroundColor:'var(--light-blue)',
    height: '100%',
    boxSizing: 'border-box'

  },
  title: {
    fontSize: "1.5rem",
    marginBottom: 20,
    color: blue,
  },
  alert: {
    backgroundColor: "#cce5ff",
    color: "#004085",
    padding: "10px 14px",
    borderRadius: 8,
    marginBottom: 16,
    border: "1px solid #b8daff",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    border: `1px solid ${blue}`,
    borderRadius: 12,
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  name: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: 8,
    color: blue,
  },
  cancelBtn: {
    marginTop: 12,
    padding: "8px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  disabledBtn: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
  modalBackdrop: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw", height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 10,
    width: "90%",
    maxWidth: 400,
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  modalActions: {
    marginTop: 16,
    display: "flex",
    justifyContent: "space-around",
  },
  confirmBtn: {
    padding: "8px 14px",
    backgroundColor: blue,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
