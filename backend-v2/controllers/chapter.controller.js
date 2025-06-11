// // Import các model cần thiết từ thư mục models
// import { Account, Chapter, Document, Event, Member } from "../models/index.js";
// // Import các hàm tiện ích dùng chung
// import { response, validateChapter } from "../utils/index.js";

// // Định nghĩa controller cho các chức năng liên quan đến Chapter
// const ChapterController = () => {
//   // Hàm tạo một chapter mới
//   const createChapter = async (req, res) => {


//     try {
//       console.log('Call: create chapter')
//       const body = req.body;

//       // Kiểm tra đầu vào - các trường bắt buộc
//       if (
//         !body.name ||
//         !body.affiliated ||
//         !body.address ||
//         !body.establishedAt
//       ) {
//         res.json({ message: 'missing data' })
//       }

//       // Kiểm tra xem chapter đã tồn tại chưa (dựa trên tên, liên kết, địa chỉ)
//       const duplicate = await Chapter.findOne({
//         name: body.name,
//         affiliated: body.affiliated,
//         address: body.address,
//       });
//       if (duplicate) {
//         res.json({ message: 'duplicated chapter' })
//       }

//       // Tạo một chapter mới
//       const chapter = new Chapter({
//         name: body.name,
//         affiliated: body.affiliated,
//         address: body.address,
//         establishedAt: body.establishedAt,
//       });

//       // Lưu chapter vào database
//       await chapter.save();


//       res.json({ message: 'create chapter successfully', data: chapter })
//     } catch (error) {
//       console.error(error);
//       res.json(error)
//     }
//   };

//   // Hàm lấy danh sách chapter có phân trang và tìm kiếm
//   const getChaptersInPage = async (req, res) => {
//     const logPrefix = "[ChapterController][getChaptersInPage]";
//     console.log(`${logPrefix} Start with query:`, req.query);

//     try {
//       // Lấy các tham số từ query string
//       const {
//         page = 1,
//         limit = 10,
//         search = "",
//         status,
//         sortBy = "createdAt",
//         sortOrder = "asc",
//       } = req.query;

//       // Tạo bộ lọc tìm kiếm
//       const filter = {};
//       if (search) {
//         filter.$or = [
//           { name: { $regex: search, $options: "i" } },
//           { affiliated: { $regex: search, $options: "i" } },
//           { address: { $regex: search, $options: "i" } },
//         ];
//       }

//       if (status && status !== "all") filter.status = status;

//       // Cấu hình phân trang
//       const options = {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         sort: { [sortBy]: sortOrder === "asc" ? -1 : 1 },
//       };

//       // Truy vấn cơ sở dữ liệu với phân trang
//       const chapters = await Chapter.paginate(filter, options);

//       // Với mỗi chapter, tìm thêm thông tin người quản lý
//       const result = await Promise.all(
//         chapters.docs.map(async (item) => {
//           const manager = await Account.findOne({ managerOf: item._id }).select('-_id').lean();

//           return {
//             ...item.toObject(), // Đảm bảo item là object thuần
//             ...manager
//           };
//         })
//       );


//       // Trả về dữ liệu kèm thông tin phân trang
//       return response(res, 200, "CHAPTERS_FETCHED", {
//         chapters: result,
//         pagination: {
//           currentPage: chapters.page,
//           totalPages: chapters.totalPages,
//           totalItems: chapters.totalDocs,
//           itemsPerPage: chapters.limit,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       res.json(error)
//     }
//   };

//   // Hàm lấy tất cả chapter để hiển thị trong dropdown hoặc combobox
//   const getAllChapterForComboBox = async (req, res) => {
//     const logPrefix = "[ChapterController][getAllChapterForComboBox]";
//     try {
//       const chapters = await Chapter.find().select("_id name");
//       return response(res, 200, "CHAPTERS_FETCHED", { chapters });
//     } catch (error) {
//       console.error(`${logPrefix} Error:`, error);
//       return response(res, 500, "SERVER_ERROR");
//     }
//   };

//   // Hàm lấy thông tin chi tiết của một chapter theo ID
//   const getChapterById = async (req, res) => {

//     try {
//       console.log('Call: get chapter by id')
//       // Tìm chapter theo ID
//       const { id } = req.params
//       const chapter = await Chapter.findById(id);
// const manager = await Account.findOne({managerOf: id}).select('-_id')

// const result = {
//       ...chapter.toObject(),
//       ...(manager ? manager.toObject() : {}), // tránh lỗi nếu không tìm thấy manager
//     };
    

//       return res.json({
//         message: 'get chapter successfully', data: result
        
          
        
//       })


//     } catch (error) {
//       console.log(error)
//       return res.json(error)
//     }
//   };

//   // Hàm cập nhật thông tin chapter
//   const updateChapterById = async (req, res) => {

//     try {
//       const body = req.body;
//       const {id} = req.params;

//       const chapter = await Chapter.findById(id);

//       // Kiểm tra trùng lặp thông tin
//       const duplicate = await Chapter.findOne({
//         name: body.name,
//         affiliated: body.affiliated,
//         address: body.address,
//       });

//       if (
//         duplicate &&
//         duplicate._id.toString() == id
//       ) {
//         return res.json({message:'missing data'})
//       }

//       const update = new Chapter(body)
//       console.log(update,body)
      
//       // Cập nhật các trường được phép
//       const allowedFields = ["name", "affiliated", "address", "establishedAt", 'status'];
//       for (const field of allowedFields) {
//         if (update[field] != null) {
//           chapter[field] = update[field];
//         }
//       }

//      await chapter.save();
//     const result = await Chapter.findById(id)

//       return res.json({message:'update chapter successfully', data:result})
//     } catch (error) {
//       console.error(error);
//       return res.json(error)
//     }
//   };

//   // Hàm thay đổi trạng thái của chapter
//   const changeChapterStatus = async (req, res) => {
//     const logPrefix = "[ChapterController][changeChapterStatus]";
//     console.log(`${logPrefix} Request:`, req.params, req.body);

//     try {
//       const chapterId = req.params.chapterId;
//       const status = req.body.status;

//       // Kiểm tra trạng thái hợp lệ
//       const validStatuses = ["active", "banned"];
//       if (!validStatuses.includes(status)) {
//         console.warn(`${logPrefix} Invalid status: ${status}`);
//         return response(res, 400, "INVALID_STATUS", { validStatuses });
//       }

//       // Tìm chapter
//       const chapter = await Chapter.findById(chapterId);
//       if (!chapter) {
//         console.warn(`${logPrefix} Chapter not found`);
//         return response(res, 404, "CHAPTER_NOT_FOUND");
//       }

//       // Kiểm tra trạng thái đã thay đổi chưa
//       if (chapter.status === status) {
//         console.log(`${logPrefix} Status not changed`);
//         return response(res, 200, "STATUS_UNCHANGED");
//       }

//       // Cập nhật trạng thái
//       const previousStatus = chapter.status;
//       chapter.status = status;
//       await chapter.save();

//       console.log(
//         `${logPrefix} Status changed from ${previousStatus} to ${status}`
//       );
//       return response(res, 200, "STATUS_UPDATED", {
//         previousStatus,
//         newStatus: status,
//       });
//     } catch (error) {
//       console.error(`${logPrefix} Error:`, error);

//       if (error.name === "CastError") {
//         return response(res, 400, "INVALID_ID");
//       }

//       return response(res, 500, "SERVER_ERROR");
//     }
//   };

//   // Trả về các hàm để sử dụng bên ngoài
//   return {
//     createChapter,
//     getChaptersInPage,
//     getAllChapterForComboBox,
//     getChapterById,
//     updateChapterById,
//     changeChapterStatus,
//   };
// };

// export default ChapterController();
