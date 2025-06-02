import React, { useEffect, useState } from "react";
import avatar from "../../assets/avatar.png";
import {
  FaIdCard,
  FaBook,
  FaHouseUser,
  FaRegUser,
  FaUserFriends,
  FaUsers,
  FaUserTag,
} from "react-icons/fa";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { MdEmail, MdOutlineFamilyRestroom, MdPhone } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";

function AddAccount({ setOpen }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullname: "",
    birthday: "",
    gender: "",
    role: "",
    password: "",
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
  const [avatarFile, setAvatarFile] = useState();
  const [togglePassword, setTogglePassword] = useState(true);
  const [chapters, setChapters] = useState([]);

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

    fetchChapters();
  }, []);

  useEffect(() => {
    console.log("Chapters sau khi set:", chapters);
  }, [chapters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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
      setFormData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
      setAvatarFile(file);
    }
  };

  const handleCreateAccount = async () => {
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

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      console.log("Response:", data);
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1,
        display: "flex",
        backgroundColor: "rgba(70, 96, 170, 0.5)",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "90%",
          backgroundColor: "white",
          borderRadius: "20px",
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
            height: "600px",
            margin: "80px 10px 20px",
            padding: "5px 10px 20px",
          }}
        >
          <div style={{ boxSizing: "border-box", display: "flex", width: "100%" }}>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
              <form
                style={{
                  display: "flex",
                  padding: "0 10px",
                  borderRadius: "20px",
                  flexDirection: "column",
                  width: "100%",
                }}
                onSubmit={(e) => e.preventDefault()}
              >
                <div
                  style={{
                    border: "none",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    marginBottom: "20px",
                    height: "fit-content",
                    gap: "10px",
                  }}
                >
                  <img
                    style={{
                      width: "160px",
                      aspectRatio: "1 / 1",
                      borderRadius: "100px",
                    }}
                    src={formData.avatar || avatar}
                    alt="avatar"
                  />
                  <input
                    style={{ all: "unset", border: "1px solid", display: "none" }}
                    type="file"
                    accept="image/*"
                    id="avatar"
                    name="avatar"
                    onChange={handleAvatarChange}
                  />
                  <label
                    htmlFor="avatar"
                    style={{
                      border: "2px solid #0d47a1",
                      padding: "10px",
                      color: "#0d47a1",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Chọn ảnh đại diện
                  </label>
                </div>

                <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Email</p>
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
                  }}
                >
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
                    placeholder="Nhập email đăng nhập"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Số điện thoại</p>
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
                  }}
                >
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
                    placeholder="Nhập số điện thoại"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Họ và tên</p>
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
                  }}
                >
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
                    placeholder="Nhập họ và tên"
                    name="fullname"
                    value={formData.fullname}
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
                    <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Ngày sinh</p>
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
                        paddingLeft: 10,
                      }}
                    >
                      <input
                        style={{
                          all: "unset",
                          width: "100%",
                          caretColor: "black",
                          color: "#0d47a1",
                        }}
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Giới tính</p>
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
                      }}
                    >
                      <select
                        name="gender"
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          color: "#0d47a1",
                        }}
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Chọn giới tính
                        </option>
                        <option value="Nam" defaultChecked>
                          Nam
                        </option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </div>
                  </div>
                </div>

                <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Mật khẩu</p>
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
                  }}
                >
                  <LuLock size={30} color="#0d47a1" />
                  <input
                    style={{
                      all: "unset",
                      width: "100%",
                      marginLeft: "15px",
                      caretColor: "black",
                      color: "#0d47a1",
                    }}
                    placeholder="Nhập mật khẩu của bạn"
                    type={togglePassword ? "password" : "text"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => setTogglePassword((prev) => !prev)}
                  >
                    {togglePassword ? (
                      <LuEye size={25} color="#0d47a1" />
                    ) : (
                      <LuEyeOff size={25} color="#0d47a1" />
                    )}
                  </div>
                </div>

                <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Vai trò</p>
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
                  }}
                >
                  <select
                    name="role"
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      color: "#0d47a1",
                    }}
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      -- Chọn vai trò --
                    </option>
                    <option value="member">Đoàn viên</option>
                    <option value="manager">Người quản lý chi đoàn</option>
                    <option value="admin">Quản trị viên</option>
                  </select>
                </div>

                {formData.role == "member" && (
                  <>
                    <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Chi đoàn sinh hoạt</p>
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
                      }}
                    >
                      <select
                        name="chapterId"
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          color: "#0d47a1",
                        }}
                        value={formData.chapterId}
                        onChange={handleChange}
                      >
                        <option value="">Chọn chi đoàn</option>
                        <RenderChapters />
                      </select>
                    </div>

                    <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Số thẻ đoàn</p>
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
                      }}
                    >
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
                        value={formData.cardId}
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
                        <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Chức vụ</p>
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
                          }}
                        >
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
                            value={formData.position||''}
                            onChange={handleChange}
                          >
                            <option value="" disabled>Chọn chức vụ</option>
                            <option value="Đoàn viên">Đoàn viên</option>
                            <option value="Phó Bí thư">Phó Bí thư</option>
                            <option value="Bí thư">Bí thư</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ flex: 1 }}>
                        <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Ngày vào đoàn</p>
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
                            paddingLeft: 10,
                          }}
                        >
                          <input
                            style={{
                              all: "unset",
                              width: "100%",
                              caretColor: "black",
                              color: "#0d47a1",
                            }}
                            type="date"
                            name="joinedAt"
                            value={formData.joinedAt}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Địa chỉ</p>
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
                      }}
                    >
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
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>

                    <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Quê quán</p>
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
                      }}
                    >
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
                        value={formData.hometown}
                        onChange={handleChange}
                      />
                    </div>

                    <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Dân tộc</p>
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
                      }}
                    >
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
                        value={formData.ethnicity}
                        onChange={handleChange}
                      />
                    </div>

                    <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Tôn giáo</p>
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
                      }}
                    >
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
                        value={formData.religion}
                        onChange={handleChange}
                      />
                    </div>

                    <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Trình độ học vấn</p>
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
                      }}
                    >
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
                        value={formData.eduLevel}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {formData.role == "manager" && (
                  <>
                    <p style={{ marginBottom: "5px", fontWeight: 550, color: "#0d47a1" }}>Chi đoàn quản lý</p>
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
                      }}
                    >
                      <select
                        name="chapterId"
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          color: "#0d47a1",
                        }}
                        value={formData.chapterId}
                        onChange={handleChange}
                      >
                        <option value="">Chọn chi đoàn</option>
                        <RenderChapters />
                      </select>
                    </div>
                  </>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    flexDirection: "column",
                  }}
                >
                  <button
                    style={{
                      all: "unset",
                      padding: "10px 60px",
                      borderRadius: "10px",
                      backgroundColor: "#0d47a1",
                      cursor: "pointer",
                    }}
                    type="submit"
                    onClick={handleCreateAccount}
                  >
                    <p style={{ fontSize: "large", fontWeight: "bold", color: "white" }}>
                      Tạo tài khoản
                    </p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAccount;