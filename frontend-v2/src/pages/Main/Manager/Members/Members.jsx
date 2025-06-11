import React, { lazy, useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import Pagination from "../../../../components/Pagination/Pagination";
import styles from "./Members.module.css";
import TextInput from "../../../../components/Input/TextInput/TextInput";
import Dropdown from "../../../../components/Input/Dropdown/Dropdown";
import { IoAddCircle} from "react-icons/io5";
import AccountForm from "../../../../components/Form/AccountForm/AccountForm";

function Members() {
  const [data, setData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false)
  const positionOptions = [
    { value: "all", label: "Tất cả" },
    { value: "Bí thư", label: "Bí thư" },
    { value: "Phó Bí thư", label: "Phó Bí thư" },
    { value: "Ủy viên BCH", label: "Ủy viên BCH" },
    { value: "Đoàn viên", label: "Đoàn viên" },
  ];
  const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Hoạt động" },
    { value: "banned", label: "Khóa" },
     { value: "waiting", label: "Chờ phê duyệt" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [position, setPosition] = useState("all");

  const chooseFilter = (e) => {
  const { name, value } = e.target;
  console.log(name)

  switch (name) {
    case "position":
      setPosition(value);
      break;
    case "status":
      setStatus(value);
      break;
       case "search":
      setSearch(value);
      break;
    default:
      break;
  }
};
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/members?page=${currentPage}&limit=5&search=${search}&status=${status}&position=${position}&sortBy=createdAt&sortOrder=asc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials:'include'
          }
        );

        const result = await res.json();
        console.log(result)
        setData(result.data.members);
        setTotalPages(result.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchMembers();
    console.log(search);
  }, [search, status, position, currentPage]);
  return (
    <div className={styles.container}>
      <div className={styles.toolsContainer}>
        {" "}
        <TextInput
          width={50}
          label={"Tìm kiếm"}
          name="search"
          value={search}
          onChangeValue={chooseFilter}
          placeholder="Nhập thông tin tài khoản cần tìm"
        />
        <Dropdown
       
          name="position"
          value={position}
          onChangeValue={chooseFilter}
          label={"Chức vụ"}
          options={positionOptions}
        />
        <Dropdown
          name="status"
          value={status}
          onChangeValue={chooseFilter}
          label={"Trạng thái"}
          options={statusOptions}
        />

        
      </div>
      <div className={styles.tableWrapper}>
        {" "}
        <Table name="member" data={data} startIndex={(currentPage - 1) * 5} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {showAddForm ? <><AccountForm setOpen={setShowAddForm}/></>:<></>}
    </div>
  );
}

export default Members;
