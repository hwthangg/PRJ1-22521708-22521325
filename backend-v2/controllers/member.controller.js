import { Member, Chapter, Account } from "../models/index.js";
import { response, validateMember, verifyToken } from "../utils/index.js";

const MemberController = () => {
  // Lấy danh sách member theo trang, lọc và tìm kiếm
  const getMembersInPage = async (req, res) => {
    const logPrefix = "[MemberController][getMembersInPage]";
    const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;

    try {
      const account = await Account.findById(accountId);
      const chapterId = account.managerOf;

      const {
        page = 1,
        limit = 10,
        position = "all",
        status = "all",
        search = "",
        sortBy = "createdAt",
        sortOrder = "asc",
      } = req.query;

      // Tạo bộ lọc dữ liệu
      const filter = { chapterId };
      if (position !== "all") filter.position = position;
      if (status !== "all") filter.status = status;
      if (search) {
        filter.$or = [
          { address: { $regex: search, $options: "i" } },
          { hometown: { $regex: search, $options: "i" } },
          { ethnicity: { $regex: search, $options: "i" } },
          { religion: { $regex: search, $options: "i" } },
          { eduLevel: { $regex: search, $options: "i" } },
        ];
      }

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
      };

      const members = await Member.paginate(filter, options);

      // Tìm account liên kết với member
      const result = await Account.find({
        infoMember: { $in: members.docs },
      }).populate("infoMember");

      return response(res, 200, "MEMBERS_FETCHED", {
        members: result,
        pagination: {
          currentPage: members.page,
          totalPages: members.totalPages,
          totalItems: members.totalDocs,
          itemsPerPage: members.limit,
        },
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Lấy chi tiết member theo ID
  const getMemberById = async (req, res) => {
    const logPrefix = "[MemberController][getMemberById]";
    try {
      const member = await Member.findById(req.params.memberId).populate("chapterId");
      if (!member) return response(res, 404, "MEMBER_NOT_FOUND");

      const account = await Account.findOne({ infoMember: member._id });

      return response(res, 200, "MEMBER_FETCHED", { account, member });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Cập nhật thông tin member theo ID
  const updateMemberById = async (req, res) => {
    const logPrefix = "[MemberController][updateMemberById]";
    try {
      const memberId = req.params.memberId;
      const input = req.body;

      const currentMember = await Member.findById(memberId);
      if (!currentMember) return response(res, 404, "MEMBER_NOT_FOUND");

      const allowedFields = [
        "cardId", "position", "joinedAt", "address",
        "hometown", "ethnicity", "religion", "eduLevel"
      ];

      for (const field of allowedFields) {
        if (input[field] !== "" && input[field] != null) {
          // Kiểm tra trùng cardId
          if (field === "cardId") {
            const existingMember = await Member.findOne({ cardId: input.cardId });
            if (existingMember && existingMember._id.toString() !== currentMember._id.toString()) {
              return response(res, 400, "INVALID_MEMBER_DATA");
            }
          }
          currentMember[field] = input[field];
        }
      }

      await currentMember.save();
      return response(res, 200, "MEMBER_UPDATED", currentMember);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Thay đổi trạng thái member (VD: active, inactive, unknow)
  const changeMemberStatus = async (req, res) => {
    const logPrefix = "[MemberController][changeMemberStatus]";
    try {
      const { memberId } = req.params;
      const { status } = req.body;

      const member = await Member.findById(memberId);
      if (!member) return response(res, 404, "MEMBER_NOT_FOUND");

      if (member.status === status) return response(res, 200, "STATUS_UNCHANGED");

      const previousStatus = member.status;
      member.status = status;

      await member.save();

      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status,
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  return {
    getMembersInPage,
    getMemberById,
    updateMemberById,
    changeMemberStatus,
  };
};

export default MemberController();
