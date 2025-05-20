import React from 'react';
import styles from './Search.module.css';
import searchIcon from '../../assets/searchicon.png';

const Search = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.searchBox}>
      <img src={searchIcon} alt="Search" className={styles.icon} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
