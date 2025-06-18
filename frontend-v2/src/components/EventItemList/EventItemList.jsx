import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import avatar from "../../assets/avatar.png";
import { formatVietnamTime } from "../../../utils";
import styles from "./EventItemList.module.css";

const EventItemList = ({ event }) => {
  const [like, setLike] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState({});

  // Xử lý yêu thích
  const handleLike = async (eventId) => {
    try {
      console.log("Yêu thích");
      setLike((prev) => !prev);
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/favorites`,
        {
          method: "POST",
          body: JSON.stringify({ eventId: eventId }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Lỗi khi yêu thích:", error);
    }
  };

  // Xử lý mở/đóng bình luận
  const handleToggleComment = () => {
    try {
      console.log("Mở/Đóng bình luận");
      setOpenComment((prev) => !prev);
    } catch (error) {
      console.error("Lỗi khi mở/đóng bình luận:", error);
    }
  };

  // Xử lý gửi bình luận
  const handleComment = async () => {
    try {
      console.log("Gửi bình luận");
      if (!comment.trim()) return;
      // TODO: Gửi bình luận lên server tại đây
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId: event._id, text: comment }),
        }
      );
      const newComment = {
        accountId: {
          fullname: user.fullname,
          avatar: user.avatar.path,
        },
        comment: comment.trim(),
      };
      setComments((prev) => [newComment, ...prev]);
      setComment("");
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  // Xử lý đăng ký (nếu có)
  const handleRegister = async () => {
    try {
      console.log("Đăng ký sự kiện");
      // TODO: Gửi yêu cầu đăng ký sự kiện
      const res = await fetch(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/event-registrations`,
        {
          method: "POST",
          body: JSON.stringify({ eventId: event._id }),
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    }
  };
  useEffect(() => {
    const fetchIsLiked = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/favorites?eventId=${
            event._id
          }`,
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
        setLike(data.data.liked);
      } catch (error) {
        console.error("Lỗi khi lấy lượt thích:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/comments?eventId=${
            event._id
          }&&status=active`,
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
            accountId: {
              fullname: item.accountId.fullname,
              avatar: item.accountId.avatar.path,
            },
            comment: item.text,
          }))
        );
      } catch (error) {
        console.error("Lỗi khi lấy lượt thích:", error);
      }
    };
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_SERVER_URL}/api/auth`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setUser(data.data);
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra khi lấy hồ sơ");
      }
    };

    fetchProfile();

    fetchIsLiked();
    fetchComments();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          <div>
            <div className={styles.chapterName}>{event.chapterId.name}</div>
          </div>
        </div>
        {event.status === "pending" && (
          <div className={styles.register} onClick={handleRegister}>
            Đăng ký
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.title}>
          <p>{event.name}</p>
          <p>{formatVietnamTime(event.startedAt)}</p>
        </div>

        <p className={styles.description}>{event.description}</p>
      </div>

      <div className={styles.tags}>
        {event.tags.map((item, index) => (
          <div key={index} className={styles.tag}>
            {item}
          </div>
        ))}
      </div>

      {event.images.length > 0 && (
        <div className={styles.imageContainer}>
          {event.images.map((item, index) => (
            <img
              key={index}
              src={item.path}
              alt={`image-${index}`}
              className={styles.image}
            />
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          onClick={() => handleLike(event._id)}
        >
          {like ? (
            <FaHeart size={20} color="red" />
          ) : (
            <FaRegHeart size={20} color="#073763" />
          )}
          <p>Yêu thích</p>
        </button>

        <button className={styles.actionBtn} onClick={handleToggleComment}>
          <MdComment size={20} color="#073763" />
          <p>Bình luận</p>
        </button>
      </div>

      {openComment && (
        <div className={styles.commentSection}>
          <div className={styles.inputContainer} style={{ marginBottom: 10 }}>
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventItemList;
