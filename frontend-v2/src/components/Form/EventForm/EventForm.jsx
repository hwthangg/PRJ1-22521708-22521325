import React, { useState, useEffect } from "react";
import styles from "./EventForm.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import TextInput from "../../Input/TextInput/TextInput";
import DateInput from "../../Input/DateInput/DateInput";
import Textarea from "../../Input/Textarea/Textarea";

export default function EventForm({ id, setOpen }) {
  const [name, setName] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [location, setLocation] = useState("");
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // chứa các file kèm preview URL

  // Hàm xử lý input
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "startedAt":
        setStartedAt(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "requirement":
        setRequirement(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  // Hàm xử lý khi chọn ảnh
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files).map((file) => {
      file.preview = URL.createObjectURL(file); // tạo URL tạm
      return file;
    });
    setImages(files);
  };

  // Cleanup preview URLs khi component unmount
  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <div className={styles.section}><TextInput
            width={65}
            label="Tên sự kiện"
            name="name"
            placeholder="Nhập tên sự kiện..."
            value={name}
            onChangeValue={handleChange}
          />
          <DateInput
            label="Ngày diễn ra"
            name="startedAt"
            value={startedAt}
            onChangeValue={handleChange}
          />
          <TextInput
            width={65}
            label="Địa điểm"
            name="location"
            placeholder="Nhập địa điểm..."
            value={location}
            onChangeValue={handleChange}
          />
          <Textarea
            label="Yêu cầu"
            name="requirement"
            placeholder="Nhập yêu cầu"
            value={requirement}
            onChangeValue={handleChange}
          />
          <Textarea
            label="Mô tả"
            name="description"
            placeholder="Nhập mô tả"
            value={description}
            onChangeValue={handleChange}
          /></div>
          

          {/* Upload hình ảnh */}
          <div className={styles.imageUpload}>
            <p className={styles.imageLabel}>Hình ảnh</p>
            <label htmlFor="images">
              <MdAddPhotoAlternate size={30} color="#3d85c6" />
            </label>
            <input
              type="file"
              accept="image/*"
              id="images"
              name="images"
              multiple
              onChange={handleImagesChange}
              style={{ display: "none" }}
            />
            <div
              style={{
                display: "flex",
                gap: "10px",
                height: "260px",
                width: "900px",
                overflowX: "auto",
                padding: "10px",
                marginBottom: "12px",
              }}
            >
              {images.map((item, index) => (
                <img
                  key={index}
                  src={item.preview}
                  alt={`image-${index}`}
                  style={{
                
                    borderRadius: "10px",
                    boxShadow: "0 0 3px black",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <button className={styles.closeBtn} onClick={() => setOpen(false)}>
          <IoIosCloseCircle size={40} color="red" />
        </button>
      </div>
    </div>
  );
}
