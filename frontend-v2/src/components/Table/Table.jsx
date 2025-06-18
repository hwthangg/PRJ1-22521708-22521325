import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import avatar from "../../assets/avatar.png";
import { formatDisplayValue, formatUtcDateToDDMMYYYY } from "../../../utils";
import AccountForm from "../Form/AccountForm/AccountForm";
import ChapterForm from "../Form/ChapterForm/ChapterForm";
import EventForm from "../Form/EventForm/EventForm";

function Table({ name, data, startIndex }) {
  const [openDetails, setOpenDetails] = useState(false);
  const [id, setId] = useState("");
  const accountFields = [
    { flex: 1, field: "STT", data: "" },
    { flex: 3, field: "Họ và tên", data: "fullname" },
    { flex: 3, field: "Email", data: "email" },
    { flex: 2, field: "Phân quyền", data: "role" },
    { flex: 2, field: "Trạng thái", data: "status" },
  ];

  const chapterFields = [
    { flex: 1, field: "STT" },
    { flex: 3, field: "Tên chi đoàn", data: "name" },
    { flex: 3, field: "Địa chỉ", data: "address" },
    { flex: 3, field: "Người quản lý", data: "manager" },
    { flex: 1, field: "Trạng thái", data: "status" },
  ];

  const memberFields = [
    { flex: 1, field: "STT" },
    { flex: 3, field: "Họ và tên", data: "fullname" },
    { flex: 2, field: "Số thẻ đoàn", data: "cardId" },
    { flex: 2, field: "Chức vụ", data: "position" },
    { flex: 1, field: "Trạng thái", data: "status" },
  ];

  const eventFields = [
    { flex: 1, field: "STT" },
    { flex: 3, field: "Tên sự kiện", data: "name" },
    { flex: 1, field: "Ngày diễn ra", data: "startedAt" },
    { flex: 2, field: "Địa điểm", data: "location" },
    { flex: 1, field: "Quy mô", data: "scope" },
    { flex: 1, field: "Trạng thái", data: "status" },
  ];

  const documentFields = [
    { flex: 0.5, field: "STT" },
    { flex: 2.5, field: "Tên tài liệu", data: "title" },
    { flex: 2, field: "Số, ký hiệu", data: "code" },
    { flex: 2, field: "Nơi ban hành", data: "issuedBy" },
    { flex: 1.5, field: "Độ mật", data: "confidentiality" },
  ];

  const [fields, setFields] = useState([]);

  useEffect(() => {
    switch (name) {
      case "account":
        setFields(accountFields);
        break;
      case "chapter":
        setFields(chapterFields);
        break;
      case "member":
        setFields(memberFields);
        break;
      case "event":
        setFields(eventFields);
        break;
      case "document":
        setFields(documentFields);
        break;
      default:
        setFields([]);
    }
  }, [data, openDetails]);

  return (
    <>
      {" "}
      <div className={styles.tableWrapper}>
        {/* Header */}
        <div className={styles.tableHeader}>
          {fields.map((col, index) => (
            <div
              key={index}
              className={styles.tableCell}
              style={{ flex: col.flex }}
            >
              {col.field}
            </div>
          ))}
        </div>

        {/* Rows */}
        {data?.map((item, index) => (
          <div
            key={index}
            className={styles.tableRow}
            onClick={() => {
              setId(item._id), setOpenDetails(true);
            }}
          >
            {fields.map((col, i) => (
              <div
                key={i}
                className={styles.tableCell}
                style={{ flex: col.flex }}
              >
                {col.data == "manager" || col.data == "fullname" ? (
                  <>
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      <img
                        src={item.avatar || avatar}
                        style={{
                          width: 40,
                          aspectRatio: "1/1",
                          borderRadius: 100,
                        }}
                      />
                      <p style={{ textAlign: "left" }}>
                        {item.fullname || "Chưa có"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {col.data == "startedAt" || col.data == "issuedAt" ? (
                      <>{formatUtcDateToDDMMYYYY(item?.[col.data])}</>
                    ) : (
                      <>
                        {i === 0
                          ? index + 1 + startIndex
                          : formatDisplayValue(col.data, item?.[col.data])}
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {openDetails ? (
        <>
          {" "}
          {name == "account" || name == "member" ? (
            <>
              <AccountForm id={id} setOpen={setOpenDetails} />
            </>
          ) : (
            <></>
          )}
          {name == "chapter" ? (
            <>
              <ChapterForm id={id} setOpen={setOpenDetails} />
            </>
          ) : (
            <></>
          )}
           {name == "event" ? (
            <>
              <EventForm id={id} setOpen={setOpenDetails} />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Table;
