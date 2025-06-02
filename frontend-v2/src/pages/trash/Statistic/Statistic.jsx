import React, { useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#d50000"];

export default function Statistic() {
  const [selected, setSelected] = useState("members");

  // Sample Data
  const memberByGender = [
    { name: "Nam", value: 60 },
    { name: "Nữ", value: 40 },
  ];

  const memberByRole = [
    { name: "Bí thư", value: 5 },
    { name: "Phó Bí thư", value: 3 },
    { name: "Ủy viên", value: 12 },
    { name: "Đoàn viên", value: 80 },
  ];

  const memberByStatus = [
    { name: "Hoạt động", value: 85 },
    { name: "Bị khóa", value: 15 },
  ];

  const participationData = [
    { name: "Nguyễn Văn A", participation: 10 },
    { name: "Trần Thị B", participation: 7 },
    { name: "Lê Văn C", participation: 12 },
  ];

  const eventByStatus = [
    { name: "Hoàn thành", value: 12 },
    { name: "Sắp diễn ra", value: 5 },
    { name: "Bị hủy", value: 2 },
  ];

  const eventByType = [
    { name: "Cộng đồng", value: 10 },
    { name: "Chi đoàn", value: 9 },
  ];

  const interactionData = [
    { name: "Sự kiện A", likes: 30, comments: 10 },
    { name: "Sự kiện B", likes: 50, comments: 5 },
  ];

  const documentByScope = [
    { name: "Chi đoàn", value: 25 },
    { name: "Mật", value: 8 },
  ];

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

          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <PieChart width={300} height={250}>
              <Pie data={memberByGender} dataKey="value" nameKey="name" outerRadius={80}>
                {memberByGender.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>

            <PieChart width={300} height={250}>
              <Pie data={memberByRole} dataKey="value" nameKey="name" outerRadius={80}>
                {memberByRole.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>

            <PieChart width={300} height={250}>
              <Pie data={memberByStatus} dataKey="value" nameKey="name" outerRadius={80}>
                {memberByStatus.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <h3 style={{ marginTop: "30px", color: "#0d47a1" }}>
            Số lượt tham gia của từng đoàn viên
          </h3>
          <BarChart width={600} height={300} data={participationData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="participation" fill="#0d47a1" />
          </BarChart>
        </>
      )}

      {selected === "events" && (
        <>
          <h2 style={{ color: "#0d47a1" }}>Thống kê sự kiện</h2>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <PieChart width={300} height={250}>
              <Pie data={eventByStatus} dataKey="value" nameKey="name" outerRadius={80}>
                {eventByStatus.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>

            <PieChart width={300} height={250}>
              <Pie data={eventByType} dataKey="value" nameKey="name" outerRadius={80}>
                {eventByType.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <h3 style={{ marginTop: "30px", color: "#0d47a1" }}>
            Lượt tương tác của các sự kiện
          </h3>
          <BarChart width={600} height={300} data={interactionData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="likes" fill="#0d47a1" />
            <Bar dataKey="comments" fill="#FF8042" />
          </BarChart>
        </>
      )}

      {selected === "documents" && (
        <>
          <h2 style={{ color: "#0d47a1" }}>Thống kê tài liệu</h2>
          <PieChart width={300} height={250}>
            <Pie data={documentByScope} dataKey="value" nameKey="name" outerRadius={80}>
              {documentByScope.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </>
      )}
    </div>
  );
}
