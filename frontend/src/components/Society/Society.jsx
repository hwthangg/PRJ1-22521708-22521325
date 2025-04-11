import React, { useState, useRef, useEffect, useState as useReactState } from 'react';
import styles from './Society.module.css';
import avatar from '../../assets/avatar.jpg'; 

const Society = ({ site }) => {
  const [showComments, setShowComments] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useReactState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(site.initialLikes || 0);
  const scrollRef = useRef(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      setShowScrollButtons(true);
    } else {
      setShowScrollButtons(false);
    }
  }, [site.images]);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleOptionClick = (option, index) => {
    if (option === 'edit') {
      alert(`Chỉnh sửa bình luận ${index + 1}`);
    } else if (option === 'delete') {
      alert(`Xoá bình luận ${index + 1}`);
    }
    setActiveMenuIndex(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <img src={avatar} alt="Avatar" className={styles.avatar} />
        <div className={styles.infoSection}>
          <span className={styles.authorName}>Chi đoàn KP Đông A</span>
          <span className={styles.date}>11/04/2025</span>
          <span className={styles.tag}>Giáo dục, Chính trị</span>
        </div>
      </div>

      <div className={styles.title}>{site.name}</div>

      {/* Nội dung */}
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          {/* Scroll ảnh */}
          <div className={styles.imageScrollWrapper}>
            {showScrollButtons && (
              <button className={styles.scrollButton} onClick={scrollLeft}>←</button>
            )}
            <div className={styles.images} ref={scrollRef}>
              {site.images.map((img, index) => (
                <img key={index} src={img} alt={site.name} className={styles.image} />
              ))}
            </div>
            {showScrollButtons && (
              <button className={styles.scrollButton} onClick={scrollRight}>→</button>
            )}
          </div>

          {/* Mô tả */}
          <p className={styles.description}>{site.description}</p>

          {/* Nút yêu thích và bình luận */}
          <div className={styles.buttonGroup}>
            <button
              className={styles.favoriteButton}
              style={{ color: liked ? 'red' : 'black' }}
              onClick={toggleLike}
            >
              {liked ? '❤️' : '🤍'} Yêu thích ({likeCount})
            </button>
            <button
              className={styles.commentToggleButton}
              onClick={() => setShowComments(!showComments)}
            >
              💬 Bình luận
            </button>
          </div>
        </div>

        {/* Bình luận */}
        {showComments && (
          <div className={styles.rightColumn}>
            <div className={styles.commentSection}>
              {[1, 2].map((_, index) => (
                <div key={index} className={styles.commentBlock}>
                  <img src={avatar} alt="avatar" className={styles.commentAvatar} />
                  <div className={styles.commentBubble}>
                    <strong>Chi đoàn KP Đông {index === 0 ? 'B' : 'A'}</strong>
                    <p>Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa để gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản.</p>
                  </div>

                  {/* Nút 3 chấm */}
                  <button
                    className={styles.commentOptionsButton}
                    onClick={() => setActiveMenuIndex(index)}
                  >
                    ⋯
                  </button>

                  {/* Menu tùy chọn */}
                  {activeMenuIndex === index && (
                    <div className={styles.optionsMenu}>
                      <button onClick={() => handleOptionClick('edit', index)}>Chỉnh sửa</button>
                      <button onClick={() => handleOptionClick('delete', index)}>Xoá</button>
                    </div>
                  )}
                </div>
              ))}

              {/* Nhập bình luận mới */}
              <div className={styles.commentInputWrapper}>
                <input type="text" placeholder="Thêm bình luận của bạn" className={styles.commentInput} />
                <button className={styles.commentSend}>➤</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Society;
