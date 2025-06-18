import React, { useEffect, useState } from "react";
import styles from "./Documents.module.css";
import Pagination from "../../../../components/Pagination/Pagination";
import ClipLoader from "react-spinners/ClipLoader";
import { IoAddCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import AddDocument from "../../../../components/AddDocument/AddDocument";
import DocumentDetails from "../../../../components/DocumentDetails/DocumentDetails";


export default function Documents() {
  const fields = [
    { flex: 1, field: "STT" },
    { flex: 4, field: "Tên văn bản" },
    { flex: 2, field: "Số hiệu" },
    { flex: 2, field: "Loại văn bản" },
    { flex: 2, field: "Quy mô" },
  ];

  const mapFields = {
   VBHC: "Văn bản hành chính",
    TLSH: "Tài liệu sinh hoạt",
    other: "Khác",
    chapter: "Nội bộ",
   private: "Mật",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [scope, setScope] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [id, setId] = useState('')
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let retryInterval = null;
    let timeout = null;
    let isMounted = true;

    const fetchDocuments = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_APP_SERVER_URL
          }/api/documents?page=${currentPage}&limit=6&search=${search}&scope=${scope}`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        console.log(result)

        if (isMounted && result.data) {
          clearInterval(retryInterval);
          clearTimeout(timeout);
          setData(result.data.documents);
          setTotalPages(result.data.totalPages || 1);
          setLoading(false);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          toast.error("Không thể tải danh sách sự kiện");
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchDocuments();
    retryInterval = setInterval(fetchDocuments, 5000);
    timeout = setTimeout(() => {
      clearInterval(retryInterval);
      setLoading(false);
    }, 60000);

    return () => {
      isMounted = false;
      clearInterval(retryInterval);
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search, currentPage, scope, status, openAdd, openDetails]);

  return (
    <div className={styles.container}>
      <div className={styles.toolBar}>
        <div className={styles.inputContainer} style={{ flex: 2 }}>
          <label htmlFor="search">Tìm kiếm</label>
          <input
            type="search"
            id="search"
            placeholder="Tìm theo tên ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer} style={{ flex: 1 }}>
          <label htmlFor="scope">Quy mô</label>
          <select
            id="scope"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className={styles.inputSelect}
          >
            <option value="">Tất cả</option>
            <option value="private">Mật</option>
            <option value="chapter">Chi đoàn</option>
          </select>
        </div>

       

        <div
          className={styles.inputContainer}
          style={{ flex: 1, justifyContent: "flex-end" }}
          onClick={() => setOpenAdd(true)}
        >
          <IoAddCircle size={60} color="#3c78d8" className={styles.addButton} />
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.head}>
          {fields.map((item, index) => (
            <div
              key={index}
              className={styles.cell}
              style={{ flex: item.flex }}
            >
              <p>{item.field}</p>
            </div>
          ))}
        </div>

        <div className={styles.data}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <ClipLoader color="#36d7b7" size={50} />
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : data?.length === 0 ? (
            <div className={styles.noDataContainer}>
              <p>Không có dữ liệu</p>
            </div>
          ) : (
            data.map((item, index) => (
              <div
                key={index}
                className={styles.row}
                onClick={() => {setOpenDetails(true), setId(item._id)}}
              >
                <div
                  className={styles.cell}
                  style={{ flex: fields[0].flex, textAlign: "center" }}
                >
                  <p>{index + 1 + (currentPage - 1) * 6}</p>
                </div>
                <div className={styles.cell} style={{ flex: fields[1].flex }}>
                  <p>{item.name}</p>
                </div>
                <div className={styles.cell} style={{ flex: fields[2].flex, textAlign: "center" }}>
                  <p>{item.docCode}</p>
                </div>
                <div className={styles.cell} style={{ flex: fields[3].flex }}>
                  <p
                    style={{
                      textAlign: "center",
                    }}
                  >
                   {mapFields[item.type]}
                  </p> 
                </div>
                <div className={styles.cell} style={{ flex: fields[4].flex }}>
                  <p
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {mapFields[item.scope]}
                  </p>
                </div>
               
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      {openDetails && <DocumentDetails id={id} open={setOpenDetails} canEdit={true}/>}
      {openAdd && <AddDocument open={setOpenAdd} />}
    </div>
  );
}
