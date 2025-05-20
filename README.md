# Tài liệu API Quản lý Tài khoản (Account Management API)

## Tổng quan
API này cung cấp các chức năng CRUD (Create, Read, Update, Delete) cho hệ thống quản lý tài khoản, bao gồm tạo mới, lấy danh sách, xem chi tiết, cập nhật và thay đổi trạng thái tài khoản.

## Các Endpoint

### 1. Tạo tài khoản mới
**Endpoint:** `POST /api/accounts`

**Request Body:**
```json
{
  "account": {
    "email": "string (bắt buộc)",
    "phone": "string (bắt buộc)",
    "fullname": "string",
    "birthday": "date",
    "gender": "string",
    "role": "string"
  },
  "member": {
    // Thông tin member (nếu có)
  },
  "manager": "string // ID manager (nếu có)"
}
```

**Responses:**
- `201 Created`: Tạo tài khoản thành công
  ```json
  {
    "code": "ACCOUNT_CREATED",
    "message": "Tạo tài khoản thành công",
    "data": { /* Thông tin tài khoản vừa tạo */ }
  }
  ```
- `400 Bad Request`: Dữ liệu không hợp lệ
- `500 Internal Server Error`: Lỗi server

---

### 2. Lấy danh sách tài khoản phân trang
**Endpoint:** `GET /api/accounts`

**Query Parameters:**
- `page`: Số trang (mặc định: 1)
- `limit`: Số lượng mỗi trang (mặc định: 10)
- `search`: Từ khóa tìm kiếm (email, phone hoặc fullname)
- `status`: Lọc theo trạng thái (active/banned/waiting)
- `role`: Lọc theo vai trò
- `sortBy`: Trường sắp xếp (mặc định: _id)
- `sortOrder`: Thứ tự sắp xếp (asc/desc, mặc định: asc)

**Response:**
```json
{
  "code": "ACCOUNTS_FETCHED",
  "message": "Lấy danh sách tài khoản thành công",
  "data": {
    "accounts": [ /* Danh sách tài khoản */ ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

---

### 3. Lấy thông tin tài khoản bằng ID
**Endpoint:** `GET /api/accounts/:accountId`

**Responses:**
- `200 OK`: Thành công
  ```json
  {
    "code": "ACCOUNT_FETCHED",
    "message": "Lấy thông tin tài khoản thành công",
    "data": { /* Thông tin tài khoản */ }
  }
  ```
- `404 Not Found`: Không tìm thấy tài khoản
- `400 Bad Request`: ID không hợp lệ
- `500 Internal Server Error`: Lỗi server

---

### 4. Cập nhật thông tin tài khoản
**Endpoint:** `PUT /api/accounts/:accountId`

**Request Body:**
```json
{
  "account": {
    "email": "string",
    "phone": "string",
    "fullname": "string",
    "birthday": "date",
    "gender": "string"
  }
}
```

**Responses:**
- `200 OK`: Cập nhật thành công
  ```json
  {
    "code": "ACCOUNT_UPDATED",
    "message": "Cập nhật tài khoản thành công",
    "data": { /* Thông tin tài khoản đã cập nhật */ }
  }
  ```
- `400 Bad Request`: Dữ liệu không hợp lệ
- `404 Not Found`: Không tìm thấy tài khoản
- `500 Internal Server Error`: Lỗi server

---

### 5. Thay đổi trạng thái tài khoản
**Endpoint:** `PATCH /api/accounts/:accountId/status`

**Request Body:**
```json
{
  "status": "active|banned|waiting"
}
```

**Responses:**
- `200 OK`: Thay đổi thành công
  ```json
  {
    "code": "STATUS_UPDATED",
    "message": "Cập nhật trạng thái thành công",
    "data": {
      "previousStatus": "string",
      "newStatus": "string",
      "updatedAt": "date"
    }
  }
  ```
- `400 Bad Request`: Trạng thái không hợp lệ
- `404 Not Found`: Không tìm thấy tài khoản
- `500 Internal Server Error`: Lỗi server

## Mã lỗi (Error Codes)
| Code                | Mô tả                               |
|---------------------|-------------------------------------|
| INVALID_ACCOUNT_DATA | Dữ liệu tài khoản không hợp lệ       |
| ACCOUNT_NOT_FOUND    | Không tìm thấy tài khoản            |
| INVALID_STATUS       | Trạng thái không hợp lệ             |
| SERVER_ERROR         | Lỗi hệ thống                        |

## Ghi chú
1. Tất cả các endpoint đều có logging chi tiết
2. Có validate dữ liệu đầu vào cho từng endpoint
3. Phân trang được hỗ trợ cho endpoint lấy danh sách
4. API trả về response thống nhất với cấu trúc:
   ```typescript
   {
     code: string,    // Mã response
     message: string, // Thông báo
     data?: any,      // Dữ liệu (nếu có)
     errors?: any     // Chi tiết lỗi (nếu có)
   }
   ```

## Ví dụ sử dụng với Axios
```javascript
// Tạo tài khoản mới
const createAccount = async (accountData) => {
  try {
    const response = await axios.post('/api/accounts', accountData);
    console.log('Tạo tài khoản thành công:', response.data);
  } catch (error) {
    console.error('Lỗi khi tạo tài khoản:', error.response.data);
  }
};

// Lấy danh sách tài khoản
const getAccounts = async (page = 1, search = '') => {
  try {
    const response = await axios.get('/api/accounts', {
      params: { page, search }
    });
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách:', error.response.data);
  }
};
```


