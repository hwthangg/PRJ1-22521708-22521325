import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import avatar from "../../../../assets/avatar.png";
import { MdAddPhotoAlternate } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";

function AddDocument({setOpen}) {
    const typeOptions = [
    "Nghị quyết",
    "Biên bản",
    "Báo cáo",
    "Tài liệu sinh hoạt",
    "Khác",
  ];
  const [data, setData] = useState({});
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData((prev) => ({ ...prev, file: url }));
      setFormData((prev) => ({ ...prev, file: file }));
    }
  };
  const handleUpdating = async () => {
    try {
      const formDataToSend = new FormData();

      // Các trường văn bản
      Object.entries(formData).forEach(([key, value]) => {
       
          formDataToSend.append(key, value);
        
      });
       const res = await fetch(`http://localhost:5000/api/documents`, {
      method: "POST",
      body: formDataToSend,
      credentials: "include",
    });

    const da = await res.json()
    console.log(da)

    setFormData({})
    setData({})
    

    const data = await res.json();
    console.log("Response:", data);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/documents/${documentId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        data.data.issuedAt = data.data.issuedAt?.slice(0, 10);
        setData(data.data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  },[]);

  useEffect(() => {
    console.log(formData);
  }, [formData, data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "10px 0",
        flex: 1,
        backgroundColor:'white',
           borderRadius:'10px'
, boxShadow:'0 0 5px black'  
      }}
    >
      {/* Trở về */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
      marginTop:'10px',
          cursor: "pointer",
        }}
        onClick={() => setOpen(false)}
      >
        <IoChevronBackOutline size={30} color="#0d47a1" />
        <p style={{ color: "#0d47a1", fontWeight: "bold", fontSize: "large" }}>
          Trở về
        </p>
      </div>

      {/* Thông tin và tài liệu */}
      <div
        style={{
          display: "flex",
        
          width: "100%",
          boxSizing: "border-box",
       
          flexDirection: "row",
        }}
      >
        {/* Bên trái: Thông tin */}
        <div
          style={{
            display: "flex",
          
            width: "100%",
            boxSizing: "border-box",
       
            padding: "30px",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "20px",
          }}
        >
          {/* Tên tài liệu */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <p
              style={{
                fontSize: "large",
                color: "#0d47a1",
                fontWeight: "bold",
              }}
            >
              Tên tài liệu
            </p>
            <div
              style={{
                border: "2px solid #0d47a1",
                borderRadius: "10px",
                padding: "10px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                name="name"
                style={{
                  border: "none",
                  outline: "none",
                  caretColor: "black",
                  width: "100%",
                  color: "#0d47a1",
                }}
                value={data.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Số hiệu & Ngày ban hành */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                flex: 1,
              }}
            >
              <p
                style={{
                  fontSize: "large",
                  color: "#0d47a1",
                  fontWeight: "bold",
                }}
              >
                Số hiệu
              </p>
              <div
                style={{
                  border: "2px solid #0d47a1",
                  borderRadius: "10px",
                  padding: "10px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  name="docId"
                  style={{
                    border: "none",
                    outline: "none",
                    caretColor: "black",
                    width: "100%",
                    color: "#0d47a1",
                  }}
                  value={data.docId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <p
                style={{
                  fontSize: "large",
                  color: "#0d47a1",
                  fontWeight: "bold",
                }}
              >
                Ngày ban hành
              </p>
              <div
                style={{
                  border: "2px solid #0d47a1",
                  borderRadius: "10px",
                  padding: "10px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="date"
                  name="issuedAt"
                  style={{
                    border: "none",
                    outline: "none",
                    caretColor: "black",
                    width: "100%",
                    color: "#0d47a1",
                  }}
                  value={data.issuedAt || "2000-01-01"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Nơi ban hành */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <p
              style={{
                fontSize: "large",
                color: "#0d47a1",
                fontWeight: "bold",
              }}
            >
              Nơi ban hành
            </p>
            <div
              style={{
                border: "2px solid #0d47a1",
                borderRadius: "10px",
                padding: "10px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                name="issuer"
                style={{
                  border: "none",
                  outline: "none",
                  caretColor: "black",
                  width: "100%",
                  color: "#0d47a1",
                }}
                value={data.issuer || ""}
                onChange={handleChange}
              />
            </div>
          </div>

           <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              width: "100%",
           
            }}
          >
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                flex: 1,
              }}
            >
              <p
                style={{
                  fontSize: "large",
                  color: "#0d47a1",
                  fontWeight: "bold",
                }}
              >
                Phạm vi
              </p>
              <div
                style={{
                  border: "2px solid #0d47a1",
                  borderRadius: "10px",
                  padding: "10px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <select
                  name="scope"
                  style={{
                    border: "none",
                    outline: "none",
                    caretColor: "black",
                    width: "100%",
                    color: "#0d47a1",
                  }}
                  defaultValue={data.scope}
                  onChange={handleChange}
                >
                  <option value="chapter">Chi đoàn</option>
                  <option value="private">Mật</option>
                </select>
              </div>
            </div>{" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                flex: 1,
              }}
            >
              <p
                style={{
                  fontSize: "large",
                  color: "#0d47a1",
                  fontWeight: "bold",
                }}
              >
                Loại tài liệu
              </p>
              <div
                style={{
                  border: "2px solid #0d47a1",
                  borderRadius: "10px",
                  padding: "10px",
                  height: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <select
                  name="type"
                  style={{
                    border: "none",
                    outline: "none",
                    caretColor: "black",
                    width: "100%",
                    color: "#0d47a1",
                  }}
                  defaultValue={data.scope}
                  onChange={handleChange}
                >
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
<div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      fontSize: "large",
                      color: "#0d47a1",
                      fontWeight: "bold",
                    }}
                  >
                    Mô tả
                  </p>
                  <div
                    style={{
                      border: "2px solid #0d47a1",
                      borderRadius: "10px",
                      padding: "10px",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <textarea
                      rows={10}
                      name="description"
                      style={{
                        resize: "none",

                        border: "none",
                        outline: "none",
                        caretColor: "black",
                        width: "100%",
                        color: "#0d47a1",
                      }}
                      value={data.description || ""}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
          {/* Nút thao tác */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "15px",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                all: "unset",
                padding: "10px 60px",
                borderRadius: "10px",
                backgroundColor: "#0d47a1",
                cursor: "pointer",
                width: "80px",
              }}
              onClick={() => handleUpdating()}
            >
              <p
                style={{
                  fontSize: "large",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Cập nhật
              </p>
            </div>
            {data.status === "active" ? <></> : <>  <div
              style={{
                all: "unset",
                padding: "10px 60px",
                borderRadius: "10px",
                backgroundColor: "#d50000",
                cursor: "pointer",
                width: "80px",
              }}
            >
              <p
                style={{
                  fontSize: "large",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Xóa
              </p>
            </div></>}
          
          </div>
        </div>

        {/* Bên phải: Xem tài liệu */}
        <div
          style={{
            display: "flex",
       
            width: "100%",
            boxSizing: "border-box",
         
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <label htmlFor="file">
            {" "}
            <RiFileEditFill size={30} color="#3d85c6" />
          </label>
          <input
            style={{
              all: "unset",
              display: "none",
            }}
            type="file"
            accept=".pdf"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
          {formData.file ? (
            <>
              {" "}
              <iframe
                src={data.file}
                style={{ width: "100%", height: "600px" }}
                title="Document Viewer"
              />{" "}
            </>
          ) : (
            <>
              {data.file ? (
  <iframe
    src={`https://docs.google.com/gview?url=${data.file}&embedded=true`}
    style={{ width: "100%", height: "600px" }}
    title="Document Viewer"
    key={data.file} // ép iframe reload khi URL thay đổi
  />
) : (
  <p>Thêm tài liệu...</p>
)}

            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddDocument;
