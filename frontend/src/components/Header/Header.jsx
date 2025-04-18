// import React, { useState } from 'react';
// import styles from './Header.module.css';
// import logodoan from '../../assets/logodoan.png';
// import bellIcon from '../../assets/bellicon.png';
// import notifyIcon from '../../assets/notifyicon.png';

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [hoveredMenu, setHoveredMenu] = useState(null);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(prev => !prev);
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.leftSection}>
//         <img src={logodoan} alt="Logo" className={styles.logo} />
//       </div>

//       <nav className={styles.nav}>
//         <a href="#">Trang chủ</a>

//         {/* Nghiệp vụ đoàn viên */}
//         <div
//           className={styles.navItemWithDropdown}
//           onMouseOver={() => setHoveredMenu('nghiepvu')}
//           onMouseOut={() => setHoveredMenu(null)}
//         >
//           <div className={styles.dropdownContainer}>
//             <a href="#">Nghiệp vụ đoàn viên ▾</a>
//             {hoveredMenu === 'nghiepvu' && (
//               <ul className={styles.dropdownMenuNav}>
//                 <li>Thêm đoàn viên</li>
//                 <li>Danh sách đoàn viên</li>
//                 <li>Quản lý đoàn phí</li>
//               </ul>
//             )}
//           </div>
//         </div>

//         {/* Tổ chức sự kiện */}
//         <div
//           className={styles.navItemWithDropdown}
//           onMouseOver={() => setHoveredMenu('sukien')}
//           onMouseOut={() => setHoveredMenu(null)}
//         >
//           <div className={styles.dropdownContainer}>
//             <a href="#">Tổ chức sự kiện ▾</a>
//             {hoveredMenu === 'sukien' && (
//               <ul className={styles.dropdownMenuNav}>
//                 <li>Thêm sự kiện</li>
//                 <li>Danh sách sự kiện</li>
//                 <li>Thống kê tham gia</li>
//               </ul>
//             )}
//           </div>
//         </div>

//         <a href="#">Tài liệu</a>
//       </nav>

//       <div className={styles.rightSection}>
//         <button className={styles.iconButton}>
//           <img src={bellIcon} alt="Thông báo" />
//         </button>
//         <button className={styles.iconButton}>
//           <img src={notifyIcon} alt="Tin nhắn" />
//         </button>
//         <div className={styles.dropdownWrapper}>
//           <div className={styles.dropdownText} onClick={toggleDropdown}>
//             Chi đoàn KP Đông B ▾
//           </div>
//           {isDropdownOpen && (
//             <ul className={styles.dropdownMenu}>
//               <li>Hồ sơ</li>
//               <li>Đăng xuất</li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import logodoan from '../../assets/logodoan.png';
import bellIcon from '../../assets/bellicon.png';
import notifyIcon from '../../assets/notifyicon.png';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);
  const accountRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(prev => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current && !navRef.current.contains(event.target) &&
        accountRef.current && !accountRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <img src={logodoan} alt="Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav} ref={navRef}>
        <a href="#">Trang chủ</a>

        <div className={styles.navItemWithDropdown}>
          <div className={styles.dropdownText} onClick={() => handleMenuClick('nghiepvu')}>
            Nghiệp vụ đoàn viên ▾
          </div>
          {activeMenu === 'nghiepvu' && (
            <ul className={styles.dropdownMenuNav}>
              <li>Thêm đoàn viên</li>
              <li>Danh sách đoàn viên</li>
              <li>Quản lý đoàn phí</li>
            </ul>
          )}
        </div>

        <div className={styles.navItemWithDropdown}>
          <div className={styles.dropdownText} onClick={() => handleMenuClick('sukien')}>
            Tổ chức sự kiện ▾
          </div>
          {activeMenu === 'sukien' && (
            <ul className={styles.dropdownMenuNav}>
              <li>Thêm sự kiện</li>
              <li>Danh sách sự kiện</li>
              <li>Thống kê tham gia</li>
            </ul>
          )}
        </div>

        <a href="#">Tài liệu</a>
      </nav>

      <div className={styles.rightSection}>
        <button className={styles.iconButton}>
          <img src={bellIcon} alt="Thông báo" />
        </button>
        <button className={styles.iconButton}>
          <img src={notifyIcon} alt="Tin nhắn" />
        </button>
        <div className={styles.dropdownWrapper} ref={accountRef}>
          <div className={styles.dropdownText} onClick={toggleDropdown}>
            Chi đoàn KP Đông B ▾
          </div>
          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li>Hồ sơ</li>
              <li>Đăng xuất</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
