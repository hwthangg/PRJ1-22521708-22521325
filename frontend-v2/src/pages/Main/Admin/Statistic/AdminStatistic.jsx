import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import styles from "./AdminStatistic.module.css";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip);

const CustomLegend = ({ labels, colors }) => (
  <div className={styles.legend}>
    {labels.map((label, index) => (
      <div key={index} className={styles.legendItem}>
        <div
          className={styles.colorBox}
          style={{ backgroundColor: colors[index] }}
        />
        <span>{label}</span>
      </div>
    ))}
  </div>
);

export default function AdminStatistic() {
  const [statusCounts, setStatusCounts] = useState([0, 0, 0]);
  const [roleCounts, setRoleCounts] = useState([0, 0, 0]);
  const [chapterStatusCounts, setChapterStatusCounts] = useState([0, 0]);
  const [chapterManagerCounts, setChapterManagerCounts] = useState([0, 0]);

  useEffect(() => {
    const fetchStatistic = async () => {
      try {
        // Thống kê tài khoản
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/accounts/statistic`);
        const result = await res.json();
        if (result.success) {
          const { status, role } = result.data;

          setStatusCounts([
            status.active || 0,
            status.locked || 0,
            status.pending || 0,
          ]);

          setRoleCounts([
            role.admin || 0,
            role.manager || 0,
            role.member || 0,
          ]);
        } else {
          toast.error(result.message || "Không thể lấy dữ liệu thống kê tài khoản.");
        }

        // Thống kê chi đoàn
        const res1 = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/chapters/statistic`);
        const result1 = await res1.json();
console.log(result1)
        if (result1.success) {
          const { status, manager } = result1.data;

          setChapterStatusCounts([
            status.active || 0,
            status.locked || 0,
          ]);

          setChapterManagerCounts([
            manager.hadManager || 0,
            manager.noManager || 0,
          ]);
        } else {
          toast.error(result1.message || "Không thể lấy thống kê chi đoàn.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra khi lấy dữ liệu thống kê.");
      }
    };

    fetchStatistic();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const statusData = {
    labels: ["Hoạt động", "Bị khóa", "Chờ phê duyệt"],
    datasets: [
      {
        data: statusCounts,
        backgroundColor: ["#2196F3", "#1976D2", "#BBDEFB"],
      },
    ],
  };

  const roleData = {
    labels: ["Quản trị viên", "Quản lý chi đoàn", "Đoàn viên"],
    datasets: [
      {
        data: roleCounts,
        backgroundColor: ["#1E88E5", "#42A5F5", "#90CAF9"],
      },
    ],
  };

  const chapterManagerData = {
    labels: ["Có người quản lý", "Chưa có người quản lý"],
    datasets: [
      {
        data: chapterManagerCounts,
        backgroundColor: ["#64B5F6", "#B3E5FC"],
      },
    ],
  };

  const chapterStatusData = {
    labels: ["Hoạt động", "Bị khóa"],
    datasets: [
      {
        data: chapterStatusCounts,
        backgroundColor: ["#0D47A1", "#64B5F6"],
      },
    ],
  };

  return (
    <div className={styles.container}>
      {/* Section 1: Tài khoản */}
      <div className={styles.section}>
        <p className={styles.title}>Thống kê tài khoản</p>
        <div className={styles.chartsRow}>
          <div className={styles.chartBox}>
            <h4>Theo trạng thái</h4>
            <div className={styles.chartContainer}>
              <Doughnut data={statusData} options={options} />
              <CustomLegend
                labels={statusData.labels}
                colors={statusData.datasets[0].backgroundColor}
              />
            </div>
          </div>

          <div className={styles.chartBox}>
            <h4>Theo vai trò</h4>
            <div className={styles.chartContainer}>
              <Doughnut data={roleData} options={options} />
              <CustomLegend
                labels={roleData.labels}
                colors={roleData.datasets[0].backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Chi đoàn */}
      <div className={styles.section}>
        <p className={styles.title}>Thống kê chi đoàn</p>
        <div className={styles.chartsRow}>
          <div className={styles.chartBox}>
            <h4>Trạng thái quản lý</h4>
            <div className={styles.chartContainer}>
              <Doughnut data={chapterManagerData} options={options} />
              <CustomLegend
                labels={chapterManagerData.labels}
                colors={chapterManagerData.datasets[0].backgroundColor}
              />
            </div>
          </div>

          <div className={styles.chartBox}>
            <h4>Trạng thái hoạt động</h4>
            <div className={styles.chartContainer}>
              <Doughnut data={chapterStatusData} options={options} />
              <CustomLegend
                labels={chapterStatusData.labels}
                colors={chapterStatusData.datasets[0].backgroundColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
