import React, { useEffect, useState } from "react";
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io";
import avatar from "../../../assets/avatar.png";
import {
  TbSquareRoundedChevronsLeftFilled,
  TbSquareRoundedChevronsRightFilled,
} from "react-icons/tb";
import MemberDetails from "./MemberDetails/MemberDetails";

function Members() {
  // Define table headers
  const fields = [
    { flex: 1, field: "STT" },
    { flex: 3, field: "Họ và tên" },
    { flex: 3, field: "Email" },
    { flex: 2, field: "Số điện thoại" },
    { flex: 2, field: "Vai trò" },
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
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [position, setPosition] = useState("all");
  const [reload, setReload] = useState(false);

  // Handle search input change
  const handleSearch = (e) => {
    try {
      setSearch(e.target.value);
      const result = data.filter(
        (item) =>
          item.fullname.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.phone.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(result);
      setCurrentPage(1);
      // Reload data if search input is cleared
      if (e.target.value === "") {
        setReload((prev) => !prev);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  // Fetch members data from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/members?page=${currentPage}&limit=10&position=${position}&status=${status}&search=&sortBy=createdAt&sortOrder=asc`,
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
        setData(data.data.members);
        setTotalPages(data.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [status, position, currentPage, openDetails, reload]);

  // This useEffect seems unnecessary as `search` is already handled in `handleSearch`
  // and doesn't trigger a re-fetch from the API based on `search` state change.
  // Consider removing or integrating its logic into `handleSearch` if needed for API calls.
  useEffect(() => {}, [search]);

  return (
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
            flex: 3,
            padding: "20px",
            borderRadius: "20px",
            boxShadow: "0px 5px 15px #e0e0e0",
          }}
        >
          <input
            type="text"
            placeholder="Nhập thông tin đoàn viên tìm kiếm"
            style={{
              all: "unset",
              width: "100%",
              height: "20px",
              caretColor: "black",
            }}
            value={search}
            onChange={handleSearch}
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
                case "Bí thư":
                  setPosition("Bí thư");
                  break;
                case "Phó Bí thư":
                  setPosition("Phó Bí thư");
                  break;
                case "Ủy viên BCH":
                  setPosition("Ủy viên BCH");
                  break;
                case "Đoàn viên":
                  setPosition("Đoàn viên");
                  break;
                default:
                  setPosition("all");
                  break;
              }
              setCurrentPage(1);
            }}
            defaultValue={""}
          >
            <option disabled value="">
              Chọn chức vụ
            </option>
            <option value="all">Tất cả</option>
            <option value="Đoàn viên">Đoàn viên</option>
            <option value="Bí thư">Bí thư</option>
            <option value="Phó Bí thư">Phó Bí thư</option>
            <option value="Ủy viên BCH">Ủy viên BCH</option>
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
            defaultValue={""}
          >
            <option disabled value="">
              Chọn trạng thái
            </option>
            <option value="all">Tất cả</option>
            <option value="active">Hoạt động</option>
            <option value="banned">Bị khóa</option>
          </select>
        </div>

        {/* Add Button Placeholder - Currently empty */}
        {/* You can add an add button here, for example:
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <IoIosAddCircleOutline size={40} color="#0d47a1" />
        </div>
        */}
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
                  setOpenDetails(true);
                  setId(item._id);
                }}
              >
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: fields[0].flex,
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
                    <img
                      src={item.avatar || avatar}
                      style={{
                        borderRadius: "100px",
                        height: "60px",
                        aspectRatio: "1/1",
                      }}
                      alt="avatar"
                    />
                    <p style={{ marginLeft: "10px" }}>{item.fullname}</p>
                  </div>
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: fields[2].flex,
                  }}
                >
                  {item.email}
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: fields[3].flex,
                  }}
                >
                  {item.phone}
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: fields[4].flex,
                  }}
                >
                  {item.infoMember.position}
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: fields[5].flex,
                  }}
                >
                  {item.status === "active" ? (
                    <p style={{ color: "#00c853", fontWeight: "bold" }}>
                      Hoạt động
                    </p>
                  ) : (
                    <p style={{ fontWeight: "bold", color: "#d50000" }}>
                      Bị khóa
                    </p>
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
        <div>
          <TbSquareRoundedChevronsLeftFilled
            onClick={() => {
              if (currentPage !== 1) {
                setCurrentPage((prev) => prev - 1);
              }
            }}
            size={40}
            color={hoverBack ? "#90caf9" : "#0d47a1"}
            onMouseEnter={() => setHoverBack(true)}
            onMouseLeave={() => setHoverBack(false)}
            style={{ cursor: "pointer" }}
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
          {/* Conditional rendering for pagination based on totalPages */}
          {totalPages > 6 ? (
            <>
              {/* Show previous page if not on the first page */}
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
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  <p>{currentPage - 1}</p>
                </div>
              )}
              {/* Current page */}
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
                  backgroundColor: "#90caf9",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <p>{currentPage}</p>
              </div>
              {/* Next page */}
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
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <p>{currentPage + 1}</p>
              </div>
              {/* Show additional pages with ellipsis if applicable */}
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
                }}
              >
                <p>...</p>
              </div>
              {/* Last few pages */}
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
                onClick={() => setCurrentPage(totalPages)}
              >
                <p>{totalPages}</p>
              </div>
            </>
          ) : (
            <>
              {/* Render all pages if totalPages is 6 or less */}
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
                  onClick={() => setCurrentPage(index + 1)}
                >
                  <p>{index + 1}</p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Next Button */}
        <div>
          <TbSquareRoundedChevronsRightFilled
            size={40}
            color={hoverNext ? "#90caf9" : "#0d47a1"}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            onClick={() => {
              if (currentPage !== totalPages) {
                setCurrentPage((prev) => prev + 1);
              }
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Modals for Member Details */}
      {openDetails && <MemberDetails id={id} setOpen={setOpenDetails} />}
    </div>
  );
}

export default Members;