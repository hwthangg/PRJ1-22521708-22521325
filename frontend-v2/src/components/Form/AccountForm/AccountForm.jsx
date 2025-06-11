import React, { useEffect, useState } from "react";
import styles from "./AccountForm.module.css";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDisplayValue, formatYYYYMMDD } from "../../../../utils";
import Avatar from "../../Input/Avatar/Avatar";
import TextInput from "../../Input/TextInput/TextInput";
import Dropdown from "../../Input/Dropdown/Dropdown";
import DateInput from "../../Input/DateInput/DateInput";
import PasswordInput from "../../Input/PasswordInput/PasswordInput";

export default function AccountForm({ id, setOpen }) {
  const [formData, setFormData] = useState({});

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [managerOf, setManagerOf] = useState("");
  const [memberOf, setMemberOf] = useState("");
  const [position, setPosition] = useState("");
  const [cardId, setCardId] = useState("");
  const [joinedAt, setJoinedAt] = useState("");

  const [address, setAddress] = useState("");
  const [hometown, setHometown] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [religion, setReligion] = useState("");
  const [eduLevel, setEduLevel] = useState("");

  const [chapters, setChapters] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const val = files ? files[0] : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    switch (name) {
      case "email":
        setEmail(val);
        break;
      case "phone":
        setPhone(val);
        break;
      case "fullname":
        setFullname(val);
        break;
      case "gender":
        setGender(val);
        break;
      case "password":
        setPassword(val);
        break;
      case "birthday":
        setBirthday(val);
        break;
      case "status":
        setStatus(val);
        break;
      case "role":
        setRole(val);
        break;
      case "avatar":
        setAvatar(URL.createObjectURL(val));
        break;
      case "managerOf":
        setManagerOf(val);
        break;
      case "memberOf":
        setMemberOf(val);
        break;
      case "position":
        setPosition(val);
        break;
      case "cardId":
        setCardId(val);
        break;
      case "joinedAt":
        setJoinedAt(val);
        break;
      case "address":
        setAddress(val);
        break;
      case "hometown":
        setHometown(val);
        break;
      case "ethnicity":
        setEthnicity(val);
        break;
      case "religion":
        setReligion(val);
        break;
      case "eduLevel":
        setEduLevel(val);
        break;
      default:
        break;
    }
  };
  const handleCreating = async () => {
    try {
      const form = new FormData();

      // Thêm các field text vào FormData
      for (const key in formData) {
        {
          form.append(key, formData[key]);
        }
      }

      const res = await fetch(`http://localhost:5000/api/accounts`, {
        method: "POST",
        body: form,
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
      const form = new FormData();

      // Thêm các field text vào FormData
      for (const key in formData) {
        {
          form.append(key, formData[key]);
        }
      }

      const res = await fetch(`http://localhost:5000/api/accounts/${id}`, {
        method: "PUT",
        body: form,
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
      const fetchAccount = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/accounts/${id}`);
          const data = await res.json();
          console.log(data.data);
          setEmail(data.data.email);
          setPhone(data.data.phone);
          setFullname(data.data.fullname);
          setGender(data.data.gender);
          setBirthday(formatYYYYMMDD(data.data.birthday));
          setStatus(data.data.status);
          setRole(data.data.role);
          setAvatar(data.data.avatar);

          setManagerOf(data.data.managerOf);
          setMemberOf(data.data.infoMember?.memberOf);
          setPosition(data.data.infoMember?.position || "");
          setCardId(data.data.infoMember?.cardId || "");
          setJoinedAt(
            data.data.infoMember?.joinedAt
              ? formatYYYYMMDD(data.data.infoMember?.joinedAt)
              : ""
          );
          setAddress(data.data.infoMember?.address || "");
          setHometown(data.data.infoMember?.hometown || "");
          setEthnicity(data.data.infoMember?.ethnicity || "");
          setReligion(data.data.infoMember?.religion || "");
          setEduLevel(data.data.infoMember?.eduLevel || "");
        } catch (error) {
          console.error(error);
          toast.error("Có lỗi xảy ra");
        }
      };
      fetchAccount();
    } else {
    }

    const fetchChapters = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/chapters?limit=10000&page=1`
        );
        const data = await res.json();
        setChapters(
          data.data.chapters.map((item) => ({
            value: item._id,
            label: item.name,
          }))
        );
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra");
      }
    };
    fetchChapters();
  }, [id]);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <div className={styles.generalSection}>
            <div className={styles.avatarContainer}>
              <Avatar value={avatar} onChangeValue={handleChange} />
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.title}>
                <p>THÔNG TIN TÀI KHOẢN</p>
              </div>
              <div className={styles.infoAccount}>
                <div className={styles.section}>
                  <TextInput
                    width={100}
                    label="Email"
                    name="email"
                    placeholder="Nhập email..."
                    value={email}
                    onChangeValue={handleChange}
                  />
                  <TextInput
                    width={100}
                    label="Số điện thoại"
                    name="phone"
                    placeholder="Nhập số điện thoại..."
                    value={phone}
                    onChangeValue={handleChange}
                  />
                </div>
                {id ? (
                  <></>
                ) : (
                  <>
                    <PasswordInput
                      label="Mật khẩu"
                      name="password"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChangeValue={handleChange}
                    />
                  </>
                )}

                <TextInput
                  label="Họ và tên"
                  name="fullname"
                  placeholder="Nhập họ và tên..."
                  value={fullname}
                  onChangeValue={handleChange}
                />
                <div className={styles.section}>
                  <Dropdown
                    width={60}
                    label="Giới tính"
                    name="gender"
                    value={gender}
                    onChangeValue={handleChange}
                    options={[
                      { value: "", label: "Chọn giới tính" },
                      { value: "male", label: "Nam" },
                      { value: "female", label: "Nữ" },
                    ]}
                  />
                  <DateInput
                    label="Ngày sinh"
                    name="birthday"
                    value={birthday}
                    onChangeValue={handleChange}
                    width={30}
                  />
                  <Dropdown
                    label="Trạng thái"
                    name="status"
                    value={status}
                    onChangeValue={handleChange}
                    width={50}
                    options={[
                      { value: "", label: "Chọn trạng thái" },
                      { value: "active", label: "Hoạt động" },
                      { value: "banned", label: "Khóa" },
                      { value: "waiting", label: "Chờ phê duyệt" },
                    ]}
                  />
                </div>
                <div className={styles.section}>
                  {id ? (
                    <>
                      {" "}
                      <TextInput
                        width={100}
                        label="Phân quyền"
                        name="role"
                        value={formatDisplayValue("role", role)}
                      />{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <Dropdown
                        width={100}
                        label="Phân quyền"
                        name="role"
                        value={role}
                        options={[
                          { value: "", label: "Chọn phân quyền" },
                          { value: "admin", label: "Quản trị viên" },
                          { value: "manager", label: "Quản lý chi đoàn" },
                          { value: "member", label: "Đoàn viên" },
                        ]}
                        onChangeValue={handleChange}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.addingSection}>
            {role === "manager" ? (
              <Dropdown
                width={100}
                label="Chi đoàn quản lý"
                name="managerOf"
                value={managerOf}
                onChangeValue={handleChange}
                options={chapters}
              />
            ) : (
              <></>
            )}

            {role === "member" ? (
              <>
                <>
                  <Dropdown
                    width={100}
                    label="Chi đoàn sinh hoạt"
                    name="memberOf"
                    value={memberOf}
                    onChangeValue={handleChange}
                    options={chapters}
                  />
                  <div className={styles.section}>
                    {" "}
                    <Dropdown
                      width={40}
                      label="Chức vụ"
                      name="position"
                      value={position}
                      onChangeValue={handleChange}
                      options={[
                        { value: "Bí thư", label: "Bí thư" },
                        { value: "Phó Bí thư", label: "Phó Bí thư" },
                        { value: "Ủy viên BCH", label: "Ủy viên BCH" },
                        { value: "Đoàn viên", label: "Đoàn viên" },
                      ]}
                    />{" "}
                    <TextInput
                      label="Số thẻ đoàn"
                      name="cardId"
                      value={cardId}
                      onChangeValue={handleChange}
                    />
                    <DateInput
                      label="Ngày vào đoàn"
                      name="joinedAt"
                      value={joinedAt}
                      onChangeValue={handleChange}
                    />
                    <TextInput
                      label="Dân tộc"
                      name="ethnicity"
                      value={ethnicity}
                      onChangeValue={handleChange}
                    />
                    <TextInput
                      label="Tôn giáo"
                      name="religion"
                      value={religion}
                      onChangeValue={handleChange}
                    />
                  </div>

                  <div className={styles.section}>
                    <TextInput
                      width={100}
                      label="Quê quán"
                      name="hometown"
                      value={hometown}
                      onChangeValue={handleChange}
                    />

                    <TextInput
                      width={100}
                      label="Trình độ học vấn"
                      name="eduLevel"
                      value={eduLevel}
                      onChangeValue={handleChange}
                    />
                  </div>
                  <TextInput
                    label="Địa chỉ"
                    name="address"
                    value={address}
                    onChangeValue={handleChange}
                  />
                </>
              </>
            ) : (
              <></>
            )}
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
