import React, { useState } from "react";
import styles from "./AddEvent.module.css";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { validateEventForm } from "../../../utils/validate";

export default function AddEvent({ open }) {
  const defaultTags = [
    "Tình nguyện",
    "Hội thảo",
    "Văn nghệ",
    "Thể thao",
    "Đào tạo",
  ];

  const [data, setData] = useState({
    name: "",
    startedAt: "",
    location: "",
    description: "",
    tags: [],
    scope: "public",
    images: [],
  });
  const [newTag, setNewTag] = useState(""); // input tag mới
  const handleAddTag = () => {
    const tag = newTag.trim();
    if (!tag) return;

  
    if (!data.tags.includes(tag)) {
      setData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setNewTag(""); // clear input
  };
  const handleRemoveTag = (tagToRemove) => {
    setData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const [images, setImages] = useState([]);
  const [adding, setAdding] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    console.log(previews);
    setData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setImages((prev) => [...prev, ...previews]); // <-- sửa ở đây
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAdd = async () => {
    if (!data.name || !data.startedAt || !data.location || !data.tags.length) {
      toast.error("Vui lòng điền đầy đủ thông tin sự kiện.");
      return;
    }

    const validate = validateEventForm(data)
    if(validate){
       toast.error(validate);
      return;
    }

    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("startedAt", data.startedAt);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("scope", data.scope);
      data.tags.forEach((tag) => formData.append("tags", tag));
      data.images.forEach((img) => formData.append("images", img));

      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/events`,
        {
          method: "POST",
          body: formData,
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      const result = await res.json();
      if (result.success) {
        toast.success("Thêm sự kiện thành công.");
        setData({
          name: "",
          startedAt: "",
          location: "",
          description: "",
          tags: [],
          scope: "public",
          images: [],
        });
        setImages([]);
      } else {
        toast.error(result.message || "Thêm sự kiện thất bại.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thêm sự kiện.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <button className={styles.closeButton} onClick={() => open(false)}>
          <IoCloseCircle size={40} color="red" />
        </button>

        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Tên sự kiện</label>
            <input
              id="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Nhập tên sự kiện"
            />
          </div>

          <div className={styles.inputContainer} style={{ flex: 3 }}>
            <label htmlFor="location">Địa điểm</label>
            <input
              id="location"
              value={data.location}
              onChange={handleChange}
              placeholder="Nhập địa điểm"
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputContainer} style={{ flex: 1 }}>
              <label htmlFor="scope">Phạm vi</label>
              <div className={styles.inputSelect}>
                <select id="scope" value={data.scope} onChange={handleChange}>
                  <option value="public">Công khai</option>
                  <option value="chapter">Nội bộ</option>
                </select>
              </div>
            </div>

            <div className={styles.inputContainer} style={{ flex: 1 }}>
              <label htmlFor="startedAt">Thời gian bắt đầu</label>
              <input
                id="startedAt"
                type="datetime-local"
                value={data.startedAt}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              rows={7}
              value={data.description}
              onChange={handleChange}
              placeholder="Nhập mô tả sự kiện"
              style={{
                resize: "none",
                outline:'none',
                caretColor:'black',
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid var(--normal-blue)",
                color: "var(--normal-blue)",
              }}
            ></textarea>
          </div>

          <div className={styles.inputContainer}>
            <label>Hashtag sự kiện</label>
            <div
              className={styles.tagInputWrapper}
              style={{width:400, alignItems: "center" }}
            >
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Nhập hashtag, ví dụ: #muahe"
              
              />
              <button
                type="button"
                onClick={handleAddTag}
                style={{
                  all: "unset",
                  backgroundColor: "var(--normal-blue)",
                  color: "white",
                  fontWeight: "bold",
                  padding: "8px 24px",
                  borderRadius: 10,
                  height: 20,
                }}
              >
                Thêm
              </button>
            </div>
            <div className={styles.tagList}>
              {data.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                  <button
                    type="button"
                    className={styles.removeTagButton}
                    onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="images">Hình ảnh</label>
            <label htmlFor="imagesUpload" className={styles.uploadLabel}>
              + Thêm ảnh
            </label>
            <div className={styles.imagesContainer} style={{display:images.length ? 'flex':'none'}}>
              {images.map((img, index) => (
                <div key={index} className={styles.imageItem}>
                  <img src={img} alt={`upload-${index}`} />
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <input
              id="imagesUpload"
              type="file"
              multiple
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button onClick={handleAdd} disabled={adding}>
              {adding ? <ClipLoader size={20} color="#fff" /> : "Thêm sự kiện"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
