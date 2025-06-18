import React, { useEffect, useState } from "react";
import styles from "./EventDetails.module.css";
import { IoCloseCircle } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Accounts from "../../pages/Main/Admin/Accounts/Accounts";
import AttendeeItem from "../AttendeeItem/AttendeeItem";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import avatar from '../../assets/avatar.png'

export default function EventDetails({ id, open }) {
  const [data, setData] = useState({});
  const [update, setUpdate] = useState({});
  const [images, setImages] = useState([]);
  const [cloudImgs, setCloudImgs] = useState([]);
  const [fileImgs, setFileImgs] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [toggleAttendee, setToggleAttendee] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
    const [user, setUser] = useState({})
    const [flag, setFlag] = useState(false)
  const handleComment = async () => {
    try {
      console.log("Gửi bình luận");
      if (!comment.trim()) return;
      // TODO: Gửi bình luận lên server tại đây
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/comments?status=active`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId: id, text: comment }),
        }
      );
      setComment("");
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/events/${id}`
        );
        const result = await res.json();
        const event = result.data;
        setData(event);
        setCloudImgs(event.images.map((img) => img.filename));
        setImages(event.images.map((img) => img.path));
        setTags(event.tags);
      } catch (error) {
        console.error(error);
      }
    };
     const fetchProfile = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/auth`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          setUser(data.data);
        } catch (error) {
          console.log(error);
          toast.error("Có lỗi xảy ra khi lấy hồ sơ");
        }
      };
  
      fetchProfile();
    const fetchRegistrations = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_APP_SERVER_URL
          }/api/event-registrations?eventId=${id}`
        );
        const result = await res.json();
        console.log(result);
        setRegistrations(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/comments?eventId=${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);

        setComments(
          data.data.map((item) => ({
            id: item._id,
            accountId: {
              fullname: item?.accountId?.fullname,
              avatar: item?.accountId?.avatar?.path,
            },
            comment: item.text,
            status: item.status
          }))
        );
      } catch (error) {
        console.error("Lỗi khi lấy lượt thích:", error);
      }
    };
    fetchComments();
    fetchEvent();
    fetchRegistrations();
  }, [id, comment, flag]);

const hideComment = async(id)=>{
  try {
    await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/comments/${id}`,{
      method:'PATCH'
    })

    setFlag(prev  => !prev)
  } catch (error) {
    console.log(error)
  }
}
  const handleChange = (e) => {
    const { id, name, value } = e.target;
    setData((prev) => ({ ...prev, [id || name]: value }));
    setUpdate((prev) => ({ ...prev, [id || name]: value }));
  };

  const handleAddTag = () => {
    const tag = newTag.trim();
    if (!tag || tags.includes(tag)) {
      toast.error("Hashtag không hợp lệ hoặc đã tồn tại");
      return;
    }
    setTags((prev) => [...prev, tag]);
    setNewTag("");
  };

  const handleRemoveTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleAddFileImg = (e) => {
    const files = Array.from(e.target.files);
    setFileImgs((prev) => [...prev, ...files]);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileURLs]);
  };

  const handleRemoveImage = (img) => {
    setImages((prev) => prev.filter((i) => i !== img));
    setCloudImgs((prev) => prev.filter((f) => !img.includes(f)));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (const key in update) {
        if (update[key]) {
          const value =
            key === "startedAt"
              ? new Date(update[key]).toISOString()
              : update[key];
          formData.append(key, value);
        }
      }
      tags.forEach((tag) => formData.append("tags[]", tag));
      cloudImgs.forEach((img) => formData.append("cloudImgs[]", img));
      fileImgs.forEach((file) => formData.append("images", file));

      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/events/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await res.json();
      if (res.ok) {
        toast.success("Cập nhật sự kiện thành công");
        open(false);
      } else {
        toast.error(result.message || "Lỗi cập nhật");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật sự kiện");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "canceled":
        return "red";
      case "happening":
        return "#ff8f00";
      case "pending":
        return "#0072ff";
      default:
        return "#555";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <button className={styles.closeButton} onClick={() => open(false)}>
          <IoCloseCircle size={40} color="red" />
        </button>

        <div className={styles.form}>
          {/* Tên + Trạng thái */}
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer} style={{ flex: 5 }}>
              <label htmlFor="name">Tên sự kiện</label>
              <input
                id="name"
                name="name"
                placeholder="Nhập tên sự kiện"
                value={data.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputContainer} style={{ flex: 1 }}>
              <label htmlFor="status">Trạng thái</label>
              <select
                id="status"
                value={data.status || "pending"}
                onChange={handleChange}
                className={styles.inputSelect}
                style={{
                  color: getStatusColor(data.status),
                  fontWeight: "bold",
                }}
              >
                <option value="completed">Hoàn thành</option>
                <option value="canceled">Hủy</option>
                <option value="happening">Đang diễn ra</option>
                <option value="pending">Sắp diễn ra</option>
              </select>
            </div>
          </div>

          {/* Địa điểm */}
          <div className={styles.inputContainer}>
            <label htmlFor="location">Địa điểm</label>
            <input
              id="location"
              name="location"
              placeholder="Nhập địa điểm"
              value={data.location || ""}
              onChange={handleChange}
            />
          </div>

          {/* Phạm vi + Thời gian */}
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <label htmlFor="scope">Phạm vi</label>
              <select
                id="scope"
                name="scope"
                value={data.scope || ""}
                onChange={handleChange}
                className={styles.inputSelect}
              >
                <option value="public">Công khai</option>
                <option value="chapter">Nội bộ</option>
              </select>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="startedAt">Thời gian bắt đầu</label>
              <input
                id="startedAt"
                name="startedAt"
                type="datetime-local"
                value={
                  data.startedAt
                    ? new Date(
                        new Date(data.startedAt).getTime() -
                          new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .slice(0, 16)
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Mô tả */}
          <div className={styles.inputContainer}>
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Nhập mô tả sự kiện"
              value={data.description || ""}
              onChange={handleChange}
              style={{
                resize: "none",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid var(--normal-blue)",
                color: "var(--normal-blue)",
              }}
            />
          </div>

          {/* Hashtag */}
          <div className={styles.inputContainer}>
            <label>Hashtag sự kiện</label>
            <div className={styles.tagInputWrapper}>
              <input
                type="text"
                name="newTag"
                placeholder="Nhập hashtag, ví dụ: #muahe"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className={styles.addTagButton}
              >
                Thêm
              </button>
            </div>
            <div className={styles.tagList}>
              {tags.map((tag, index) => (
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

          {/* Hình ảnh */}
          <div className={styles.inputContainer}>
            <label htmlFor="images">Hình ảnh</label>
            <label htmlFor="imagesUpload" className={styles.uploadLabel}>
              + Thêm ảnh
            </label>
            <input
              id="imagesUpload"
              name="images"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleAddFileImg}
            />
            <div className={styles.imagesContainer}>
              {images.map((img, index) => (
                <div key={index} className={styles.imageItem}>
                  <img src={img} alt={`upload-${index}`} />
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemoveImage(img)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cập nhật */}
          <div className={styles.buttonContainer}>
            <button onClick={handleUpdate} disabled={loading}>
              {loading ? <ClipLoader size={20} color="#fff" /> : "Cập nhật"}
            </button>
          </div>
          <div className={styles.registrations}>
            <div
              style={{ display: "flex", gap: 20 }}
              onClick={() => setToggleAttendee((prev) => !prev)}
            >
              {" "}
              <p
                style={{
                  fontSize: "larger",
                  color: "var(--normal-blue)",
                  fontWeight: "bold",
                }}
              >
                Danh sách người tham gia
              </p>
              {toggleAttendee ? (
                <>
                  <FaChevronCircleUp size={24} color="blue" />
                </>
              ) : (
                <>
                  {" "}
                  <FaChevronCircleDown size={24} color="blue" />
                </>
              )}
            </div>
            {toggleAttendee ? (
              <>
                {" "}
                <div className={styles.toolBar}>
                  <div className={styles.inputContainer} style={{ flex: 2 }}>
                    <label htmlFor="search">Tìm kiếm</label>
                    <input
                      type="search"
                      id="search"
                      placeholder="Tìm kiếm theo họ tên, email"
                    />
                  </div>

                  <div className={styles.inputContainer} style={{ flex: 1 }}>
                    <label htmlFor="status">Trạng thái</label>
                    <div className={styles.inputSelect}>
                      <select id="status">
                        <option value="">Tất cả</option>
                        <option value="registered">Chưa có mặt</option>
                        <option value="attended">Đã có mặt</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={styles.listRegistrations}>
                  {registrations.map((item) => (
                    <AttendeeItem item={item} />
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className={styles.comments}>
            <div
              style={{ display: "flex", gap: 20 }}
              onClick={() => setToggleComment((prev) => !prev)}
            >
              {" "}
              <p
                style={{
                  fontSize: "larger",
                  color: "var(--normal-blue)",
                  fontWeight: "bold",
                }}
              >
                Bình luận
              </p>
              {toggleComment ? (
                <>
                  <FaChevronCircleUp size={24} color="blue" />
                </>
              ) : (
                <>
                  {" "}
                  <FaChevronCircleDown size={24} color="blue" />
                </>
              )}
            </div>
            {toggleComment && (
              <div className={styles.commentSection}>
                <div></div>
                <div
                  className={styles.inputContainer}
                  style={{ marginBottom: 10, flexDirection:'row' }}
                >
                  <input
                    type="text"
                    placeholder="Viết bình luận..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={styles.input}
                  />
                  <button onClick={handleComment} className={styles.sendBtn}>
                    Gửi
                  </button>
                </div>
                <div className={styles.commentList}>
                  {comments.map((item, idx) => (
                    <div key={idx} className={styles.commentItem}>
                      <div className={styles.commentContent}>
                        <img
                          src={item.accountId.avatar || avatar}
                          alt="avatar"
                          className={styles.commentAvatar}
                        />
                        <div className={styles.commentBox}>
                          <div className={styles.commentName}>
                            {item.accountId.fullname}
                          </div>
                          <p className={styles.commentText}>{item.comment}</p>
                        </div>
                      </div>
                      {}
                      <button onClick={()=>hideComment(item.id)}>{item.status == 'active' ? 'Ẩn' :'Đã ẩn'}</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
