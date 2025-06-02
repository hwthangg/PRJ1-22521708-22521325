import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import {
  TbSquareRoundedChevronsLeftFilled,
  TbSquareRoundedChevronsRightFilled,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import DocumentDetails from "./DocumentDetails/DocumentDetails";
import AddDocument from "./AddDocument/AddDocument";

function Documents() {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [openAddForm, setOpenAddForm] = useState(false)
  
  // Define table headers
  const fields = [
  { flex: 1, field: "STT" },              // Ngắn, giữ nguyên
  { flex: 4, field: "Tên tài liệu" },     // Thường dài, tăng
  { flex: 2, field: "Loại" },           // Có thể trung bình, giảm nhẹ
  { flex: 2, field: "Số hiệu" },        // Thường ngắn, vừa phải
  { flex: 2, field: "Ngày ban hành" },    // Định dạng ngày, giữ nguyên
  { flex: 3, field: "Nơi ban hành" },   // Có thể hơi dài, tăng nhẹ
  { flex: 2, field: "Phạm vi" },          // Trung bình, giữ nguyên
];


  // UI state variables
  const [hoverBack, setHoverBack] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Example value for UI
  const [data, setData] = useState([])
  // Mock data for UI display only
  const mockData = [
    {
      _id: "1",
      name: "Sự kiện mẫu 1",
      location: "Địa điểm mẫu",
      startedAt: new Date().toISOString(),
      scope: "public",
      status: "pending"
    },
    {
      _id: "2",
      name: "Sự kiện mẫu 2",
      location: "Địa điểm mẫu",
      startedAt: new Date().toISOString(),
      scope: "private",
      status: "active"
    },
    {
      _id: "3",
      name: "Sự kiện mẫu 3",
      location: "Địa điểm mẫu",
      startedAt: new Date().toISOString(),
      scope: "public",
      status: "completed"
    },
    {
      _id: "4",
      name: "Sự kiện mẫu 4",
      location: "Địa điểm mẫu",
      startedAt: new Date().toISOString(),
      scope: "private",
      status: "canceled"
    },
  ];

  function formatUtcDateToDDMMYYYY(utcDateString) {
    const date = new Date(utcDateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
useEffect(()=>{
 const fetchDocuments = async ()=>{
  try {
     const res = await fetch(`http://localhost:5000/api/documents?page=1&limit=10&type=all&scope=all&search=&status=active&sortBy=createdAt&sortOrder=asc`,{
      method:'GET',
      credentials:'include'
     })
     const data = await res.json()
     console.log(data)
     setData(data.data.documents)
     setTotalPages(data.data.pagination.totalPages)
  } catch (error) {

    
  }
 }
 fetchDocuments()
},[])
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
                setRole(e.target.value);
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
                setStatus(e.target.value);
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
            onClick={()=>setOpenAddForm(true)}
          >
            <IoIosAddCircle
              size={50}
              color="#0d47a1"
              onClick={() => console.log("Add button clicked")}
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
                navigate(`/manager/documents/${item._id}`)
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
                      <p style={{ marginLeft: "10px" }}>{item.type}</p>
                    </div>
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
                    {item.docId}
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
                   {formatUtcDateToDDMMYYYY(item.issuedAt)}
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
                    {item.issuer}
                  </td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: fields[6].flex,
                      padding: "0 10px",
                    }}
                  >
                    {item.scope == 'chapter' ? <p>Chi đoàn</p>:<p>Mật</p>}
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
            style={{ cursor: "pointer" }}
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
                    backgroundColor: "#90caf9",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "default",
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
                    cursor: "default",
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
            style={{ cursor: "pointer" }}
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
        {openAddForm ? <><div style={{position:'absolute', backgroundColor: "rgba(70, 96, 170, 0.5)",top:0, border:'1px solid', width:'100%', height:'100vh', boxSizing:'border-box', padding:'20px 30px'}}><AddDocument setOpen={setOpenAddForm}/></div></>:<></>}
      </div>
      
    </>
  );
}

export default Documents;