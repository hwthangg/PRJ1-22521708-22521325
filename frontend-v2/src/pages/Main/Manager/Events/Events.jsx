import React, { lazy, useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import Pagination from "../../../../components/Pagination/Pagination";
import styles from "./Events.module.css";
import TextInput from "../../../../components/Input/TextInput/TextInput";
import Dropdown from "../../../../components/Input/Dropdown/Dropdown";
import { IoAddCircle } from "react-icons/io5";
import AccountForm from "../../../../components/Form/AccountForm/AccountForm";

function Events() {
  const [data, setData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const scopeOptions = [
    { value: "all", label: "Tất cả" },
    { value: "public", label: "Công khai" },
    { value: "chapter", label: "Chi đoàn" },
  ];
  const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "completed", label: "Hoàn thành" },
    { value: "doing", label: "Đang diễn ra" },
    { value: "canceled", label: "Hủy bỏ" },
    { value: "pending", label: "Sắp diễn ra" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [scope, setScope] = useState("all");

  const chooseFilter = (e) => {
    const { name, value } = e.target;
    console.log(name);

    switch (name) {
      case "scope":
        setScope(value);
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
          `http://localhost:5000/api/events?page=${currentPage}&limit=5&search=${search}&status=${status}&scope=${scope}&chapterId=1&sortBy=createdAt&sortOrder=asc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const result = await res.json();
        console.log(result);
        setData(result.data.events);
        setTotalPages(result.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchMembers();
    console.log(search);
  }, [search, status, scope, currentPage]);
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
          name="scope"
          value={scope}
          onChangeValue={chooseFilter}
          label={"Quy mô"}
          options={scopeOptions}
        />
        <Dropdown
          name="status"
          value={status}
          onChangeValue={chooseFilter}
          label={"Trạng thái"}
          options={statusOptions}
        />
        <button
          className={styles.addBtn}
          onClick={() => {
            setShowAddForm(true);
          }}
        >
          <IoAddCircle size={40} />
        </button>
      </div>
      <div className={styles.tableWrapper}>
        {" "}
        <Table name="event" data={data} startIndex={(currentPage - 1) * 5} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {showAddForm ? (
        <>
          <AccountForm setOpen={setShowAddForm} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Events;
