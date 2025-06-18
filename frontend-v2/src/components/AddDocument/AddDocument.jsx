import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "./AddDocument.module.css";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { IoCloseCircle } from "react-icons/io5";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function AddDocument({open}) {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    docCode: "",
    scope: "chapter",
    type: "VBHC",
    description: "",
  });

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Vui lòng chọn một tệp PDF hợp lệ.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Vui lòng chọn file PDF!");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("name", formData.name);
      data.append("docCode", formData.docCode);
      data.append("scope", formData.scope);
      data.append("type", formData.type);
      data.append("description", formData.description);

      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/documents`, {
        method: "POST",
        body: data,
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Thêm tài liệu thành công!");
        // Reset form
        setFormData({
          name: "",
          docCode: "",
          scope: "chapter",
          type: "VBHC",
          description: "",
        });
        setFile(null);
        setNumPages(null);
      } else {
        toast.error(result.message || "Đã xảy ra lỗi!");
      }
    } catch (err) {
      toast.error("Lỗi mạng hoặc server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <button className={styles.closeButton} onClick={() => open(false)}>
                    <IoCloseCircle size={40} color="red" />
                  </button>
          <div className={styles.infoDocument}>
            <div className={styles.inputContainer}>
              <label htmlFor="name">Tên văn bản </label>
              <input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên văn bản"
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="docCode">Số hiệu </label>
              <input
                id="docCode"
                value={formData.docCode}
                onChange={handleChange}
                placeholder="Nhập số hiệu"
              />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputContainer} style={{ flex: 2 }}>
                <label htmlFor="scope">Phạm vi</label>
                <div className={styles.inputSelect}>
                  <select id="scope" value={formData.scope} onChange={handleChange}>
                    <option value="private">Mật</option>
                    <option value="chapter">Nội bộ</option>
                  </select>
                </div>
              </div>
              <div className={styles.inputContainer} style={{ flex: 3 }}>
                <label htmlFor="type">Loại tài liệu</label>
                <div className={styles.inputSelect}>
                  <select id="type" value={formData.type} onChange={handleChange}>
                    <option value="VBHC">Văn bản hành chính</option>
                    <option value="TLSH">Tài liệu sinh hoạt</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="description">Mô tả</label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả"
                style={{
                  outline: "none",
                  resize: "none",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid var(--normal-blue)",
                  color: "var(--normal-blue)",
                  caretColor: "black",
                }}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                all: "unset",
                backgroundColor: "var(--normal-blue)",
                color: "white",
                fontWeight: "bold",
                padding: "8px 24px",
                borderRadius: 10,
                marginTop: 20,
                textAlign: "center",
                width: 100,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? <ClipLoader size={16} color="#fff" /> : "Thêm"}
            </button>
          </div>

          <div className={styles.previewDocument} style={{ width: 440 }}>
            <h2 style={{ color: "var(--dark-blue)" }}>Thêm tài liệu PDF</h2>

            <label className={styles.uploadLabel} style={{ marginTop: 10 }}>
              Chọn file PDF
              <input
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
                style={{ display: "none" }}
              />
            </label>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {file && (
              <div
                className={styles.pdfPreview}
                style={{
                  marginTop: 10,
                  border: "10px solid var(--normal-blue)",
                  borderRadius: 10,
                  height: 500,
                  overflow: "auto",
                  backgroundColor: "var(--normal-blue)",
                  paddingRight: 10,
                }}
              >
                <Document
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={() => setError("Không thể hiển thị PDF")}
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} width={400} />
                  ))}
                </Document>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
