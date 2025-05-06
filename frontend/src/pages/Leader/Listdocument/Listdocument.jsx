// import React, { useState } from 'react';
// import styles from './Listdocument.module.css';
// import Table from '../../../components/Table/Table';
// import Search from '../../../components/Search/Search';
// import Filter from '../../../components/Filter/Filter';
// import Add from '../../../components/Add/Add';
// import Delete from '../../../components/Delete/Delete';
// import Info_document from '../../../components/Info_document/Info_document'; // Import Info_document
// import Table_doc from '../../../components/Table_doc/Table_doc';

// const Listdocument = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [filterValue, setFilterValue] = useState('all');
//   const [selectedDocument, setSelectedDocument] = useState(null);

//   // Example raw data for documents
//   const rawData = [
//     {
//       'Tên tài liệu': 'Quy định công tác Đoàn',
//       'Loại tài liệu': 'Quy định',
//       'Ngày ban hành': '15/03/2022',
//       'Nơi ban hành': 'Ban Chấp hành Đoàn',
//       'Mô tả': 'Mô tả cho tài liệu Quy định công tác Đoàn',
//       'Tải tài liệu': '/path/to/document1.pdf',
//     },
//     {
//       'Tên tài liệu': 'Hướng dẫn tổ chức hoạt động',
//       'Loại tài liệu': 'Hướng dẫn',
//       'Ngày ban hành': '20/07/2023',
//       'Nơi ban hành': 'Trung ương Đoàn',
//       'Mô tả': 'Mô tả cho tài liệu Hướng dẫn tổ chức hoạt động',
//       'Tải tài liệu': '/path/to/document2.pdf',
//     },
//   ];

//   const data = rawData.map(item => ({
//     ...item,
//     'Tải tài liệu': (
//       <a href={item['Tải tài liệu']} download onClick={(e) => e.stopPropagation()}>
//         <button style={{
//           padding: '6px 12px',
//           backgroundColor: '#4CAF50',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//           fontSize: '14px',
//         }}>
//           Tải về
//         </button>
//       </a>
//     ),
//   }));

//   const handleRowClick = (rowData) => {
//     setSelectedDocument(rowData); // Store the selected document's data
//   };

//   const handleAddClick = () => {
//     // Example: Add new document logic here
//     console.log('Add document');
//   };

//   const handleDeleteClick = () => {
//     // Example: Delete document logic here
//     console.log('Delete document');
//   };

//   const columns = [
//     'Tên tài liệu',
//     'Loại tài liệu',
//     'Ngày ban hành',
//     'Nơi ban hành',
//     'Tải tài liệu',
//   ];

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.filterBar}>
//         <Search
//           value={searchValue}
//           onChange={setSearchValue}
//           placeholder="Nhập thông tin tài liệu muốn tìm"
//         />
//         <Filter
//           selected={filterValue}
//           onChange={setFilterValue}
//         />
//         <Add onClick={handleAddClick} />
//         <Delete onClick={handleDeleteClick} />
//       </div>
      
//       <Table_doc
//         columns={columns}
//         data={data}
//         onRowClick={handleRowClick} // Pass row click handler to Table
//       />
      
//       {selectedDocument && (
//         <div className={styles.infoSection}>
//           <Info_document document={selectedDocument} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Listdocument;
import React, { useState } from 'react';
import styles from './Listdocument.module.css';
import Table_doc from '../../../components/Table_doc/Table_doc';
import Search from '../../../components/Search/Search';
import Filter from '../../../components/Filter/Filter';
import Add from '../../../components/Add/Add';
import Delete from '../../../components/Delete/Delete';
import Formadddocument from '../../../components/Formadddocument/Formadddocument';

const Listdocument = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [showFormAdd, setShowFormAdd] = useState(false);

  const columns = [
    'Tên tài liệu',
    'Loại tài liệu',
    'Ngày ban hành',
    'Nơi ban hành',
    'Tải tài liệu',
  ];

  const rawData = [
    {
      'Tên tài liệu': 'Quy định công tác Đoàn',
      'Loại tài liệu': 'Quy định',
      'Ngày ban hành': '15/03/2022',
      'Nơi ban hành': 'Ban Chấp hành Đoàn',
      'Mô tả': 'Mô tả cho tài liệu Quy định công tác Đoàn',
      'Tải tài liệu': '/path/to/document1.pdf',
    },
    {
      'Tên tài liệu': 'Hướng dẫn tổ chức hoạt động',
      'Loại tài liệu': 'Hướng dẫn',
      'Ngày ban hành': '20/07/2023',
      'Nơi ban hành': 'Trung ương Đoàn',
      'Mô tả': 'Mô tả cho tài liệu Hướng dẫn tổ chức hoạt động',
      'Tải tài liệu': '/path/to/document2.pdf',
    },
  ];

  const data = rawData.map(item => ({
    ...item,
    'Tải tài liệu': (
      <a href={item['Tải tài liệu']} download onClick={(e) => e.stopPropagation()}>
        <button style={{
          padding: '6px 12px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}>
          Tải về
        </button>
      </a>
    ),
  }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterBar}>
        <Search 
          value={searchValue} 
          onChange={setSearchValue} 
          placeholder="Nhập thông tin tài liệu muốn tìm" 
        />
        <Filter 
          selected={filterValue} 
          onChange={setFilterValue} 
        />
        <Add onClick={() => setShowFormAdd(true)} />
        <Delete onClick={() => console.log('Delete button clicked')} />
      </div>

      <Table_doc columns={columns} data={data} />

      {showFormAdd && (
        <Formadddocument onClose={() => setShowFormAdd(false)} />
      )}
    </div>
  );
};

export default Listdocument;
