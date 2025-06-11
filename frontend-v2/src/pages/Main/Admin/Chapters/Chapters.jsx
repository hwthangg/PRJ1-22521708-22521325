import React, { lazy, useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import Pagination from "../../../../components/Pagination/Pagination";
import styles from "./Chapters.module.css";
import TextInput from "../../../../components/Input/TextInput/TextInput";
import Dropdown from "../../../../components/Input/Dropdown/Dropdown";
import { IoAddCircle} from "react-icons/io5";
import AccountForm from "../../../../components/Form/AccountForm/AccountForm";
import ChapterForm from "../../../../components/Form/ChapterForm/ChapterForm";

function Chapters() {
  const [data, setData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false)

  const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Hoạt động" },
    { value: "banned", label: "Khóa" }
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");


  const chooseFilter = (e) => {
  const { name, value } = e.target;
  console.log(name)

  switch (name) {

    case "status":
      setStatus(value);
      break;
       case "search":
      setSearch(value);
      break;

  }
};
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/chapters?page=${currentPage}&limit=5&search=${search}&status=${status}&sortBy=createdAt&sortOrder=asc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await res.json();
        console.log(result)
        setData(result.data.chapters);
        setTotalPages(result.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchChapters();
    console.log(search);
  }, [search, status, currentPage]);
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
          placeholder="Nhập thông tin chi đoàn cần tìm"
        />
       
        <Dropdown
          name="status"
          value={status}
          onChangeValue={chooseFilter}
          label={"Trạng thái"}
          options={statusOptions}
        />

        <button className={styles.addBtn} onClick={()=>{setShowAddForm(true)}} ><IoAddCircle size={40}/></button>
      </div>
      <div className={styles.tableWrapper}>
        {" "}
        <Table name="chapter" data={data} startIndex={(currentPage - 1) * 5} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {showAddForm ? <><ChapterForm setOpen={setShowAddForm}/></>:<></>}
    </div>
  );
}

export default Chapters;
