// Import các model cần thiết từ thư mục models
import { Account, Chapter, Document, Event, Member } from "../models/index.js";
// Import các hàm tiện ích dùng chung
import { response, validateChapter } from "../utils/index.js";

// Định nghĩa controller cho các chức năng liên quan đến Chapter
const ChapterController = () => {
  // Hàm tạo một chapter mới
  const createChapter = async (req, res) => {
    const logPrefix = "[ChapterController][createChapter]";
    console.log(`${logPrefix} Start with data:`, req.body);

    try {
      const input = req.body;

      // Kiểm tra đầu vào - các trường bắt buộc
      if (
        !input.name ||
        !input.affiliated ||
        !input.address ||
        !input.establishedAt
      ) {
        return response(res, 400, "MISSING_CHAPTER_DATA");
      }

      // Kiểm tra xem chapter đã tồn tại chưa (dựa trên tên, liên kết, địa chỉ)
      const existingChapter = await Chapter.findOne({
        name: input.name,
        affiliated: input.affiliated,
        address: input.address,
      });
      if (existingChapter) {
        console.warn(`${logPrefix} Validation failed: Chapter has existed`);
        return response(res, 400, "INVALID_CHAPTER_DATA");
      }

      // Tạo một chapter mới
      const chapter = new Chapter({
        name: input.name,
        affiliated: input.affiliated,
        address: input.address,
        establishedAt: input.establishedAt,
      });

      // Lưu chapter vào database
      const savedChapter = await chapter.save();
      console.log(
        `${logPrefix} Chapter created successfully`,
        savedChapter._id
      );

      return response(res, 201, "CHAPTER_CREATED", savedChapter);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Hàm lấy danh sách chapter có phân trang và tìm kiếm
  const getChaptersInPage = async (req, res) => {
    const logPrefix = "[ChapterController][getChaptersInPage]";
    console.log(`${logPrefix} Start with query:`, req.query);

    try {
      // Lấy các tham số từ query string
      const {
        page = 1,
        limit = 10,
        search = "",
        status,
        sortBy = "createdAt",
        sortOrder = "asc",
      } = req.query;

      // Tạo bộ lọc tìm kiếm
      const filter = {};
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { affiliated: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
        ];
      }

      if (status && status !== "all") filter.status = status;

      // Cấu hình phân trang
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === "asc" ? -1 : 1 },
      };

      // Truy vấn cơ sở dữ liệu với phân trang
      const chapters = await Chapter.paginate(filter, options);

      // Với mỗi chapter, tìm thêm thông tin người quản lý
      const result = await Promise.all(
        chapters.docs.map(async (item) => {
          const result = {};
          result["infoChapter"] = item;
          const manager = await Account.findOne({ managerOf: item._id });
          result["infoManager"] = manager;
          return result;
        })
      );

      // Trả về dữ liệu kèm thông tin phân trang
      return response(res, 200, "CHAPTERS_FETCHED", {
        chapters: result,
        pagination: {
          currentPage: chapters.page,
          totalPages: chapters.totalPages,
          totalItems: chapters.totalDocs,
          itemsPerPage: chapters.limit,
        },
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Hàm lấy tất cả chapter để hiển thị trong dropdown hoặc combobox
  const getAllChapterForComboBox = async (req, res) => {
    const logPrefix = "[ChapterController][getAllChapterForComboBox]";
    try {
      const chapters = await Chapter.find().select("_id name");
      return response(res, 200, "CHAPTERS_FETCHED", { chapters });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Hàm lấy thông tin chi tiết của một chapter theo ID
  const getChapterById = async (req, res) => {
    const logPrefix = "[ChapterController][getChapterById]";
    console.log(`${logPrefix} Request for chapter:`, req.params.chapterId);

    try {
      // Tìm chapter theo ID
      const chapter = await Chapter.findById(req.params.chapterId);
      const documents = await Document.find({ chapterId: chapter._id });
      const events = await Event.find({ chapterId: chapter._id });
      const members = await Member.find({ chapterId: chapter._id });

      if (!chapter) {
        console.warn(`${logPrefix} Chapter not found`);
        return response(res, 404, "CHAPTER_NOT_FOUND");
      }

      return response(res, 200, "CHAPTER_FETCHED", {
        general: chapter,
        documents: documents,
        events: events,
        members: members,
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === "CastError") {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Hàm cập nhật thông tin chapter
  const updateChapterById = async (req, res) => {
    const logPrefix = "[ChapterController][updateChapterById]";
    console.log(
      `${logPrefix} Start update for:`,
      req.params.chapterId,
      req.body
    );

    try {
      const input = req.body;
      const chapterId = req.params.chapterId;

      const currentChapter = await Chapter.findById(chapterId);

      // Kiểm tra trùng lặp thông tin
      const existingChapter = await Chapter.findOne({
        name: input.name,
        affiliated: input.affiliated,
        address: input.address,
      });

      if (
        existingChapter &&
        existingChapter._id.toString() != chapterId.toString()
      ) {
        console.warn(`${logPrefix} Validation failed: Chapter has existed`);
        return response(res, 400, "INVALID_CHAPTER_DATA");
      }

      // Cập nhật các trường được phép
      const allowedFields = ["name", "affiliated", "address", "establishedAt"];
      for (const field of allowedFields) {
        if (input[field] != "" && input[field] != null) {
          currentChapter[field] = input[field];
        }
      }

      const savedChapter = await currentChapter.save();
      console.log(
        `${logPrefix} Chapter updated successfully`,
        savedChapter._id
      );

      return response(res, 201, "CHAPTER_CREATED", savedChapter);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Hàm thay đổi trạng thái của chapter
  const changeChapterStatus = async (req, res) => {
    const logPrefix = "[ChapterController][changeChapterStatus]";
    console.log(`${logPrefix} Request:`, req.params, req.body);

    try {
      const chapterId = req.params.chapterId;
      const status = req.body.status;

      // Kiểm tra trạng thái hợp lệ
      const validStatuses = ["active", "banned"];
      if (!validStatuses.includes(status)) {
        console.warn(`${logPrefix} Invalid status: ${status}`);
        return response(res, 400, "INVALID_STATUS", { validStatuses });
      }

      // Tìm chapter
      const chapter = await Chapter.findById(chapterId);
      if (!chapter) {
        console.warn(`${logPrefix} Chapter not found`);
        return response(res, 404, "CHAPTER_NOT_FOUND");
      }

      // Kiểm tra trạng thái đã thay đổi chưa
      if (chapter.status === status) {
        console.log(`${logPrefix} Status not changed`);
        return response(res, 200, "STATUS_UNCHANGED");
      }

      // Cập nhật trạng thái
      const previousStatus = chapter.status;
      chapter.status = status;
      await chapter.save();

      console.log(
        `${logPrefix} Status changed from ${previousStatus} to ${status}`
      );
      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status,
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === "CastError") {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Trả về các hàm để sử dụng bên ngoài
  return {
    createChapter,
    getChaptersInPage,
    getAllChapterForComboBox,
    getChapterById,
    updateChapterById,
    changeChapterStatus,
  };
};

export default ChapterController();
