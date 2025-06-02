import React, { useEffect, useState } from "react";
import avatar from "../../../../assets/avatar.png";
import {
  FaIdCard,
  FaBook,
  FaHouseUser,
  FaRegUser,
  FaUserFriends,
  FaUsers,
  FaUserTag,
  FaChevronDown,
} from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { MdEmail, MdOutlineFamilyRestroom, MdPhone } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";

function RequestAccountDetails({ id, setOpen }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullname: "",
    birthday: "",
    gender: "",
    role: "",
    chapterId: "",
    cardId: "",
    position: "",
    joinedAt: "",
    address: "",
    hometown: "",
    ethnicity: "",
    religion: "",
    eduLevel: "",
    avatar: "",
  });

  const [account, setAccount] = useState({});

  const [avatarFile, setAvatarFile] = useState();
  const [toggleaccount, setToggleaccount] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [status, setStatus] = useState("");
  const handleRequest = async (status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/accounts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      });
     
      const data = await res.json();
      console.log(data);
    } catch (error) {}
  };
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/chapters/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setChapters(data.data.chapters);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chi đoàn:", error);
      }
    };
    const fetchAccount = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/accounts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        console.log(data);

        if (data.data.account) {
          data.data.account.birthday = data.data.account.birthday.slice(0, 10);
          setAccount(data.data.account);
          
        }
        if (data.data.infoMember) {
          data.data.infoMember.joinedAt = data.data.infoMember.joinedAt.slice(
            0,
            10
          );

          setAccount((prev) => ({
            ...prev,
            ...data.data.infoMember,
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chi đoàn:", error);
      }
    };
    fetchChapters();
    fetchAccount();
    console.log(id);
  }, []);

  useEffect(() => {
    console.log(account, formData);
  }, [account, formData]);

  useEffect(() => {
    console.log("Chapters sau khi set:", chapters);
  }, [chapters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const RenderChapters = () => {
    return (
      <>
        {chapters.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </>
    );
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAccount((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
      setAvatarFile(file);
    }
  };

  const handleUpdating = async () => {
    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "avatar") {
          formDataToSend.append(key, value);
        }
      });

      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      }
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }
      const res = await fetch(`http://localhost:5000/api/accounts/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await res.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          display: "flex",
          backgroundColor: "rgb(70,96,170, 0.5)",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            backgroundColor: "white",
            borderRadius: "20px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div
            style={{ position: "absolute", top: 5, right: 5 }}
            onClick={() => setOpen(false)}
          >
            <IoIosCloseCircle size={40} color="red" />
          </div>
          <div
            style={{
              overflowY: "auto",
              height: "700px",
              margin: "80px 10px 20px",
              padding: "5px 10px 20px",
            }}
          >
            <div style={{ boxSizing: "border-box", display: "flex" }}>
              <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div
                  style={{ 
                    position: "relative",
                    display: "flex",
                    padding: "0 20px 0 40px",
                    borderRadius: "20px",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      border: "none",
                      height: "fit-content",
                      display: "flex",
                    }}
                  >
                    <>
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          backgroundColor: "#ffd600",
                          padding: "10px 30px",
                          margin: "0 0 0 10px",
                          borderRadius: "10px",
                          color: "white",
                          fontSize: "large",
                          fontWeight: "bold",
                          width: "120px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <p>Chờ phê duyệt</p>
                      </div>
                    </>

                    <img
                      style={{
                        width: "160px",
                        aspectRatio: "1 / 1",
                        borderRadius: "100px",
                        border: "2px solid #0d47a1",
                      }}
                      src={account.avatar || avatar}
                      alt="avatar"
                    />
                    <input
                      style={{
                        all: "unset",
                        display: "none",
                      }}
                      type="file"
                      accept="image/*"
                      id="avatar"
                      name="avatar"
                      onChange={handleAvatarChange}
                    />
                    <label
                      style={{
                        border: "2px solid #0d47a1",
                        padding: "10px",
                        color: "#0d47a1",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      htmlFor="avatar"
                    >
                      Chọn ảnh đại diện
                    </label>
                  </div>

                  <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Email</p>
                  <div style={{ 
                    border: "2px solid #0d47a1",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: "20px",
                    height: "30px",
                  }}>
                    <MdEmail size={30} color="#0d47a1" />
                    <input
                      style={{
                        all: "unset",
                        width: "100%",
                        marginLeft: "15px",
                        caretColor: "black",
                        color: "#0d47a1",
                      }}
                      type="email"
                      name="email"
                      value={account.email || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Số điện thoại</p>
                  <div style={{ 
                    border: "2px solid #0d47a1",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: "20px",
                    height: "30px",
                  }}>
                    <MdPhone size={30} color="#0d47a1" />
                    <input
                      style={{
                        all: "unset",
                        width: "100%",
                        marginLeft: "15px",
                        caretColor: "black",
                        color: "#0d47a1",
                      }}
                      type="tel"
                      name="phone"
                      value={account.phone || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Họ và tên</p>
                  <div style={{ 
                    border: "2px solid #0d47a1",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: "20px",
                    height: "30px",
                  }}>
                    <FaRegUser size={25} color="#0d47a1" />
                    <input
                      style={{
                        all: "unset",
                        width: "100%",
                        marginLeft: "15px",
                        caretColor: "black",
                        color: "#0d47a1",
                      }}
                      type="text"
                      name="fullname"
                      value={account.fullname || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: "30px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Ngày sinh</p>
                      <div
                        style={{ 
                          border: "2px solid #0d47a1",
                          padding: "10px",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          marginBottom: "20px",
                          height: "30px",
                          paddingLeft: 0,
                        }}
                      >
                        <input
                          style={{
                            all: "unset",
                            width: "100%",
                            marginLeft: "15px",
                            caretColor: "black",
                            color: "#0d47a1",
                          }}
                          type="date"
                          name="birthday"
                          value={account.birthday || "2000-01-01"}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div style={{ flex: 1 }}>
                      <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Giới tính</p>
                      <div style={{ 
                        border: "2px solid #0d47a1",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBottom: "20px",
                        height: "30px",
                      }}>
                        <select
                          name="gender"
                          style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            color: "#0d47a1",
                          }}
                          value={account.gender || "Nam"}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            -- Chọn giới tính --
                          </option>
                          <option value="Nam" defaultChecked>
                            Nam
                          </option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Vai trò</p>
                  <div style={{ 
                    border: "2px solid #0d47a1",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: "20px",
                    height: "30px",
                  }}>
                    <p
                      name="role"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        color: "#0d47a1",
                      }}
                      value={account.role || "Không"}
                      onChange={handleChange}
                    >
                      {account.role == "member"
                        ? "Đoàn viên"
                        : account.role == "manager"
                        ? "Người quản lý chi đoàn"
                        : "Quản trị viên"}
                    </p>
                  </div>
                  {account.role == "member" ? (
                    <>
                      <div
                        onClick={() => setToggleaccount((prev) => !prev)}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItem: "center",
                          gap: "20px",
                          margin: "10px 0 15px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "#0d47a1",
                          }}
                        >
                          Thông tin đoàn viên
                        </p>
                        {toggleaccount ? (
                          <FaChevronUp size={30} color="#0d47a1" />
                        ) : (
                          <FaChevronDown size={30} color="#0d47a1" />
                        )}
                      </div>
                      {toggleaccount ? (
                        <>
                          <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Chi đoàn sinh hoạt</p>
                          <div style={{ 
                            border: "2px solid #0d47a1",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: "20px",
                            height: "30px",
                          }}>
                            <select
                              name="chapterId"
                              style={{
                                flex: 1,
                                border: "none",
                                outline: "none",
                                color: "#0d47a1",
                              }}
                              value={account.chapterId._id || ""}
                              onChange={handleChange}
                            >
                              <option value="">Chọn chi đoàn</option>
                              <RenderChapters />
                            </select>
                          </div>

                          <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Số thẻ đoàn</p>
                          <div style={{ 
                            border: "2px solid #0d47a1",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: "20px",
                            height: "30px",
                          }}>
                            <FaIdCard size={30} color="#0d47a1" />
                            <input
                              style={{
                                all: "unset",
                                width: "100%",
                                marginLeft: "15px",
                                caretColor: "black",
                                color: "#0d47a1",
                              }}
                              type="text"
                              placeholder="Nhập số thẻ đoàn"
                              name="cardId"
                              value={account.cardId || ""}
                              onChange={handleChange}
                            />
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              gap: "30px",
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Chức vụ</p>
                              <div style={{ 
                                border: "2px solid #0d47a1",
                                padding: "10px",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                marginBottom: "20px",
                                height: "30px",
                              }}>
                                <FaUserTag size={30} color="#0d47a1" />
                                <select
                                  name="position"
                                  style={{
                                    flex: 1,
                                    border: "none",
                                    outline: "none",
                                    paddingLeft: "9px",
                                    color: "#0d47a1",
                                  }}
                                  value={account.position || ""}
                                  onChange={handleChange}
                                >
                                  <option value="Đoàn viên">Đoàn viên</option>
                                  <option value="Phó Bí thư">Phó Bí thư</option>
                                  <option value="Bí thư">Bí thư</option>
                                </select>
                              </div>
                            </div>

                            <div style={{ flex: 1 }}>
                              <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Ngày vào đoàn</p>
                              <div
                                style={{ 
                                  border: "2px solid #0d47a1",
                                  padding: "10px",
                                  borderRadius: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "row",
                                  marginBottom: "20px",
                                  height: "30px",
                                  paddingLeft: 0,
                                }}
                              >
                                <input
                                  style={{
                                    all: "unset",
                                    width: "100%",
                                    marginLeft: "15px",
                                    caretColor: "black",
                                    color: "#0d47a1",
                                  }}
                                  type="date"
                                  name="joinedAt"
                                  value={account.joinedAt || "2000-01-01"}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Địa chỉ</p>
                          <div style={{ 
                            border: "2px solid #0d47a1",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: "20px",
                            height: "30px",
                          }}>
                            <FaHouseUser size={30} color="#0d47a1" />
                            <input
                              style={{
                                all: "unset",
                                width: "100%",
                                marginLeft: "15px",
                                caretColor: "black",
                                color: "#0d47a1",
                              }}
                              type="text"
                              placeholder="Nhập địa chỉ"
                              name="address"
                              value={account.address || ""}
                              onChange={handleChange}
                            />
                          </div>

                          <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Quê quán</p>
                          <div style={{ 
                            border: "2px solid #0d47a1",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: "20px",
                            height: "30px",
                          }}>
                            <MdOutlineFamilyRestroom size={30} color="#0d47a1" />
                            <input
                              style={{
                                all: "unset",
                                width: "100%",
                                marginLeft: "15px",
                                caretColor: "black",
                                color: "#0d47a1",
                              }}
                              type="text"
                              placeholder="Nhập quê quán"
                              name="hometown"
                              value={account.hometown || ""}
                              onChange={handleChange}
                            />
                          </div>

                          <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Dân tộc</p>
                          <div style={{ 
                            border: "2px solid #0d47a1",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: "20px",
                            height: "30px",
                          }}>
                            <FaUsers size={25} color="#0d47a1" />
                            <input
                              style={{
                                all: "unset",
                                width: "100%",
                                marginLeft: "15px",
                                caretColor: "black",
                                color: "#0d47a1",
                              }}
                              type="text"
                              placeholder="Nhập dân tộc"
                              name="ethnicity"
                              value={account.ethnicity || ""}
                              onChange={handleChange}
                            />
                          </div>

                          <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Tôn giáo</p>
                          <div style={{ 
                            border: "2px solid #0d47a1",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: "20px",
                            height: "30px",
                          }}>
                            <FaUserFriends size={25} color="#0d47a1" />
                            <input
                              style={{
                                all: "unset",
                                width: "100%",
                                marginLeft: "15px",
                                caretColor: "black",
                                color: "#0d47a1",
                              }}
                              type="text"
                              placeholder="Nhập tôn giáo"
                              name="religion"
                              value={account.religion || ""}
                              onChange={handleChange}
                            />
                          </div>

                          <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Trình độ học vấn</p>
                          <div style={{ 
                            border: "2px solid #0d47a1",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: "20px",
                            height: "30px",
                          }}>
                            <FaBook size={25} color="#0d47a1" />
                            <input
                              style={{
                                all: "unset",
                                width: "100%",
                                marginLeft: "15px",
                                caretColor: "black",
                                color: "#0d47a1",
                              }}
                              type="text"
                              placeholder="Nhập trình độ học vấn"
                              name="eduLevel"
                              value={account.eduLevel || ""}
                              onChange={handleChange}
                            />
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}
                  {account.role == "manager" ? (
                    <>
                      <p style={{ marginBottom: "5px", fontWeight: "550", color: "#0d47a1" }}>Chi đoàn quản lý</p>
                      <div style={{ 
                        border: "2px solid #0d47a1",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBottom: "20px",
                        height: "30px",
                      }}>
                        <select
                          name="chapterId"
                          style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            color: "#0d47a1",
                          }}
                          value={account.managerOf || ""}
                          onChange={handleChange}
                        >
                          <option value="">Chọn chi đoàn</option>
                          <RenderChapters />
                        </select>
                      </div>
                    </>
                  ) : null}

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
                      onClick={()=>handleRequest('active')}
                    >
                      <p style={{
                        fontSize: "large",
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                      }}>Duyệt</p>
                    </div>
                    <div
                      style={{
                        all: "unset",
                        padding: "10px 60px",
                        borderRadius: "10px",
                        backgroundColor: "#d50000",
                        cursor: "pointer",
                        width: "80px",
                      }}
                      onClick={()=>handleRequest('banned')}
                    >
                      <p style={{
                        fontSize: "large",
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                      }}>
                        Từ chối
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestAccountDetails;