import Account from "../models/account.model.js";
import Chapter from "../models/chapter.model.js";
import { checkDuplicated } from "../utils/checkDuplicated.js";
import { response } from "../utils/response.js";

const AuthController = () => {

  const login = async (req, res) => {
    try {

      res.clearCookie("chapterId");
      res.clearCookie("role");

      const data = req.body;

      const keyAuth = data.keyAuth?.toString().trim() || "";
      const fieldKey = keyAuth.includes("@") ? "email" : "phone";

      const query = {};
      query[fieldKey] = keyAuth;

      const account = await Account.findOne(query);
      const { role, chapterId } = account;

      if (!account) {
        console.log("Tài khoản không tồn tại");
        return response(res, 404, "Tài khoản không tồn tại");
      }

      if (account.role == "leader") {
        if (!chapterId) {
          console.log("Không có quyền truy cập");
          return response(res, 403, "Không có quyền truy cập");
        }
        res.cookie("chapterId", chapterId.toString());
      }

      res.cookie("role", role);

      console.log("Tài khoản tìm được:", account);
      return response(res, 200, "Tìm thấy tài khoản", account);

    } catch (error) {
      console.error("❌ Lỗi khi đăng nhập:", error);
      return response(res, 500, "Đã xảy ra lỗi máy chủ", error.message);
    }
  };

  const logout = (req, res) =>{
  try {

      res.clearCookie("chapterId");
      res.clearCookie("role");
      return response(res, 200, "Đăng xuất thành công");

  } catch (error) {
    console.error("❌ Lỗi khi đăng xuất:", error);
    return response(res, 500, "Đã xảy ra lỗi máy chủ", error.message);
  }

  }

  const register = async (req, res) => {
    try {
      const data = req.body;

      if (
        (await checkDuplicated(Account, "email", data.email)) ||
        (await checkDuplicated(Account, "phone", data.phone))
      ) {
        console.log("Số điện thoại hoặc email đã được đăng ký");
        return response(res, 400, "Số điện thoại hoặc email đã được đăng ký");
      }

      const account = new Account(data);
      await account.save();
      console.log(`Account's data: `, account);
      return response(res, 201, "Tạo tài khoản thành công", account);
    } catch (error) {
      console.error("❌ Lỗi khi tạo tài khoản:", error);
      return response(res, 500, "Đã xảy ra lỗi máy chủ", error.message);
    }
  };

  const getOwnedChapter = async (req, res) => {
    try {
      const { chapterId } = req.cookies;
      console.log(chapterId);
  
      // Kiểm tra nếu không có chapterId trong cookies
      if (!chapterId) {
        console.log('Không có chapterId trong cookies');
        return response(res, 400, 'Không tìm thấy thông tin chi đoàn');
      }
  
      // Tìm chi đoàn dựa trên chapterId
      const chapter = await Chapter.findById(chapterId);
  
      if (!chapter) {
        console.log('Không tìm thấy chi đoàn bạn quản lý');
        return response(res, 404, 'Không tìm thấy chi đoàn');
      }
  
      console.log(chapter);
      return response(res, 200, 'Thông tin chi đoàn', chapter); // Trả về thông tin chi đoàn
  
    } catch (error) {
      console.error("❌ Lỗi khi truy xuất chi đoàn:", error);
      return response(res, 500, "Đã xảy ra lỗi máy chủ", error.message);
    }
  };
  

  return {  login, logout, register, getOwnedChapter};
};

export default AuthController();
