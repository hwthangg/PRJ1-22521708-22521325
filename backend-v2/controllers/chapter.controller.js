import { Chapter } from "../models/index.js";
import { response, validateChapter } from "../utils/index.js";

const ChapterController = () => {
  /**
   * Tạo chapter mới
   * Endpoint: POST /chapters
   * Request body: { name, affiliated, address, establishedDate }
   */
  const createChapter = async (req, res) => {
    const logPrefix = "[ChapterController][createChapter]";
    console.log(`${logPrefix} Start with data:`, req.body);

    try {
      const input = req.body;

      // Validate input
      if (!(await validateChapter(input))) {
        console.warn(`${logPrefix} Validation failed`);
        return response(res, 400, "INVALID_CHAPTER_DATA");
      }

      // Tạo chapter
      const chapter = new Chapter({
        name: input.chapter.name,
        affiliated: input.chapter.affiliated,
        address: input.chapter.address,
        establishedDate: input.chapter.establishedDate
      });

      const savedChapter = await chapter.save();
      console.log(`${logPrefix} Chapter created successfully`, savedChapter._id);

      return response(res, 201, "CHAPTER_CREATED", savedChapter);

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
   * Lấy danh sách chapter phân trang
   * Endpoint: GET /chapters?page=1&limit=10&search=...&status=...&sortBy=...&sortOrder=...
   */
  const getChaptersInPage = async (req, res) => {
    const logPrefix = "[ChapterController][getChaptersInPage]";
    console.log(`${logPrefix} Start with query:`, req.query);

    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        status,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      // Build filter
      const filter = {};
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { affiliated: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } }
        ];
      }

      if (status) filter.status = status;

      // Pagination options
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
        lean: true
      };

      // Execute query
      const result = await Chapter.paginate(filter, options);
      console.log(`${logPrefix} Found ${result.docs.length} chapters`);

      return response(res, 200, "CHAPTERS_FETCHED", {
        chapters: result.docs,
        pagination: {
          currentPage: result.page,
          totalPages: result.totalPages,
          totalItems: result.totalDocs,
          itemsPerPage: result.limit
        }
      });

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Lấy thông tin chapter bằng ID
   * Endpoint: GET /chapters/:chapterId
   */
  const getChapterById = async (req, res) => {
    const logPrefix = "[ChapterController][getChapterById]";
    console.log(`${logPrefix} Request for chapter:`, req.params.chapterId);

    try {
      const chapter = await Chapter.findById(req.params.chapterId);

      if (!chapter) {
        console.warn(`${logPrefix} Chapter not found`);
        return response(res, 404, "CHAPTER_NOT_FOUND");
      }

      console.log(`${logPrefix} Chapter found`);
      return response(res, 200, "CHAPTER_FETCHED", chapter);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === 'CastError') {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Cập nhật thông tin chapter
   * Endpoint: PUT /chapters/:chapterId
   */
  const updateChapterById = async (req, res) => {
    const logPrefix = "[ChapterController][updateChapterById]";
    console.log(`${logPrefix} Start update for:`, req.params.chapterId);

    try {
      const { chapterId } = req.params;
      const input = req.body;

      // Validate input
      if (!(await validateChapter(input, true, chapterId))) {
        console.warn(`${logPrefix} Validation failed`);
        return response(res, 400, "INVALID_CHAPTER_DATA");
      }

      // Find and update chapter
      const chapter = await Chapter.findById(chapterId);
      if (!chapter) {
        console.warn(`${logPrefix} Chapter not found`);
        return response(res, 404, "CHAPTER_NOT_FOUND");
      }

      // Apply updates
      const updateFields = ["name", "affiliated", "address", "establishedDate"];
      updateFields.forEach(field => {
        if (input.chapter[field] !== undefined) {
          chapter[field] = input.chapter[field];
        }
      });

      const updatedChapter = await chapter.save();
      console.log(`${logPrefix} Chapter updated successfully`);

      return response(res, 200, "CHAPTER_UPDATED", updatedChapter);

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
   * Thay đổi trạng thái chapter
   * Endpoint: PATCH /chapters/:chapterId/status
   */
  const changeChapterStatus = async (req, res) => {
    const logPrefix = "[ChapterController][changeChapterStatus]";
    console.log(`${logPrefix} Request:`, req.params, req.body);

    try {
      const { chapterId } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ['active', 'banned'];
      if (!validStatuses.includes(status)) {
        console.warn(`${logPrefix} Invalid status: ${status}`);
        return response(res, 400, "INVALID_STATUS", { validStatuses });
      }

      // Find chapter
      const chapter = await Chapter.findById(chapterId);
      if (!chapter) {
        console.warn(`${logPrefix} Chapter not found`);
        return response(res, 404, "CHAPTER_NOT_FOUND");
      }

      // Check if status changed
      if (chapter.status === status) {
        console.log(`${logPrefix} Status not changed`);
        return response(res, 200, "STATUS_UNCHANGED");
      }

      // Update status
      const previousStatus = chapter.status;
      chapter.status = status;
      await chapter.save();

      console.log(`${logPrefix} Status changed from ${previousStatus} to ${status}`);
      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status
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
    createChapter,
    getChaptersInPage,
    getChapterById,
    updateChapterById,
    changeChapterStatus
  };
};

export default ChapterController();