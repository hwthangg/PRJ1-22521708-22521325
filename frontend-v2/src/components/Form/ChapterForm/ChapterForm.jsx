import React, { useEffect, useState } from "react";
import styles from "./ChapterForm.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDisplayValue, formatYYYYMMDD } from "../../../../utils";
import Avatar from "../../Input/Avatar/Avatar";
import TextInput from "../../Input/TextInput/TextInput";
import Dropdown from "../../Input/Dropdown/Dropdown";
import DateInput from "../../Input/DateInput/DateInput";
import PasswordInput from "../../Input/PasswordInput/PasswordInput";
import Table from "../../../components/Table/Table";
import Pagination from "../../Pagination/Pagination";
import avatar from "../../../assets/avatar.png";

export default function ChapterForm({ id, setOpen }) {
  const [formData, setFormData] = useState({});

  const [name, setName] = useState("");
  const [affiliated, setAffiliated] = useState("");
  const [chapterAddress, setChapterAddress] = useState("");
  const [establishedAt, setEstablishedAt] = useState("");
  const [status, setStatus] = useState("");
  const [manager, setManager] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const val = files ? files[0] : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    switch (name) {
      case "name":
        setName(val);
        break;
      case "affiliated":
        setAffiliated(val);
        break;
      case "chapterAddress":
        setChapterAddress(val);
        break;
      case "establishedAt":
        setEstablishedAt(val);
        break;
      case "status":
        setStatus(val);
        break;
    }
  };
  const handleCreating = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          affiliated: affiliated,
          address: chapterAddress,
          establishedAt: establishedAt,
        }),
      });

      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
    }
  };
  const handleUpdating = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/chapters/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         name: formData.name,
         affiliated: formData.affiliated,
         establishedAt:formData.establishedAt,
         address:formData.address,
         status:formData.status
        }),
      });

      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
    }
  };
  useEffect(() => {
    if (id) {
      console.log(id);
      const fetchChapter = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/chapters/${id}`);
          const data = await res.json();
          console.log(data);
          setName(data.data.name);
          setAffiliated(data.data.affiliated);
          setChapterAddress(data.data.address);
          setEstablishedAt(formatYYYYMMDD(data.data.establishedAt));
          setStatus(data.data.status);
          setManager({
            avatar: data.data.avatar || avatar,
            fullname: data.data.fullname,
          });
        } catch (error) {
          console.error(error);
          toast.error("Có lỗi xảy ra");
        }
      };
      fetchChapter();
    } else {
    }
   
  }, [id]);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <div className={styles.generalSection}>
            <div className={styles.infoContainer}>
              <div className={styles.title}>
                <p>THÔNG TIN CHI ĐOÀN</p>
              </div>
              <div className={styles.section}>
                <TextInput
                  width={65}
                  label="Tên chi đoàn"
                  name="name"
                  placeholder="Nhập tên chi đoàn..."
                  value={name}
                  onChangeValue={handleChange}
                />
                <TextInput
                  width={100}
                  label="Đơn vị trực thuộc"
                  name="affiliated"
                  placeholder="Nhập đơn vị trực thuộc..."
                  value={affiliated}
                  onChangeValue={handleChange}
                />
              </div>

              <div className={styles.section}>
                <DateInput
                  label="Ngày thành lập"
                  name="establishedAt"
                  value={establishedAt}
                  onChangeValue={handleChange}
                />
                <Dropdown
                  width={30}
                  label="Trạng thái"
                  name="status"
                  value={status}
                  onChangeValue={handleChange}
                  options={[
                    { value: "", label: "Chọn trạng thái" },
                    { value: "active", label: "Hoạt động" },
                    { value: "banned", label: "Khóa" },
                  ]}
                />
                <TextInput
                  width={100}
                  label="Địa chỉ"
                  name="chapterAddress"
                  placeholder="Nhập địa chỉ..."
                  value={chapterAddress}
                  onChangeValue={handleChange}
                />
              </div>
              {id?<> <div className={styles.manager}>
               
                <img  src={manager.avatar}/>
              <div> <p>Người quản lý</p><p>{manager.fullname || 'Chưa có'}</p></div>
             
              </div></>:<></>}
             
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {id ? (
              <>
                {" "}
                <button onClick={handleUpdating}>Cập nhật</button>
              </>
            ) : (
              <>
                <button onClick={handleCreating}>Tạo</button>
              </>
            )}
          </div>
        </div>
        <button className={styles.closeBtn} onClick={() => setOpen(false)}>
          <IoIosCloseCircle size={40} color="red" />
        </button>
      </div>
    </div>
  );
}
