import { Account, Chapter, Member } from "../models/index.js";
import { response } from "../utils/index.js";
import bcrypt from "bcryptjs";

// Controller quản lý các thao tác với tài khoản
const AccountController = () => {

  // Tạo tài khoản mới
  const createAccount = async (req, res) => {
    const logPrefix = "[AccountController][createAccount]";
    // console.log(`${logPrefix} Start with data:`, req.body, req.file);

    try {
      const input = req.body;
      const file = req.file;

      // Kiểm tra dữ liệu bắt buộc
      if (
        !input.email || !input.phone || !input.fullname ||
        !input.birthday || !input.gender || !input.role || !input.password
      ) {
        return response(res, 400, "MISSING_ACCOUNT_DATA");
      }

      // Kiểm tra email trùng
      const existingAccount = await Account.findOne({ email: input.email });
      if (existingAccount) {
        console.warn(`${logPrefix} Validation failed: Email has registered`);
        return response(res, 400, "INVALID_ACCOUNT_DATA");
      }

      // Tạo đối tượng Account
      const newAccount = new Account({
        email: input.email,
        phone: input.phone,
        fullname: input.fullname,
        birthday: new Date(input.birthday),
        gender: input.gender,
        role: input.role,
        password: await bcrypt.hash(input.password, 10), // Mã hóa mật khẩu
      });

      // Gán đường dẫn ảnh đại diện nếu có
      if (file) {
        newAccount.avatar = file.path;
      }

      // Nếu là member -> tạo thêm thông tin member
      if (input.role === "member") {
        // Kiểm tra dữ liệu member
        if (
          !input.chapterId || !input.cardId || !input.position ||
          !input.joinedAt || !input.address || !input.hometown ||
          !input.ethnicity || !input.religion || !input.eduLevel
        ) {
          return response(res, 400, "MISSING_MEMBER_DATA");
        }

        // Kiểm tra cardId trùng
        const existingMember = await Member.findOne({ cardId: input.cardId });
        if (existingMember) {
          console.warn(`${logPrefix} Validation failed: cardId has duplicated`);
          return response(res, 400, "INVALID_MEMBER_DATA");
        }

        // Tạo và lưu member
        const newMember = new Member({
          status: 'active',
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

      // Nếu là manager -> gắn chapter phụ trách
      if (input.role === "manager") {
        if (!input.chapterId) {
          return response(res, 400, "MISSING_MANAGER_DATA");
        }

        // Kiểm tra chapter đã có manager chưa
        const existingManager = await Account.findOne({ managerOf: input.chapterId });
        if (existingManager) {
          console.warn(`${logPrefix} Validation failed: Chapter has a manager`);
          return response(res, 400, "INVALID_MANAGER_DATA");
        }

        newAccount.managerOf = input.chapterId;
      }

      newAccount.status = "active"; // Trạng thái mặc định
      await newAccount.save(); // Lưu account

      // Truy vấn lại để lấy dữ liệu đầy đủ
      const savedAccount = await Account.findById(newAccount._id)
        .populate("infoMember")
        .populate("managerOf");

      return response(res, 201, "ACCOUNT_CREATED", savedAccount);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Lấy danh sách tài khoản có phân trang và lọc
  const getAccountsInPage = async (req, res) => {
    const logPrefix = "[AccountController][getAccountsInPage]";
    // console.log(`${logPrefix} Start with query:`, req.query);

    try {
      // Lấy tham số từ query string
      const {
        page = 1,
        limit = 10,
        search,
        status = "all",
        role = "all",
        sortBy = "createdAt",
        sortOrder = "asc",
      } = req.query;

      const filter = {};

      // Tìm kiếm gần đúng theo email, phone, fullname
      if (search) {
        filter.$or = [
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { fullname: { $regex: search, $options: "i" } },
        ];
      }

      // Lọc theo status nếu có
      if (status && status !== "all") {
        filter.status = status;
      }

      // Lọc theo role nếu có
      if (role && role !== "all") {
        filter.role = role;
      }

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {
          [sortBy]: sortOrder === "asc" ? 1 : -1,
        },
      };

      const result = await Account.paginate(filter, options);
      return response(res, 200, "ACCOUNTS_FETCHED", {
        accounts: result.docs,
        pagination: {
          currentPage: result.page,
          totalPages: result.totalPages,
          totalItems: result.totalDocs,
          itemsPerPage: result.limit,
        },
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Lấy tài khoản theo ID
  const getAccountById = async (req, res) => {
    const logPrefix = "[AccountController][getAccountById]";
    // console.log(`${logPrefix} Request for account:`, req.params.accountId);

    try {
      const result = {};

      const account = await Account.findById(req.params.accountId);
      if (!account) {
        return response(res, 404, "ACCOUNT_NOT_FOUND");
      }

      result["account"] = account;

      // Nếu là member -> lấy thêm infoMember
      if (account.role === "member") {
        const infoMember = await Member.findById(account.infoMember).populate('chapterId')
        result["infoMember"] = infoMember;
      }

      // Nếu là manager -> lấy chapter phụ trách
      if (account.role === "manager") {
        const infoManagerOf = await Chapter.findById(account.managerOf);
        result["infoManagerOf"] = infoManagerOf;
      }

      return response(res, 200, "ACCOUNT_FETCHED", result);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Cập nhật tài khoản
  const updateAccountById = async (req, res) => {
    const logPrefix = "[AccountController][updateAccount]";
    // console.log(`${logPrefix} Start update for:`, req.params.accountId, req.body);

    try {
      const input = req.body;
      const file = req.file;

      const accountFields = [
        "email", "phone", "fullname", "birthday", "gender", "role"
      ];

      // Kiểm tra trùng email nếu có thay đổi
      if (input.email != "") {
        const existingAccount = await Account.findOne({ email: input.email });
        if (
          existingAccount &&
          existingAccount._id.toString() != req.params.accountId.toString()
        ) {
          return response(res, 400, "INVALID_ACCOUNT_DATA");
        }
      }

      const currentAccount = await Account.findById(req.params.accountId);

      // Gán lại các trường đã thay đổi
      for (const field of accountFields) {
        if (input[field] != "") {
          currentAccount[field] = input[field];
        }
      }

      // Gán lại avatar nếu có file mới
      if (input.avatar != "") {
        currentAccount.avatar = file.path;
      }

      // Cập nhật thông tin member nếu có
      if (currentAccount.infoMember) {
        const currentMember = await Member.findById(currentAccount.infoMember);
        const infoMemberFields = [
          "chapterId", "cardId", "position", "joinedAt", "address",
          "hometown", "ethnicity", "religion", "eduLevel"
        ];

        if (input.cardId != "") {
          const existingMember = await Member.findOne({ cardId: input.cardId });
          if (existingMember && currentMember._id.toString() != existingMember._id.toString()) {
            return response(res, 400, "INVALID_MEMBER_DATA");
          }
        }

        for (const field of infoMemberFields) {
          if (input[field] != "") {
            currentMember[field] = input[field];
          }
        }

        await currentMember.save();
      }

      // Cập nhật chapter cho manager nếu có
      if (currentAccount.managerOf && input.chapterId != "") {
        currentAccount.managerOf = input.chapterId;
      }

      await currentAccount.save();

      // Lấy lại thông tin sau khi cập nhật
      const updatedAccount = await Account.findById(currentAccount._id)
        .populate("infoMember")
        .populate("managerOf");

      return response(res, 201, "ACCOUNT_UPDATED", updatedAccount);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Đổi trạng thái tài khoản (active/inactive)
  const changeAccountStatus = async (req, res) => {
    const logPrefix = "[AccountController][changeStatus]";
    // console.log(`${logPrefix} Request:`, req.params, req.body);

    try {
      const accountId = req.params.accountId;
      const status = req.body.status;

      const account = await Account.findById(accountId);

      // Nếu không thay đổi trạng thái
      if (account.status === status) {
        return response(res, 200, "STATUS_UNCHANGED");
      }

      // Cập nhật trạng thái
      const previousStatus = account.status;
      account.status = status;
      account.updatedAt = new Date();

      await account.save();

      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status,
        updatedAt: account.updatedAt,
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Trả về các hàm để export
  return {
    createAccount,
    getAccountsInPage,
    getAccountById,
    updateAccountById,
    changeAccountStatus,
  };
};

export default AccountController();
