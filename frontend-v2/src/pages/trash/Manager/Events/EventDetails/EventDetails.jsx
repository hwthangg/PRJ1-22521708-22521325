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
     
      </div>
    </div>
  );
}

export default EventDetails;
