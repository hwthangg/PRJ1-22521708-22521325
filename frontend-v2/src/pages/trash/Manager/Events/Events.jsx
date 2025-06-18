import React, { useEffect, useState } from "react";
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io";
import avatar from "../../../assets/avatar.png";
import {
  TbSquareRoundedChevronsLeftFilled,
  TbSquareRoundedChevronsRightFilled,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
// import styles from "./Accounts.module.css"; // We'll remove this as styles are now inline

function Events() {
  const navigate = useNavigate()
  // Define table headers
  const fields = [
    { flex: 1, field: "STT" },
    { flex: 3, field: "Tên sự kiện" },
    { flex: 3, field: "Địa điểm" },
    { flex: 2, field: "Ngày diễn ra" },
    { flex: 2, field: "Quy mô" },
    { flex: 2, field: "Trạng thái" },
  ];

  // State variables
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoverBack, setHoverBack] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");
  function formatUtcDateToDDMMYYYY(utcDateString) {
    const date = new Date(utcDateString);

    // Lấy ngày, tháng, năm theo múi giờ UTC để đảm bảo kết quả nhất quán
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Tháng trong JS bắt đầu từ 0
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }
  // Fetch accounts data from API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/events?page=1&limit=10&scope=all&search=&status=all&sortBy=createdAt&sortOrder=asc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
        setData(data.data.events);

        setTotalPages(data.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, [search, status, role, currentPage, openDetails, openAddForm]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "100vh",
          boxSizing: "border-box",
          flexDirection: "column",
          position: "relative",
          zIndex: 0,
        }}
      >
        {/* Header with Search and Filters */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "40px 60px 10px",
            gap: "20px",
          }}
        >
          {/* Search Container */}
          <div
            style={{
              display: "flex",
              width: "30%",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0px 5px 15px #e0e0e0",
            }}
          >
            <input
              type="text"
              placeholder="Nhập thông tin tài khoản tìm kiếm"
              style={{
                all: "unset",
                width: "100%",
                height: "20px",
                caretColor: "black",
              }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          {/* Role Filter */}
          <div
            style={{
              display: "flex",
              flex: 1,
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0px 5px 15px #e0e0e0",
            }}
          >
            <select
              style={{
                width: "100%",
                border: "none",
                outline: "none",
              }}
              onChange={(e) => {
                switch (e.target.value) {
                  case "member":
                    setRole("member");
                    break;
                  case "manager":
                    setRole("manager");
                    break;
                  case "admin":
                    setRole("admin");
                    break;
                  default:
                    setRole("all");
                    break;
                }
                setCurrentPage(1);
              }}
              defaultValue={"all"}
            >
              <option disabled value="">
                -- Chọn vai trò --
              </option>
              <option value="all">Tất cả</option>
              <option value="member">Đoàn viên</option>
              <option value="manager">Người quản lý chi đoàn</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>
          {/* Status Filter */}
          <div
            style={{
              display: "flex",
              flex: 1,
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0px 5px 15px #e0e0e0",
            }}
          >
            <select
              style={{
                width: "100%",
                border: "none",
                outline: "none",
              }}
              onChange={(e) => {
                switch (e.target.value) {
                  case "active":
                    setStatus("active");
                    break;
                  case "banned":
                    setStatus("banned");
                    break;
                  default:
                    setStatus("all");
                    break;
                }
                setCurrentPage(1);
              }}
              defaultValue={"all"}
            >
              <option disabled value="">
                -- Chọn trạng thái --
              </option>
              <option value="all">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="banned">Bị khóa</option>
            </select>
          </div>
          {/* Add Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flex: 1,
            }}
          >
            <IoIosAddCircle
              size={50}
              color="#0d47a1"
              onClick={() => setOpenAddForm(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        {/* Table Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px 60px 0",
            boxSizing: "border-box",
            boxShadow: "0px 0px 15px #e0e0e0",
            paddingBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <table
            style={{
              display: "flex",
              flexDirection: "column",
              cursor: "default",
            }}
          >
            {/* Table Header */}
            <thead>
              <tr
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  display: "flex",
                  flexDirection: "row",
                  height: "60px",
                  backgroundColor: "#0d47a1",
                }}
              >
                {fields.map((item, index) => (
                  <th
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "large",
                      flex: item.flex,
                    }}
                  >
                    {item.field}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "80px",
                    borderBottom: "1px solid",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#bcdafc")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                  onClick={() => {
                    navigate(`/manager/events/${item._id}`)
                  }}
                >
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: fields[0].flex,
                      padding: "0 10px",
                    }}
                  >
                    {index + 1 + (currentPage - 1) * 5}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: fields[1].flex,
                      padding: "0 10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "10px",
                      }}
                    >
                      <p style={{ marginLeft: "10px" }}>{item.name}</p>
                    </div>
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: fields[2].flex,
                      padding: "0 10px",
                    }}
                  >
                    {item.location}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: fields[3].flex,
                      padding: "0 10px",
                    }}
                  >
                    {formatUtcDateToDDMMYYYY(item.startedAt)}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: fields[4].flex,
                      padding: "0 10px",
                    }}
                  >
                    {item.scope == "public" ? "Cộng đồng" : "Chi đoàn"}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: fields[5].flex,
                      padding: "0 10px",
                    }}
                  >
                    {item.status == "completed" ? (
                      <p style={{ color: "#00c853", fontWeight: "bold" }}>
                        Hoàn thành
                      </p>
                    ) : (
                      <></>
                    )}
                      {item.status == "pending" ? (
                      <p style={{ color: "#f57f18", fontWeight: "bold" }}>
                        Sắp diễn ra
                      </p>
                    ) : (
                      <></>
                    )}
                      {item.status == "canceled" ? (
                      <p style={{ color: "#d50000", fontWeight: "bold" }}>
                        Đã hủy
                      </p>
                    ) : (
                      <></>
                    )}
                    {item.status == "active" ? (
                      <p style={{ color: "#304ffe", fontWeight: "bold" }}>
                        Đang diễn ra
                      </p>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "30px",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Previous Button */}
          <div
            onMouseEnter={() => setHoverBack(true)}
            onMouseLeave={() => setHoverBack(false)}
            style={{ cursor: "pointer" }} // Added cursor pointer here
          >
            <TbSquareRoundedChevronsLeftFilled
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage((prev) => prev - 1);
                }
              }}
              size={40}
              color={hoverBack ? "#90caf9" : "#0d47a1"}
            />
          </div>
          {/* Page Numbers */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
            }}
          >
            {totalPages > 6 ? (
              <>
                {currentPage !== 1 && (
                  <div
                    style={{
                      width: "20px",
                      aspectRatio: "1 / 1",
                      border: "1px solid",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "100px",
                      backgroundColor: "#0d47a1",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#90caf9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0d47a1")
                    }
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    <p>{currentPage - 1}</p>
                  </div>
                )}
                <div
                  style={{
                    width: "20px",
                    aspectRatio: "1 / 1",
                    border: "1px solid",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100px",
                    backgroundColor: "#90caf9", // Active page color
                    color: "white",
                    fontWeight: "bold",
                    cursor: "default", // Current page is not clickable
                  }}
                >
                  <p>{currentPage}</p>
                </div>
                <div
                  style={{
                    width: "20px",
                    aspectRatio: "1 / 1",
                    border: "1px solid",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100px",
                    backgroundColor: "#0d47a1",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#90caf9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0d47a1")
                  }
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  <p>{currentPage + 1}</p>
                </div>
                {currentPage === 1 && (
                  <div
                    style={{
                      width: "20px",
                      aspectRatio: "1 / 1",
                      border: "1px solid",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "100px",
                      backgroundColor: "#0d47a1",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#90caf9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0d47a1")
                    }
                    onClick={() => setCurrentPage((prev) => prev + 2)}
                  >
                    <p>{currentPage + 2}</p>
                  </div>
                )}
                <div
                  style={{
                    width: "20px",
                    aspectRatio: "1 / 1",
                    border: "1px solid",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100px",
                    backgroundColor: "#0d47a1",
                    color: "white",
                    cursor: "default", // Ellipsis is not clickable
                  }}
                >
                  <p>...</p>
                </div>
                <div
                  style={{
                    width: "20px",
                    aspectRatio: "1 / 1",
                    border: "1px solid",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100px",
                    backgroundColor: "#0d47a1",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#90caf9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0d47a1")
                  }
                  onClick={() => setCurrentPage(totalPages - 2)}
                >
                  <p>{totalPages - 2}</p>
                </div>
                <div
                  style={{
                    width: "20px",
                    aspectRatio: "1 / 1",
                    border: "1px solid",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100px",
                    backgroundColor: "#0d47a1",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#90caf9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0d47a1")
                  }
                  onClick={() => setCurrentPage(totalPages - 1)}
                >
                  <p>{totalPages - 1}</p>
                </div>
                <div
                  style={{
                    width: "20px",
                    aspectRatio: "1 / 1",
                    border: "1px solid",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "100px",
                    backgroundColor: "#0d47a1",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#90caf9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0d47a1")
                  }
                  onClick={() => setCurrentPage(totalPages)}
                >
                  <p>{totalPages}</p>
                </div>
              </>
            ) : (
              <>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "20px",
                      aspectRatio: "1 / 1",
                      border: "1px solid",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "100px",
                      backgroundColor:
                        index + 1 === currentPage ? "#90caf9" : "#0d47a1",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: index + 1 === currentPage ? "bold" : "normal",
                    }}
                    onMouseEnter={(e) =>
                      index + 1 !== currentPage &&
                      (e.currentTarget.style.backgroundColor = "#90caf9")
                    }
                    onMouseLeave={(e) =>
                      index + 1 !== currentPage &&
                      (e.currentTarget.style.backgroundColor = "#0d47a1")
                    }
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    <p>{index + 1}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* Next Button */}
          <div
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            style={{ cursor: "pointer" }} // Added cursor pointer here
          >
            <TbSquareRoundedChevronsRightFilled
              size={40}
              color={hoverNext ? "#90caf9" : "#0d47a1"}
              onClick={() => {
                if (currentPage !== totalPages) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
            />
          </div>
        </div>
        {/* Modals */}
        {openDetails && <AccountDetails id={id} setOpen={setOpenDetails} />}
        {openAddForm && <AddAccount setOpen={setOpenAddForm} />}
      </div>
    </>
  );
}

export default Events;
