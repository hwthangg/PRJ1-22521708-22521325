import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import avatar from "../../../../assets/avatar.png";
import { MdAddPhotoAlternate } from "react-icons/md";
import EventRegistration from "../../../../components/EventRegistration/EventRegistration";

function EventDetails() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [toggleGeneral, setToggleGeneral] = useState(true);
  const [status, setStatus] = useState("");
  const [toggleEvents, setToggleEvents] = useState(false);
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const urlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();

    return new File([blob], filename, { type: blob.type });
  };

  const handleStatus = async (status) => {
    try {
      setStatus(status);
      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      });
    } catch (error) {}
  };

  const convertOldImagesToFiles = async (urls) => {
    const filePromises = urls.map((url, index) =>
      urlToFile(url, `oldImage_${index}.jpg`)
    );
    return await Promise.all(filePromises);
  };

  const handleUpdating = async () => {
    try {
      const formDataToSend = new FormData();

      // Các trường văn bản
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "images") {
          formDataToSend.append(key, value);
        }
      });

      // Phân loại ảnh cũ (URL) và ảnh mới (File)
      const oldImages = formData.images.filter(
        (img) => typeof img === "string"
      );
      const newImages = formData.images.filter(
        (img) => typeof img !== "string"
      );

      // Chuyển ảnh cũ thành file
      const oldImageFiles = await convertOldImagesToFiles(oldImages);

      // Gộp tất cả ảnh
      const allImages = [...oldImageFiles, ...newImages];
      allImages.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "PUT",
        body: formDataToSend,
        credentials: "include",
      });

      const data = await res.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    files.forEach((file) => {
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        newImages.push(imageUrl);
      }
    });

    const combinedImages = [...data.images, ...newImages];

    // Cập nhật state để lưu cả ảnh cũ và mới
    setImages(combinedImages); // nếu bạn dùng cho hiển thị
    setData((prev) => ({ ...prev, images: combinedImages }));
    setFormData((prev) => ({ ...prev, images: combinedImages }));
  };

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
      setFormData((prev) => ({ ...prev, [name]: value }));
    } catch (error) {}
  };
  useEffect(() => {
    console.log(data, formData);
  }, [data, formData]);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events/${eventId}`);
        const data = await res.json();
        console.log(data);
        data.data.startedAt = data.data.startedAt.slice(0, 10);
        setData(data.data);
        setStatus(data.data.status);
        setImages(data.data.images);
      } catch (error) {}
    };
    fetchEvent();
    console.log(eventId);
  }, [status, formData]);
  return (
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
          paddingLeft: "20px",
        }}
        onClick={() => navigate("/manager/events")}
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
          flex: 1,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Thông tin chung */}
        <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
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
            <p
              style={{ fontSize: "22px", fontWeight: "bold", color: "#0d47a1" }}
            >
              Thông tin chung
            </p>
            {toggleGeneral ? (
              <FaChevronUp size={25} color="#0d47a1" />
            ) : (
              <FaChevronDown size={25} color="#0d47a1" />
            )}

            <p
              style={{
                border: "1px solid",
                padding: "10px 15px",
                borderRadius: "6px",
                fontWeight: "bold",
                color:
                  status === "completed"
                    ? "#0d6efd"
                    : status === "active"
                    ? "#198754"
                    : status === "pending"
                    ? "#ffc107"
                    : status === "canceled"
                    ? "#dc3545"
                    : "#000",
                backgroundColor:
                  status === "completed"
                    ? "#e7f1ff"
                    : status === "active"
                    ? "#e6f4ea"
                    : status === "pending"
                    ? "#fff9e6"
                    : status === "canceled"
                    ? "#f8d7da"
                    : "#f8f9fa",
                borderColor:
                  status === "completed"
                    ? "#0d6efd"
                    : status === "active"
                    ? "#198754"
                    : status === "pending"
                    ? "#ffc107"
                    : status === "canceled"
                    ? "#dc3545"
                    : "#ced4da",
              }}
            >
              {status === "completed"
                ? "Đã kết thúc"
                : status === "active"
                ? "Đang diễn ra"
                : status === "pending"
                ? "Sắp diễn ra"
                : status === "canceled"
                ? "Đã hủy"
                : "Không xác định"}
            </p>
          </div>
      
            {toggleGeneral && (
            <div
              style={{ display: "flex", gap: "20px", flexDirection: "column" , flex:1}}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "30px" }}
              >
                {" "}
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
                    Tên sự kiện
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
                      value={data.name || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "large",
                      color: "#0d47a1",
                      fontWeight: "bold",
                    }}
                  >
                    Ngày diễn ra
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
                      name="startedAt"
                      style={{
                        border: "none",
                        outline: "none",
                        caretColor: "black",
                        width: "100%",
                        color: "#0d47a1",
                      }}
                      value={data.startedAt || "2000-01-01"}
                      onChange={handleChange}
                    />
                  </div>
                </div>{" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "large",
                      color: "#0d47a1",
                      fontWeight: "bold",
                    }}
                  >
                    Quy mô
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
                    <select
                      name="scope"
                      style={{
                        border: "none",
                        outline: "none",
                        caretColor: "black",
                        width: "100%",
                        color: "#0d47a1",
                      }}
                      value={data.scope || ""}
                      onChange={handleChange}
                    >
                      <option value={"public"}>Cộng đồng</option>
                      <option value={"chapter"}>Chi đoàn</option>
                    </select>
                  </div>
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
                  Địa điểm
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
                    value={data.location || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "30px" }}
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
                    Yêu cầu
                  </p>
                  <div
                    style={{
                      border: "2px solid #0d47a1",
                      borderRadius: "10px",
                      padding: "10px",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <textarea
                      name="requirement"
                      rows={10}
                      style={{
                        resize: "none",

                        border: "none",
                        outline: "none",
                        caretColor: "black",
                        width: "100%",
                        color: "#0d47a1",
                      }}
                      value={data.requirement || ""}
                      onChange={handleChange}
                    ></textarea>
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
                    Mô tả
                  </p>
                  <div
                    style={{
                      border: "2px solid #0d47a1",
                      borderRadius: "10px",
                      padding: "10px",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <textarea
                      rows={10}
                      style={{
                        resize: "none",

                        border: "none",
                        outline: "none",
                        caretColor: "black",
                        width: "100%",
                        color: "#0d47a1",
                      }}
                      value={data.description || ""}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: "20px",
                  }}
                >
                  {" "}
                  <p
                    style={{
                      fontSize: "large",
                      color: "#0d47a1",
                      fontWeight: "bold",
                    }}
                  >
                    Hình ảnh
                  </p>
                  <label htmlFor="images">
                    {" "}
                    <MdAddPhotoAlternate size={30} color="#3d85c6" />
                  </label>
                  <input
                    style={{
                      all: "unset",
                      display: "none",
                    }}
                    type="file"
                    accept="image/*"
                    id="images"
                    name="images"
                    multiple
                    onChange={handleImagesChange}
                  />
                </div>
          
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    height: "260px",
                    width: "900px",

                    overflow: "auto",
                    padding: "10px",
                    marginBottom: "12px",
                  }}
                >
                  {images.map((item, index) => (
                    <img
                      key={index}
                      src={item || ""}
                      alt={`image-${index}`}
                      style={{
                        objectFit: "contain",
                        borderRadius: "10px",
                        boxShadow: "0 0 3px black",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "30px",
                  justifyContent: "center",
                  alignItems: "center",
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
                  onClick={() => handleUpdating()}
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
                {data.status == "pending" ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "30px",
                      }}
                    >
                      <div
                        style={{
                          all: "unset",
                          padding: "10px 60px",
                          borderRadius: "10px",
                          backgroundColor: "#388e3c",
                          cursor: "pointer",
                          width: "80px",
                        }}
                        onClick={() => {
                          handleStatus("active");
                        }}
                      >
                        <p
                          style={{
                            fontSize: "large",
                            fontWeight: "bold",
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          Bắt đầu
                        </p>
                      </div>
                      <div
                        style={{
                          all: "unset",
                          padding: "10px 60px",
                          borderRadius: "10px",
                          backgroundColor: "#b71c1c",
                          cursor: "pointer",
                          width: "80px",
                        }}
                        onClick={() => {
                          handleStatus("canceled");
                        }}
                      >
                        <p
                          style={{
                            fontSize: "large",
                            fontWeight: "bold",
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          Hủy bỏ
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}{" "}
                {data.status == "active" ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "30px",
                      }}
                    >
                      <div
                        style={{
                          all: "unset",
                          padding: "10px 60px",
                          borderRadius: "10px",
                          backgroundColor: "#388e3c",
                          cursor: "pointer",
                          width: "80px",
                        }}
                        onClick={() => {
                          handleStatus("completed");
                        }}
                      >
                        <p
                          style={{
                            fontSize: "large",
                            fontWeight: "bold",
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          Kết thúc
                        </p>
                      </div>
                      <div
                        style={{
                          all: "unset",
                          padding: "10px 60px",
                          borderRadius: "10px",
                          backgroundColor: "#b71c1c",
                          cursor: "pointer",
                          width: "80px",
                        }}
                        onClick={() => {
                          handleStatus("canceled");
                        }}
                      >
                        <p
                          style={{
                            fontSize: "large",
                            fontWeight: "bold",
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          Hủy bỏ
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
     
        </div>

        {/* Danh sách sự kiện */}
        <div>
          <div
            onClick={() => setToggleEvents((prev) => !prev)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              cursor: "pointer",
            }}
          >
            <p
              style={{ fontSize: "22px", fontWeight: "bold", color: "#0d47a1" }}
            >
              Danh sách người tham gia
            </p>
            {toggleEvents ? (
              <FaChevronUp size={25} color="#0d47a1" />
            ) : (
              <FaChevronDown size={25} color="#0d47a1" />
            )}
          </div>
          {toggleEvents && (
            <div>
              <EventRegistration eventId={eventId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
