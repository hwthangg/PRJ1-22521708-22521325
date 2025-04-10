import React from 'react';
import styles from './Search.module.css';
import searchIcon from '../../assets/searchicon.png'; 

const Search = () => {
  return (
    <div className={styles.searchBox}>
      <img src={searchIcon} alt="Search" className={styles.icon} />
      <input
        type="text"
        placeholder="Bạn muốn tìm bài viết nào?"
        className={styles.input}
      />
    </div>
  );
};

export default Search;
