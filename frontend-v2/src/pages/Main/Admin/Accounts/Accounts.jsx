import React, { useEffect, useState } from "react";
import Table from "../../../../components/Table/Table";
import Pagination from "../../../../components/Pagination/Pagination";
import styles from "./Accounts.module.css";

function Accounts() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/accounts?page=${currentPage}&limit=5&search=${search}&status=${status}&role=${role}&sortBy=createdAt&sortOrder=asc`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await res.json();
        setData(result.data.accounts);
        setTotalPages(result.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, [search, status, role, currentPage]);
  return (
    <div className={styles.container}>
      <div>Filter</div>
      <div className={styles.tableWrapper}>
        {" "}
        <Table name="account" data={data} startIndex={(currentPage - 1) * 5} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
        
      </div>
    </div>
  );
}

export default Accounts;
