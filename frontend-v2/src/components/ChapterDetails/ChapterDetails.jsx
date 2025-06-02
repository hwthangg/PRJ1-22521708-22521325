import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import avatar from "../../assets/avatar.png";

function ChapterDetails({chapterId, setOpen}) {

  const navigate = useNavigate();

  const [toggleGeneral, setToggleGeneral] = useState(true);
  const [toggleMembers, setToggleMembers] = useState(false);
  const [toggleEvents, setToggleEvents] = useState(false);
  const [toggleDocuments, setToggleDocuments] = useState(false);

  const [status, setStatus] = useState("");
  const [manager, setManager] = useState({});
  const [general, setGeneral] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    affiliated: "",
    address: "",
    establishedAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setGeneral((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdating = async () => {
    try {
      console.log(JSON.stringify({ formData }));
      // TODO: Thêm logic cập nhật vào backend ở đây
      const res = await fetch(`http://localhost:5000/api/chapters/${chapterId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          affiliated: formData.affiliated,
          establishedAt: formData.establishedAt,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      // TODO: Xử lý lỗi nếu cần
    }
  };

  const handleLock = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/chapters/${chapterId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: general.status === "active" ? "banned" : "active",
        }),
      });
      setStatus((prev) => (prev === "active" ? "banned" : "active"));
      const data = await res.json();
      console.log(data);
    } catch (error) {
      // TODO: Xử lý lỗi nếu cần
    }
  };

  useEffect(() => {
    console.log(chapterId);
    const fetchChapter = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/chapters/${chapterId}`);
        const data = await res.json();

        data.data.general.establishedAt = data.data.general.establishedAt.slice(0, 10);

        setGeneral(data.data.general);
        setStatus(data.data.general.status);
        setManager(data.data.manager[0] || {});
        console.log(data);
      } catch (error) {
        // TODO: Xử lý lỗi nếu cần
      }
    };
    fetchChapter();
  }, [chapterId]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px 0",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/admin/chapters")}
        >
          <IoChevronBackOutline size={30} color="#0d47a1" />
          <p style={{ color: "#0d47a1", fontWeight: "bold", fontSize: "large" }}>
            Trở về
          </p>
        </div>

        <div
          style={{
            padding: "20px 60px",
            display: "flex",
            gap: "40px",
            flexDirection: "column",
            flex: "1",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Thông tin chung */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
            }}
          >
            <div
              onClick={() => setToggleGeneral((prev) => !prev)}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "20px",
                cursor: "pointer",
              }}
            >
              <p style={{ fontSize: "22px", fontWeight: "bold", color: "#0d47a1" }}>
                Thông tin chung
              </p>
              {toggleGeneral ? (
                <FaChevronUp size={25} color="#0d47a1" />
              ) : (
                <FaChevronDown size={25} color="#0d47a1" />
              )}
            </div>

            {toggleGeneral && (
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexDirection: "column",
                }}
              >
                {/* Row đầu: Tên, Ngày thành lập, Trực thuộc */}
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexDirection: "row",
                  }}
                >
                  {/* Tên chi đoàn */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      flex: 2,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "large",
                        color: "#0d47a1",
                        fontWeight: "bold",
                      }}
                    >
                      Tên chi đoàn
                    </p>
                    <div
                      style={{
                        border: "2px solid #0d47a1",
                        borderRadius: "10px",
                        padding: "10px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        name="name"
                        style={{
                          border: "none",
                          outline: "none",
                          caretColor: "black",
                          width: "100%",
                          color: "#0d47a1",
                        }}
                        value={general.name || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Ngày thành lập */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "large",
                        color: "#0d47a1",
                        fontWeight: "bold",
                      }}
                    >
                      Ngày thành lập
                    </p>
                    <div
                      style={{
                        border: "2px solid #0d47a1",
                        borderRadius: "10px",
                        padding: "10px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="date"
                        name="establishedAt"
                        style={{
                          border: "none",
                          outline: "none",
                          caretColor: "black",
                          width: "100%",
                          color: "#0d47a1",
                        }}
                        value={general.establishedAt || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Trực thuộc đoàn cơ sở */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      flex: 2,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "large",
                        color: "#0d47a1",
                        fontWeight: "bold",
                      }}
                    >
                      Trực thuộc đoàn cơ sở
                    </p>
                    <div
                      style={{
                        border: "2px solid #0d47a1",
                        borderRadius: "10px",
                        padding: "10px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        name="affiliated"
                        style={{
                          border: "none",
                          outline: "none",
                          caretColor: "black",
                          width: "100%",
                          color: "#0d47a1",
                        }}
                        value={general.affiliated || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Địa chỉ */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      fontSize: "large",
                      color: "#0d47a1",
                      fontWeight: "bold",
                    }}
                  >
                    Địa chỉ
                  </p>
                  <div
                    style={{
                      border: "2px solid #0d47a1",
                      borderRadius: "10px",
                      padding: "10px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      name="address"
                      style={{
                        border: "none",
                        outline: "none",
                        caretColor: "black",
                        width: "100%",
                        color: "#0d47a1",
                      }}
                      value={general.address || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Người quản lý chi đoàn và Trạng thái */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "large",
                        color: "#0d47a1",
                        fontWeight: "bold",
                      }}
                    >
                      Người quản lý chi đoàn
                    </p>
                    <div
                      style={{
                        borderRadius: "10px",
                        padding: "20px 0",
                        height: "30px",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <img
                        src={manager.avatar || avatar}
                        style={{ width: "60px", aspectRatio: "1/1" }}
                        alt="avatar"
                      />
                      <p>{manager.fullname}</p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "large",
                        color: "#0d47a1",
                        fontWeight: "bold",
                      }}
                    >
                      Trạng thái
                    </p>
                    {status === "active" ? (
                      <div
                        style={{
                          backgroundColor: "#00c853",
                          padding: "10px 30px",
                          borderRadius: "10px",
                          color: "white",
                          fontSize: "large",
                          fontWeight: "bold",
                          width: "80px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>Hoạt động</p>
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "#d50000",
                          padding: "10px 30px",
                          borderRadius: "10px",
                          color: "white",
                          fontSize: "large",
                          fontWeight: "bold",
                          width: "80px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>Khóa</p>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: "15px",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        all: "unset",
                        padding: "10px 60px",
                        borderRadius: "10px",
                        backgroundColor: "#0d47a1",
                        cursor: "pointer",
                        width: "80px",
                      }}
                      onClick={handleUpdating}
                    >
                      <p
                        style={{
                          fontSize: "large",
                          fontWeight: "bold",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Cập nhật
                      </p>
                    </div>
                    <div
                      style={{
                        all: "unset",
                        padding: "10px 60px",
                        borderRadius: "10px",
                        backgroundColor: "#d50000", // Ghi đè màu nền trực tiếp
                        cursor: "pointer",
                        width: "80px",
                      }}
                      onClick={handleLock}
                    >
                      <p
                        style={{
                          fontSize: "large",
                          fontWeight: "bold",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {status === "active" ? "Khóa" : "Mở khóa"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Danh sách đoàn viên */}
          <div>
            <div
              onClick={() => setToggleMembers((prev) => !prev)}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "20px",
                cursor: "pointer",
              }}
            >
              <p style={{ fontSize: "22px", fontWeight: "bold", color: "#0d47a1" }}>
                Danh sách đoàn viên
              </p>
              {toggleMembers ? (
                <FaChevronUp size={25} color="#0d47a1" />
              ) : (
                <FaChevronDown size={25} color="#0d47a1" />
              )}
            </div>
            {toggleMembers && <div>LIST</div>}
          </div>

          {/* Danh sách sự kiện */}
          <div>
            <div
              onClick={() => setToggleEvents((prev) => !prev)}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "20px",
                cursor: "pointer",
              }}
            >
              <p style={{ fontSize: "22px", fontWeight: "bold", color: "#0d47a1" }}>
                Danh sách sự kiện
              </p>
              {toggleEvents ? (
                <FaChevronUp size={25} color="#0d47a1" />
              ) : (
                <FaChevronDown size={25} color="#0d47a1" />
              )}
            </div>
            {toggleEvents && <div>LIST</div>}
          </div>

          {/* Danh sách tài liệu */}
          <div>
            <div
              onClick={() => setToggleDocuments((prev) => !prev)}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "20px",
                cursor: "pointer",
              }}
            >
              <p style={{ fontSize: "22px", fontWeight: "bold", color: "#0d47a1" }}>
                Danh sách tài liệu
              </p>
              {toggleDocuments ? (
                <FaChevronUp size={25} color="#0d47a1" />
              ) : (
                <FaChevronDown size={25} color="#0d47a1" />
              )}
            </div>
            {toggleDocuments && <div>LIST</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChapterDetails;