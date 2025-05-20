import { Account, Member } from "../models/index.js";
import { response, validateAccount } from "../utils/index.js";

const AccountController = () => {
  /**
   * Tạo tài khoản mới
   * Endpoint: POST /accounts
   * Request body: { account: {...}, member?: {...}, manager?: ... }
  */
  const createAccount = async (req, res) => {
    const logPrefix = "[AccountController][createAccount]";
    console.log(`${logPrefix} Start with data:`, req.body);

    try {
      const input = req.body;

      // Validate input
      if (!(await validateAccount(input))) {
        console.warn(`${logPrefix} Validation failed`);
        return response(res, 400, "INVALID_ACCOUNT_DATA");
      }

      // Tạo account
      const account = new Account(input.account);
      console.log(`${logPrefix} Account instance created`, account);

      // Xử lý member nếu có
      if (input.member) {
        const member = new Member(input.member);
        await member.save();
        account.infoMember = member._id;
        console.log(`${logPrefix} Member created and linked`, member._id);
      }

      // Xử lý manager nếu có
      if (input.manager) {
        account.managerOf = input.manager;
        console.log(`${logPrefix} Manager assigned`, input.manager);
      }

      account.status = 'active'

      // Lưu account
      const savedAccount = await account.save();
      console.log(`${logPrefix} Account saved successfully`, savedAccount._id);

      return response(res, 201, "ACCOUNT_CREATED", savedAccount);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Lấy danh sách tài khoản phân trang
   * Endpoint: GET /accounts?page=1&limit=10&search=...&status=...&role=...&sortBy=...&sortOrder=...
   */
  const getAccountsInPage = async (req, res) => {
    const logPrefix = "[AccountController][getAccountsInPage]";
    console.log(`${logPrefix} Start with query:`, req.query);

    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        status,
        role,
        sortBy = "_id",
        sortOrder = "asc",
      } = req.query;

      // Build filter
      const filter = {};
      if (search) {
        filter.$or = [
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { fullname: { $regex: search, $options: "i" } },
        ];
        console.log(`${logPrefix} Search filter applied:`, filter.$or);
      }

      if (status) filter.status = status;
      if (role) filter.role = role;

      // Pagination options
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
        lean: true,
      };
      console.log(`${logPrefix} Pagination options:`, options);

      // Execute query
      const result = await Account.paginate(filter, options);
      console.log(`${logPrefix} Found ${result.docs.length} accounts`);

      return response(res, 200, "ACCOUNTS_FETCHED", {
        accounts: result.docs,
        pagination: {
          currentPage: result.page,
          totalPages: result.totalPages,
          totalItems: result.totalDocs,
          itemsPerPage: result.limit,
        }
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Lấy thông tin tài khoản bằng ID
   * Endpoint: GET /accounts/:accountId
   */
  const getAccountById = async (req, res) => {
    const logPrefix = "[AccountController][getAccountById]";
    console.log(`${logPrefix} Request for account:`, req.params.accountId);

    try {
      const account = await Account.findById(req.params.accountId).populate('infoMember');

      if (!account) {
        console.warn(`${logPrefix} Account not found`);
        return response(res, 404, "ACCOUNT_NOT_FOUND");
      }

      console.log(`${logPrefix} Account found`);
      return response(res, 200, "ACCOUNT_FETCHED", account);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === 'CastError') {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Cập nhật thông tin tài khoản
   * Endpoint: PUT /accounts/:accountId
   */
  const updateAccountById = async (req, res) => {
    const logPrefix = "[AccountController][updateAccount]";
    console.log(`${logPrefix} Start update for:`, req.params.accountId);

    try {
      const { accountId } = req.params;
      const input = req.body;

      console.log(`${logPrefix} Update data:`, input);

      // Validate input
      if (!(await validateAccount(input, true, accountId))) {
        console.warn(`${logPrefix} Validation failed`);
        return response(res, 400, "INVALID_UPDATE_DATA");
      }

      // Find and update account
      const account = await Account.findById(accountId);
      if (!account) {
        console.warn(`${logPrefix} Account not found`);
        return response(res, 404, "ACCOUNT_NOT_FOUND");
      }

      // Apply updates
      const updateFields = ["email", "phone", "fullname", "birthday", "gender"];
      updateFields.forEach(field => {
        if (input.account?.[field] !== undefined) {
          account[field] = input.account[field];
          console.log(`${logPrefix} Updated field ${field}`);
        }
      });

      await account.save();
      console.log(`${logPrefix} Account updated successfully`);

      return response(res, 200, "ACCOUNT_UPDATED", account);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }));

        return response(res, 400, "VALIDATION_ERROR", { errors });
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Thay đổi trạng thái tài khoản
   * Endpoint: PATCH /accounts/:accountId/status
   */
  const changeAccountStatus = async (req, res) => {
    const logPrefix = "[AccountController][changeStatus]";
    console.log(`${logPrefix} Request:`, req.params, req.body);

    try {
      const { accountId } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ['active', 'banned', 'waiting'];
      if (!validStatuses.includes(status)) {
        console.warn(`${logPrefix} Invalid status: ${status}`);
        return response(res, 400, "INVALID_STATUS", { validStatuses });
      }

      // Find account
      const account = await Account.findById(accountId);
      if (!account) {
        console.warn(`${logPrefix} Account not found`);
        return response(res, 404, "ACCOUNT_NOT_FOUND");
      }

      // Check if status changed
      if (account.status === status) {
        console.log(`${logPrefix} Status not changed`);
        return response(res, 200, "STATUS_UNCHANGED");
      }

      // Update status
      const previousStatus = account.status;
      account.status = status;
      account.updatedAt = new Date();

      await account.save();
      console.log(`${logPrefix} Status changed from ${previousStatus} to ${status}`);

      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status,
        updatedAt: account.updatedAt
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === 'CastError') {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  return {
    createAccount,
    getAccountsInPage,
    getAccountById,
    updateAccountById,
    changeAccountStatus
  };
};

export default AccountController();