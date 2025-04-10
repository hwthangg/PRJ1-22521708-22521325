import React, { useState, useRef, useEffect, useState as useReactState } from 'react';
import styles from './Society.module.css';

const vnFlag = '/images/vn.jpg';

const Society = ({ site }) => {
    const [showComments, setShowComments] = useState(false);
    const [showScrollButtons, setShowScrollButtons] = useReactState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(site.initialLikes || 0);
    const scrollRef = useRef(null);
  
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
  
    return (
      <div className={styles.container}>
        <div className={styles.titleBar}>
          <h2 className={styles.title}>{site.name}</h2>
          <button className={styles.routeButtonLarge}>Chỉ đường</button>
        </div>
  
        <div className={styles.countryTag}>
          <img src={vnFlag} alt="Vietnam Flag" className={styles.flagIconCircle} />
          <span>Quốc gia</span>
        </div>
  
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
              <button className={styles.commentToggleButton} onClick={() => setShowComments(!showComments)}>
                💬 Bình luận
              </button>
            </div>
          </div>
  
          {showComments && (
            <div className={styles.rightColumn}>
              <div className={styles.commentSection}>
                <div className={styles.comment}><strong>Chi đoàn KP Đông A</strong><p>Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa đã gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản.</p></div>
                <div className={styles.comment}><strong>Anh Linh -</strong><p>Chúng ta vẫn biết rằng, làm việc với một đoạn văn bản dễ đọc và rõ nghĩa đã gây rối trí và cản trở việc tập trung vào yếu tố trình bày văn bản.</p></div>
                <div className={styles.commentInput}>
                  <input type="text" placeholder="Thêm bình luận của bạn" />
                  <button>➤</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Society;
  