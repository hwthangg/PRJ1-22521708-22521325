export const formatDisplayValue = (field, value) => {
  const mapStatus = {
    active: "Hoạt động",
    banned: "Khóa",
    waiting: "Chờ phê duyệt",
    pending: 'Sắp diễn ra',
    completed: 'Hoàn thành',
    doing:'Đang diễn ra',
    canceled:'Hủy bỏ'
  };

  const mapRole = {
    member: "Đoàn viên",
    manager: "Quản lý chi đoàn",
    admin: "Quản trị viên",
  };

  const mapScope = {
    public:"Công khai",
    chapter:'Chi đoàn'
  }



  if (field === "status") return mapStatus[value] || value;
  if (field === "role") return mapRole[value] || value;
   if (field === "scope") return mapScope[value] || value;
  return value;
};

export const formatYYYYMMDD = (string)=>{
  return string.slice(0,10)
}

 export function formatUtcDateToDDMMYYYY(utcDateString) {
    const date = new Date(utcDateString);

    // Lấy ngày, tháng, năm theo múi giờ UTC để đảm bảo kết quả nhất quán
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Tháng trong JS bắt đầu từ 0
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  export function formatVietnamTime(isoString) {
  const date = new Date(isoString);
  // Cộng thêm 7 giờ để chuyển sang giờ Việt Nam
  const vietnamTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  const hours = vietnamTime.getHours().toString().padStart(2, '0');
  const minutes = vietnamTime.getMinutes().toString().padStart(2, '0');
  const day = vietnamTime.getDate().toString().padStart(2, '0');
  const month = (vietnamTime.getMonth() + 1).toString().padStart(2, '0');
  const year = vietnamTime.getFullYear();

  return `${hours}:${minutes}, ngày ${day}/${month}/${year}`;
}
