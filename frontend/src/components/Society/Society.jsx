import React, { useState, useRef, useEffect, useState as useReactState } from 'react';
import styles from './Society.module.css';
import avatar from '../../assets/avatar.jpg';

const Society = ({ site }) => {
  const [showComments, setShowComments] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useReactState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(site.initialLikes || 0);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [comments, setComments] = useState([
    {
      author: 'Chi đoàn KP Đông B',
      text: 'Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa để gây rối trí...',
    },
    {
      author: 'Chi đoàn KP Đông A',
      text: 'Một đoạn văn bản dễ đọc sẽ giúp người đọc tập trung hơn vào nội dung chính.',
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const scrollRef = useRef(null);
  const menuRefs = useRef([]);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
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
      setComments(prev => prev.filter((_, i) => i !== index));
    }
    setActiveMenuIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeMenuIndex !== null &&
        menuRefs.current[activeMenuIndex] &&
        !menuRefs.current[activeMenuIndex].contains(event.target)
      ) {
        setActiveMenuIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenuIndex]);

  const handleSendComment = () => {
    if (newComment.trim() === '') return;

    const newEntry = {
      author: 'Bạn',
      text: newComment.trim(),
    };

    setComments(prev => [...prev, newEntry]);
    setNewComment('');
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

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.imageScrollWrapper}>
            {showScrollButtons && <button className={styles.scrollButton} onClick={scrollLeft}>←</button>}
            <div className={styles.images} ref={scrollRef}>
              {site.images.map((img, index) => (
                <img key={index} src={img} alt={site.name} className={styles.image} />
              ))}
            </div>
            {showScrollButtons && <button className={styles.scrollButton} onClick={scrollRight}>→</button>}
          </div>

          <p className={styles.description}>{site.description}</p>

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

        {showComments && (
          <div className={styles.rightColumn}>
            <div className={styles.commentSection}>
              {comments.map((comment, index) => (
                <div key={index} className={styles.commentBlock}>
                  <img src={avatar} alt="avatar" className={styles.commentAvatar} />
                  <div className={styles.commentBubble}>
                    <strong>{comment.author}</strong>
                    <p>{comment.text}</p>
                  </div>

                  <button
                    className={styles.commentOptionsButton}
                    onClick={() => setActiveMenuIndex(prev => (prev === index ? null : index))}
                  >
                    ⋯
                  </button>

                  {activeMenuIndex === index && (
                    <div
                      className={styles.optionsMenu}
                      ref={el => (menuRefs.current[index] = el)}
                    >
                      <button onClick={() => handleOptionClick('edit', index)}>Chỉnh sửa</button>
                      <button onClick={() => handleOptionClick('delete', index)}>Xoá</button>
                    </div>
                  )}
                </div>
              ))}

              <div className={styles.commentInputWrapper}>
                <input
                  type="text"
                  placeholder="Thêm bình luận của bạn"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className={styles.commentInput}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
                />
                <button className={styles.commentSend} onClick={handleSendComment}>➤</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Society;
