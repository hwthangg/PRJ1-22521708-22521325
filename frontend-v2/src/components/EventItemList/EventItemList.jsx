import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import avatar from "../../assets/avatar.png";

const EventItemList = ({ event, formatVietnameseDate }) => {
  const [like, setLike] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const handleLike = async () => {
    try {
      setLike((prev) => !prev);
    } catch (error) {}
  };
  const handleComment = async () => {
    try {
      console.log(comment);
      const res = await fetch(
        `http://localhost:5000/api/events/${event._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // nếu server cần cookie/session
          body: JSON.stringify({
            comment: comment, // comment là biến chứa nội dung bình luận của bạn
          }),
        }
      );
      setComment("");
    } catch (error) {}
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/events/${event._id}/comments?page=1&limit=100&status=all&sortBy=createdAt&sortOrder=asc`
        );
        const data = await res.json();
        console.log(data);
        setComments(data.data.comments);
      } catch (error) {}
    };

    fetchComments();
  }, [comment]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);
  return (
    <div
      style={{
        boxShadow: "0 0 5px black",
        width: "800px",
        padding: "30px",
        borderRadius: "8px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={avatar}
            alt="avatar"
            style={{
              borderRadius: "50%",
              marginRight: "8px",
              width: "40px",
              aspectRatio: "1/1",
            }}
          />
          <div>
            <div style={{ fontWeight: "bold" }}>{event.chapterId.name}</div>
          </div>
        </div>
        
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "#3d85c6",
            color: "white",
            padding: "10px 20px",
            fontWeight: "bold",
            display: event.status == 'pending'?'block':'none'
          }}
        >
          Đăng ký
        </div>
      </div>

      {/* Content */}
      <div style={{ marginBottom: "12px" }}>
        <p>Diễn ra vào {formatVietnameseDate(event.startedAt)}</p>
        <p style={{ textAlign: "justify" }}>{event.description}</p>
      </div>

      {/* Images */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          height: "260px",
          overflow: "auto",
          padding: "10px",
          marginBottom: "12px",
        }}
      >
        {event.images.map((item, index) => (
          <img
            key={index}
            src={item}
            alt={`image-${index}`}
            style={{
              borderRadius: "10px",
              boxShadow: "0 0 3px black",
            }}
          />
        ))}
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #ccc",
          padding: "20px",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => handleLike(event._id)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {like ? (
            <FaHeart size={20} color="red" />
          ) : (
            <FaRegHeart size={20} color="#073763" />
          )}
          <p>Yêu thích</p>
        </button>

        <button
          onClick={() => setOpenComment((prev) => !prev)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <MdComment size={20} color="#073763" />
          <p>Bình luận</p>
        </button>

        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaShareAlt size={20} color="#073763" />
          <p>Chia sẻ</p>
        </button>
      </div>

      {/* Comment Section */}
      {openComment && (
        <div style={{ borderTop: "1px solid #ccc", paddingTop: "8px" }}>
          {/* Comment List */}
          <div style={{ marginBottom: "8px" }}>
            {comments.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "20px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "start",
                    gap: "10px",
                  }}
                >
                  <img
                    src={item.accountId.avatar || avatar}
                    alt="avatar"
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      aspectRatio: "1/1",
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "#e3f2fd",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {item.accountId.fullname}
                    </div>
                    <p style={{ textAlign: "justify" }}>{item.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Viết bình luận..."
              style={{
                flex: 1,
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                outline: "none",
                caretColor: "black",
              }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              style={{
                marginLeft: "8px",
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#007bff",
                color: "white",
              }}
              onClick={() => handleComment()}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventItemList;
