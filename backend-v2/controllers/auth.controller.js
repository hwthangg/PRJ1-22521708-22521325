import { Account, Member } from "../models/index.js";
import { validateAccount, response, validateMember, generateToken, verifyToken } from "../utils/index.js";

import bcrypt from 'bcryptjs';

const AuthController = () => {


  const register = async (req, res) => {
    const logPrefix = "[AuthController][register]";
    console.log(`${logPrefix} Start with data:`, req.body);

    try {
      const input = req.body;

      // Validate input
      if (!(await validateAccount(input))) {
        console.warn(`${logPrefix} Validation failed`);
        return response(res, 400, "INVALID_ACCOUNT_DATA");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(input.account.password, 10);
      input.account.password = hashedPassword;

      // Create account with default 'user' role
      const account = new Account(input.account);
      console.log(`${logPrefix} Account instance created`, account);

      // Process member info if exists
      if (input.member) {
        account.role = 'member';
        const member = new Member(input.member);
        await member.save();
        account.infoMember = member._id;
        console.log(`${logPrefix} Member created and linked`, member._id);
      }

      // Process manager if exists
      if (input.manager) {
        account.role = 'manager';
        account.managerOf = input.manager;
        console.log(`${logPrefix} Manager assigned`, input.manager);
      }

      // Save account
      const savedAccount = await account.save();
      console.log(`${logPrefix} Account saved successfully`, savedAccount._id);

      // Remove password before response
      const accountData = savedAccount.toObject();
      delete accountData.password;

      return response(res, 201, "REGISTER_SUCCESS", {
        account: accountData,
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  const login = async (req, res) => {
    const logPrefix = "[AuthController][login]";
    console.log(`${logPrefix} Start with data:`, req.body);

    try {
      const input = req.body;

      // Build query
      const query = {};
      if (input.credentials.email) {
        query.email = input.credentials.email;
      } else if (input.credentials.phone) {
        query.phone = input.credentials.phone;
      }

      // Find account with password field
      const account = await Account.findOne(query).select('+password');
      
      if (!account) {
        console.warn(`${logPrefix} Account not found`);
        return response(res, 401, "INVALID_CREDENTIALS");
      }

      // Compare password
      const isMatch = await bcrypt.compare(input.credentials.password, account.password);
      if (!isMatch) {
        console.warn(`${logPrefix} Password not match`);
        return response(res, 401, "INVALID_CREDENTIALS");
      }

      // Generate token
      const token = generateToken(account);
      res.cookie('token', token, {
        httpOnly: false
      });

      await account.save();

      // Remove sensitive data
      const accountData = account.toObject();
      delete accountData.password;
      delete accountData._id;
      delete accountData.createdAt;
      delete accountData.updatedAt;
      delete accountData.__v;
      delete accountData.infoMember;
      delete accountData.managerOf;
      

      console.log(`${logPrefix} Login successful`, account._id);
      return response(res, 200, "LOGIN_SUCCESS", {
        account: accountData,
        token
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  const logout = async (req, res) => {
    const logPrefix = "[AuthController][logout]";
    console.log(`${logPrefix} Start for account:`, req.accountId);

    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });

      console.log(`${logPrefix} Logout successful`);
      return response(res, 200, "LOGOUT_SUCCESS");

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  const getProfile = async (req, res) => {
    const logPrefix = "[AuthController][getProfile]";
    const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;
    console.log(decode);
    console.log(`${logPrefix} Start for account:`, accountId);

    try {
      const account = await Account.findById(accountId)
        .populate('infoMember')
        .lean();

      if (!account) {
        console.warn(`${logPrefix} Account not found`);
        return response(res, 404, "ACCOUNT_NOT_FOUND");
      }

      // Remove sensitive data
      delete account.password;
      delete account.__v;

      console.log(`${logPrefix} Profile retrieved successfully`);
      return response(res, 200, "PROFILE_FETCHED", account);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

const updateProfile = async (req, res) => {
  const logPrefix = "[AuthController][updateProfile]";
  
  try {
    // 1. Xác thực token
    if (!req.cookies?.token) {
      console.warn(`${logPrefix} No token provided`);
      return response(res, 401, "UNAUTHORIZED");
    }

    const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;
    console.log(`${logPrefix} Start for account:`, accountId);


    const { account: accountData, member: memberData } = req.body || {};
  

    // 3. Lấy thông tin tài khoản
    const account = await Account.findById(accountId).populate('infoMember');
    if (!account) {
      console.warn(`${logPrefix} Account not found`);
      return response(res, 404, "ACCOUNT_NOT_FOUND");
    }

    // 4. Cập nhật thông tin tài khoản
    if (accountData) {
      const allowedAccountFields = ['fullname', 'phone', 'birthday', 'gender', 'avatar'];
      allowedAccountFields.forEach(field => {
        if (accountData[field] !== undefined) {
          account[field] = accountData[field];
        }
      });

      // Xử lý đổi email
      if (accountData.email && accountData.email !== account.email) {
        const emailExists = await Account.findOne({ email: accountData.email });
        if (emailExists) {
          return response(res, 400, "EMAIL_EXISTS");
        }
        account.email = accountData.email;
      }

      // Xử lý đổi mật khẩu
      if (accountData.currentPassword && accountData.newPassword) {
        const isMatch = await bcrypt.compare(accountData.currentPassword, account.password);
        if (!isMatch) {
          return response(res, 400, "INVALID_PASSWORD");
        }
        account.password = await bcrypt.hash(accountData.newPassword, 10);
      }
    }

    // 5. Xử lý thông tin đoàn viên
    if (memberData != null) {
      
          const member = await Member.findById(account.infoMember._id);
          if (!member) {
            return response(res, 404, "MEMBER_NOT_FOUND");
          }

          if (!(await validateMember(memberData, true, member._id))) {
            return response(res, 400, "INVALID_MEMBER_DATA");
          }

          const allowedMemberFields = [
            "position", "joinedDate", "address", 
            "hometown", "ethnicity", "religion", "eduLevel", "cardId"
          ];

          allowedMemberFields.forEach(field => {
            if (memberData[field] !== undefined) {
              member[field] = memberData[field];
            }
          });

          await member.save();
        }
      
    

    // 6. Lưu thay đổi
    await account.save();
    const updatedAccount = await Account.findById(accountId)
      .populate('infoMember')

    // 7. Trả về response theo format mong muốn
    return response(res, 200, "PROFILE_UPDATED", updatedAccount);

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
    updateProfile
  };
};

export default AuthController();