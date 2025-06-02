import { Account, Member } from "../models/index.js";
import { response, generateToken, verifyToken } from "../utils/index.js";
import bcrypt from 'bcryptjs';

const AuthController = () => {
  // Hàm đăng ký tài khoản mới
  const register = async (req, res) => {
    const logPrefix = "[AuthController][register]";
    console.log(`${logPrefix} Start with data:`, req.body);

    try {
      const input = req.body;
      const file = req.file;

      // Kiểm tra các trường bắt buộc
      if (
        !input.email ||
        !input.phone ||
        !input.fullname ||
        !input.birthday ||
        !input.gender ||
        !input.role ||
        !input.password
      ) {
        return response(res, 400, "MISSING_ACCOUNT_DATA");
      }

      // Kiểm tra email đã tồn tại hay chưa
      const existingAccount = await Account.findOne({ email: input.email });
      if (existingAccount) {
        console.warn(`${logPrefix} Validation failed: Email has registered`);
        return response(res, 400, "INVALID_ACCOUNT_DATA");
      }

      // Tạo một tài khoản mới
      const newAccount = new Account({
        email: input.email,
        phone: input.phone,
        fullname: input.fullname,
        birthday: new Date(input.birthday),
        gender: input.gender,
        role: input.role,
        password: await bcrypt.hash(input.password, 10), // Mã hóa mật khẩu
      });

      // Gán avatar nếu người dùng có upload
      if (file) {
        newAccount.avatar = file.path;
      }

      // Nếu tài khoản là member -> tạo đối tượng member riêng
      if (input.role === "member") {
        if (
          !input.chapterId || !input.cardId || !input.position ||
          !input.joinedAt || !input.address || !input.hometown ||
          !input.ethnicity || !input.religion || !input.eduLevel
        ) {
          return response(res, 400, "MISSING_MEMBER_DATA");
        }

        // Kiểm tra trùng mã thẻ
        const existingMember = await Member.findOne({ cardId: input.cardId });
        if (existingMember) {
          return response(res, 400, "INVALID_MEMBER_DATA");
        }

        // Tạo member mới
        const newMember = new Member({
          chapterId: input.chapterId,
          cardId: input.cardId,
          position: input.position,
          joinedAt: input.joinedAt,
          address: input.address,
          hometown: input.hometown,
          ethnicity: input.ethnicity,
          religion: input.religion,
          eduLevel: input.eduLevel,
        });

        await newMember.save();
        newAccount.infoMember = newMember._id; // Gắn member vào account
      }

      // Nếu tài khoản là manager -> kiểm tra chi đoàn đã có người quản lý chưa
      if (input.role === "manager") {
        if (!input.chapterId) {
          return response(res, 400, "MISSING_MANAGER_DATA");
        }

        const existingManager = await Account.findOne({ managerOf: input.chapterId });
        if (existingManager) {
          return response(res, 400, "INVALID_MANAGER_DATA");
        }

        newAccount.managerOf = input.chapterId;
      }

      newAccount.status = "waiting"; // Tài khoản tạo mới có trạng thái mặc định là "waiting"
      await newAccount.save();

      // Truy vấn lại để lấy đầy đủ thông tin
      const savedAccount = await Account.findById(newAccount._id)
        .populate("infoMember")
        .populate("managerOf");

      return response(res, 201, "ACCOUNT_CREATED", savedAccount);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Hàm đăng nhập
  const login = async (req, res) => {
    const logPrefix = "[AuthController][login]";
    console.log(`${logPrefix} Start with data:`, req.body);

    try {
      const input = req.body;

      // Tìm tài khoản theo email
      const account = await Account.findOne({ email: input.email })
        .select("+password")
        .populate("infoMember")
        .populate("managerOf");

      if (!account) {
        return response(res, 401, "INVALID_CREDENTIALS");
      }

      // So sánh mật khẩu nhập vào với mật khẩu đã lưu (đã mã hóa)
      const isMatch = bcrypt.compare(input.password, account.password);
      if (!isMatch) {
        return response(res, 401, "INVALID_CREDENTIALS");
      }

      // Kiểm tra trạng thái tài khoản và member (nếu có)
      if (
        account.status === "waiting" || account.status === "banned" ||
        (account.infoMember && (account.infoMember.status === "waiting" || account.infoMember.status === "banned")) ||
        (account.managerOf && account.managerOf.status === "banned")
      ) {
        return response(res, 401, "INVALID_ACCOUNT_STATUS");
      }

      // Sinh token xác thực
      const token = generateToken(account);
      res.cookie("token", token, { httpOnly: false });

      return response(res, 200, "LOGIN_SUCCESS", { token, role:account.role });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Hàm đăng xuất
  const logout = async (req, res) => {
    const logPrefix = "[AuthController][logout]";
    console.log(`${logPrefix} Start for account:`, req.accountId);

    try {
      res.clearCookie("token", { httpOnly: true });
      return response(res, 200, "LOGOUT_SUCCESS");
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Hàm lấy thông tin hồ sơ cá nhân
  const getProfile = async (req, res) => {
    const logPrefix = "[AuthController][getProfile]";
    const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;

    try {
      const account = await Account.findById(accountId)
        .populate("infoMember")
        .populate("managerOf");

      return response(res, 200, "PROFILE_FETCHED", account);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Hàm cập nhật hồ sơ cá nhân
  const updateProfile = async (req, res) => {
    const logPrefix = "[AuthController][updateProfile]";
    const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;

    try {
      const input = req.body;
      const file = req.file;

      const currentAccount = await Account.findById(accountId);
      const accountFields = ["email", "phone", "fullname", "birthday", "gender", "role"];

      // Kiểm tra email mới có trùng không
      if (input.email !== "") {
        const existingAccount = await Account.findOne({ email: input.email });
        if (existingAccount && existingAccount._id.toString() !== accountId.toString()) {
          return response(res, 400, "INVALID_ACCOUNT_DATA");
        }
      }

      // Cập nhật các trường thông tin của tài khoản
      for (const field of accountFields) {
        if (input[field] !== "") {
          currentAccount[field] = input[field];
        }
      }

      // Cập nhật avatar nếu có
      if (input.avatar !== "") {
        currentAccount.avatar = file.path;
      }

      // Nếu là member, cập nhật infoMember
      if (currentAccount.infoMember) {
        const currentMember = await Member.findById(currentAccount.infoMember);
        const infoMemberFields = [
          "chapterId", "cardId", "position", "joinedAt",
          "address", "hometown", "ethnicity", "religion", "eduLevel",
        ];

        if (input.cardId !== "") {
          const existingMember = await Member.findOne({ cardId: input.cardId });
          if (existingMember && currentMember._id.toString() !== existingMember._id.toString()) {
            return response(res, 400, "INVALID_MEMBER_DATA");
          }
        }

        for (const field of infoMemberFields) {
          if (input[field] !== "") {
            currentMember[field] = input[field];
          }
        }

        await currentMember.save();
      }

      // Nếu là manager, cập nhật chapter phụ trách
      if (currentAccount.managerOf && input.chapterId !== "") {
        currentAccount.managerOf = input.chapterId;
      }

      await currentAccount.save();

      // Trả về tài khoản đã cập nhật
      const updatedAccount = await Account.findById(accountId)
        .populate("infoMember")
        .populate("managerOf");

      return response(res, 201, "ACCOUNT_UPDATED", updatedAccount);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  return {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
  };
};

export default AuthController();