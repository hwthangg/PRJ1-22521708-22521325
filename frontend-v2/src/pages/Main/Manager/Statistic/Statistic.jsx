import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#d50000"];

function PieStatistic({ title, data }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h4 style={{ color: "#0d47a1" }}>{title}</h4>
      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

const convertDocumentTypeLabel = (type) => {
  switch (type) {
    case "VBHC": return "Văn bản hành chính";
    case "TLSH": return "Tài liệu sinh hoạt";
    case "other": return "Khác";
    default: return type;
  }
};

const convertDocumentScopeLabel = (scope) => {
  switch (scope) {
    case "chapter": return "Nội bộ";
    case "private": return "Mật";
    default: return scope;
  }
};

export default function Statistic() {
  const [selected, setSelected] = useState("members");

  const [memberByGender, setMemberByGender] = useState([]);
  const [memberByRole, setMemberByRole] = useState([]);
  const [memberByStatus, setMemberByStatus] = useState([]);
  const [participationData, setParticipationData] = useState([]);

  const [eventByStatus, setEventByStatus] = useState([]);
  const [eventByType, setEventByType] = useState([]);
  const [interactionData, setInteractionData] = useState([]);

  const [documentByType, setDocumentByType] = useState([]);
  const [documentByScope, setDocumentByScope] = useState([]);

  useEffect(() => {
    const fetchMemberStatistic = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/members/statistic`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setMemberByGender(data.data.memberByGender);
        setMemberByRole(data.data.memberByRole);
        setMemberByStatus(data.data.memberByStatus);
        setParticipationData(
          data.data.participationData.sort((a, b) => b.participation - a.participation)
        );
      } catch (error) {
        console.log(error);
      }
    };

    const fetchEventStatistic = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/events/statistic`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setEventByStatus(data.data.eventByStatus);
        setEventByType(data.data.eventByType);
        setInteractionData(data.data.interactionData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDocumentStatistic = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/documents/statistic`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        console.log(data)
        setDocumentByType(
          data.data.documentByType.map(item => ({
            name: convertDocumentTypeLabel(item.name),
            value: item.value
          }))
        );

        setDocumentByScope(
          data.data.documentByScope.map(item => ({
            name: convertDocumentScopeLabel(item.name),
            value: item.value
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchMemberStatistic();
    fetchEventStatistic();
    fetchDocumentStatistic();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", color: "#0d47a1", marginBottom: "20px" }}>
        Thống kê
      </h1>

      <div style={{ marginBottom: "30px" }}>
        <label style={{ fontWeight: "bold", color: "#0d47a1" }}>
          Chọn loại thống kê:{" "}
        </label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #0d47a1",
            color: "#0d47a1",
          }}
        >
          <option value="members">Đoàn viên</option>
          <option value="events">Sự kiện</option>
          <option value="documents">Tài liệu</option>
        </select>
      </div>

      {selected === "members" && (
        <>
          <h2 style={{ color: "#0d47a1" }}>Thống kê đoàn viên</h2>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "space-around" }}>
            <PieStatistic title="Giới tính" data={memberByGender} />
            <PieStatistic title="Chức vụ" data={memberByRole} />
            <PieStatistic title="Trạng thái" data={memberByStatus} />
          </div>

          <h3 style={{ margin: "30px 0", color: "#0d47a1" }}>
            Số lượt tham gia của từng đoàn viên
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={participationData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="participation" fill="#0d47a1" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      {selected === "events" && (
        <>
          <h2 style={{ color: "#0d47a1" }}>Thống kê sự kiện</h2>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "space-around" }}>
            <PieStatistic title="Trạng thái" data={eventByStatus} />
            <PieStatistic title="Phân loại" data={eventByType} />
          </div>

          <h3 style={{ margin: "30px 0", color: "#0d47a1" }}>
            Lượt tương tác của các sự kiện
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interactionData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="likes" name="Lượt thích" fill="#0d47a1" />
              <Bar dataKey="comments" name="Bình luận" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      {selected === "documents" && (
        <>
          <h2 style={{ color: "#0d47a1" }}>Thống kê tài liệu</h2>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }}>
            <PieStatistic title="Phân loại tài liệu" data={documentByType} />
            <PieStatistic title="Phạm vi tài liệu" data={documentByScope} />
          </div>
        </>
      )}
    </div>
  );
}
