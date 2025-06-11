// import { Account, Chapter, Member } from "../models/index.js";
// import { response } from "../utils/index.js";
// import bcrypt from "bcryptjs";

// // Controller quản lý các thao tác với tài khoản
// const AccountController = () => {
//   // Tạo tài khoản mới
//   const createAccount = async (req, res) => {
//     try {
//       console.log("Call: create account");
//       const body = req.body;

//       // Kiểm tra dữ liệu bắt buộc
//       if (
//         !body.email ||
//         !body.phone ||
//         !body.fullname ||
//         !body.birthday ||
//         !body.gender ||
//         !body.role ||
//         !body.password
//       ) {
//        return res.json({ message: "missing data" });
        
//       }

//       // Kiểm tra email trùng
//       const duplicate = await Account.findOne({ email: body.email });
//       if (duplicate) {
//         return res.json({ message: "duplicated email" });
//       }

//       // Tạo đối tượng Account
//       const account = new Account({
//         email: body.email,
//         phone: body.phone,
//         fullname: body.fullname,
//         birthday: new Date(body.birthday),
//         gender: body.gender,
//         role: body.role,
//         password: await bcrypt.hash(body.password, 10), // Mã hóa mật khẩu
//       });

//       // Gán đường dẫn ảnh đại diện nếu có
//       if (req.file) {
//         account.avatar = req.file.path;
//       }

//       // Nếu là member -> tạo thêm thông tin member
//       if (body.role === "member") {
//         // Kiểm tra dữ liệu member
//         if (
//           !body.memberOf ||
//           !body.cardId ||
//           !body.position ||
//           !body.joinedAt ||
//           !body.address ||
//           !body.hometown ||
//           !body.ethnicity ||
//           !body.religion ||
//           !body.eduLevel
//         ) {
//           return res.json({ message: "missing data" });
//         }

//         // Kiểm tra cardId trùng
//         const duplicate = await Member.findOne({ cardId: body.cardId });
//         if (duplicate) {
//          return  res.json({ message: "duplicated cardId" });
//         }

//         // Tạo và lưu member
//         const member = new Member({
//           memberOf: body.memberOf,
//           cardId: body.cardId,
//           position: body.position,
//           joinedAt: body.joinedAt,
//           address: body.address,
//           hometown: body.hometown,
//           ethnicity: body.ethnicity,
//           religion: body.religion,
//           eduLevel: body.eduLevel,
//         });

//         await member.save();
//         account.infoMember = member._id; // Gắn member vào account
//       }

//       // Nếu là manager -> gắn chapter phụ trách
//       if (body.role === "manager") {
//         if (!body.managerOf) {
//          return  res.json({ message: "missing data" });
//         }

//         account.managerOf = body.managerOf;
//       }

//       account.status = "active"; // Trạng thái mặc định
//       await account.save(); // Lưu account

//       // Truy vấn lại để lấy dữ liệu đầy đủ
//       const result = await Account.findById(account._id)
//         .populate("infoMember")
//         .populate("managerOf");

//       return res.json({ message: "create account successfully", data: result });
//     } catch (error) {
//       console.log(error)
//       res.json(error)
//     }
//   };

//   // Lấy danh sách tài khoản có phân trang và lọc
//   const getAccountsInPage = async (req, res) => {
//     const logPrefix = "[AccountController][getAccountsInPage]";
//     // console.log(`${logPrefix} Start with query:`, req.query);

//     try {
//       // Lấy tham số từ query string
//       const {
//         page = 1,
//         limit = 10,
//         search,
//         status,
//         role,
//         position,
//         chapterId,
//         sortBy = "createdAt",
//         sortOrder = "asc",

//       } = req.query;

//       const filter = {};

//       // Tìm kiếm gần đúng theo email, phone, fullname
//       if (search) {
//         filter.$or = [
//           { email: { $regex: search, $options: "i" } },
//           { phone: { $regex: search, $options: "i" } },
//           { fullname: { $regex: search, $options: "i" } },
//         ];
//       }

//       // Lọc theo status nếu có
//       if (status) {
//         filter.status = status;
//       }

//       // Lọc theo role nếu có
//       if (role) {
//         filter.role = role;
//       }

//       const options = {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         sort: {
//           [sortBy]: sortOrder === "asc" ? 1 : -1,
//         },
//         populate: { path: "managerOf" },

//       };

//       const result = await Account.paginate(filter, options);

      
//       return response(res, 200, "ACCOUNTS_FETCHED", {
//         accounts: result.docs,
//         pagination: {
//           currentPage: result.page,
//           totalPages: result.totalPages,
//           totalItems: result.totalDocs,
//           itemsPerPage: result.limit,
//         },
//       });
//     } catch (error) {
//       console.error(`${logPrefix} Error:`, error);
//       return response(res, 500, "SERVER_ERROR");
//     }
//   };

//   // Lấy tài khoản theo ID
//   // const getAccountById = async (req, res) => {
    

//   //   try {
//   //     const account = await Account.findById(req.params.accountId);
     

//   //     result["account"] = account;

//   //     // Nếu là member -> lấy thêm infoMember
//   //     if (account.role === "member") {
//   //       const infoMember = await Member.findById(account.infoMember).populate(
//   //         "chapterId"
//   //       );
//   //       result["infoMember"] = infoMember;
//   //     }

//   //     // Nếu là manager -> lấy chapter phụ trách
//   //     if (account.role === "manager") {
//   //       const infoManagerOf = await Chapter.findById(account.managerOf);
//   //       result["infoManagerOf"] = infoManagerOf;
//   //     }

//   //     return response(res, 200, "ACCOUNT_FETCHED", result);
//   //   } catch (error) {
//   //     console.error(`${logPrefix} Error:`, error);
//   //     return response(res, 500, "SERVER_ERROR");
//   //   }
//   // };
// const getAccountById = async(req, res)=>{
//   try {
//     console.log('Call: get account by id')
//     const {id} = req.params
//     const account = await Account.findById(id).populate('infoMember')
//     res.json({message:'get account successfully', data: account})
//   } catch (error) {
//       console.log(error)
//       res.json(error)
//   }
// }
//   // Cập nhật tài khoản
//   // const updateAccountById = async (req, res) => {
//   //   const logPrefix = "[AccountController][updateAccount]";
//   //   console.log(`${logPrefix} Start update for:`, req.params.accountId, req.body);

//   //   try {
//   //     const input = req.body;
//   //     const file = req.file;

//   //     const accountFields = [
//   //       "email", "phone", "fullname", "birthday", "gender", "role"
//   //     ];

//   //     // Kiểm tra trùng email nếu có thay đổi
//   //     if (input.email != "") {
//   //       const existingAccount = await Account.findOne({ email: input.email });
//   //       if (
//   //         existingAccount &&
//   //         existingAccount._id.toString() != req.params.accountId.toString()
//   //       ) {
//   //         return response(res, 400, "INVALID_ACCOUNT_DATA");
//   //       }
//   //     }

//   //     const currentAccount = await Account.findById(req.params.accountId);

//   //     // Gán lại các trường đã thay đổi
//   //     for (const field of accountFields) {
//   //       if (input[field] != "") {
//   //         currentAccount[field] = input[field];
//   //       }
//   //     }

//   //     // Gán lại avatar nếu có file mới
//   //     if (file && input.avatar != "" ) {
//   //       currentAccount.avatar = file.path;
//   //     }

//   //     // Cập nhật thông tin member nếu có
//   //     if (currentAccount.infoMember) {
//   //       const currentMember = await Member.findById(currentAccount.infoMember);
//   //       const infoMemberFields = [
//   //         "chapterId", "cardId", "position", "joinedAt", "address",
//   //         "hometown", "ethnicity", "religion", "eduLevel"
//   //       ];

//   //       if (input.cardId != "") {
//   //         const existingMember = await Member.findOne({ cardId: input.cardId });
//   //         if (existingMember && currentMember._id.toString() != existingMember._id.toString()) {
//   //           return response(res, 400, "INVALID_MEMBER_DATA");
//   //         }
//   //       }

//   //       for (const field of infoMemberFields) {
//   //         if (input[field] != "") {
//   //           currentMember[field] = input[field];
//   //         }
//   //       }

//   //       await currentMember.save();
//   //     }

//   //     // Cập nhật chapter cho manager nếu có
//   //     if (currentAccount.managerOf && input.chapterId != "") {
//   //       currentAccount.managerOf = input.chapterId;
//   //     }

//   //     await currentAccount.save();

//   //     // Lấy lại thông tin sau khi cập nhật
//   //     const updatedAccount = await Account.findById(currentAccount._id)
//   //       .populate("infoMember")
//   //       .populate("managerOf");

//   //     return response(res, 201, "ACCOUNT_UPDATED", updatedAccount);
//   //   } catch (error) {
//   //     console.error(`${logPrefix} Error:`, error);
//   //     return response(res, 500, "SERVER_ERROR");
//   //   }
//   // };

//   const updateAccountById = async (req, res) => {
//     try {
//       console.log("Call: update account");
//       const { id } = req.params;
//       const body = req.body;
//       const accountFields = [
//         "status",
//         "email",
//         "phone",
//         "avatar",
//         "fullname",
//         "birthday",
//         "gender",
//       ];
//       const managerField = "managerOf";
//       const memberFields = [
//         "memberOf",
//         "position",
//         "cardId",
//         "joinedAt",
//         "address",
//         "hometown",
//         "ethnicity",
//         "religion",
//         "eduLevel",
//       ];
//       //Cập nhật thông tin tài khoản

//       const account = await Account.findById(id);
//       if (body.email) {
//         const duplicate = await Account.findOne({ email: body.email });
//         if (duplicate._id.toString() == id) {
//           res.json("Duplicated email");
//         }
//       }
//       const updateAccount = new Account(body);
//       for (const field of accountFields) {
//         if (updateAccount[field] !== null) {
//           account[field] = updateAccount[field];
//         }
//       }

//       if (req.file) {
//         account.avatar = req.file.path;
//       }

//       if (body[managerField]) {
//         account.managerOf = body[managerField];
//       }

//       if (account.infoMember) {
//         const member = await Member.findById(account.infoMember);
//         if (body.cardId) {
//           const duplicate = await Member.findOne({ cardId: body.cardId });
//           if (duplicate._id.toString() != infoMember) {
//             res.json("Duplicated email");
//           }
//         }
//         const updateMember = new Member(body);
//         console.log(updateMember);
//         for (const field of memberFields) {
//           if (updateMember[field] !== null) {
//             member[field] = updateMember[field];
//           }
//         }
//         await member.save();
//       }
//       await account.save();

//       const result = await Account.findById(id).populate("infoMember");

//       res.json({ message: "updating account successfully", data: result });
//     } catch (error) {
//       console.log(error);
//       res.json(error);
//     }
//   };

//   // Trả về các hàm để export
//   return {
//     createAccount,
//     getAccountsInPage,
//     getAccountById,
//     updateAccountById,
//   };
// };

// export default AccountController();
