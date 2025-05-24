import { Document, Account } from "../models/index.js";
import { response, verifyToken } from "../utils/index.js";

const DocumentController = () => {
  // Tạo mới tài liệu
  const createDocument = async (req, res) => {
    const logPrefix = "[createDocument]";
    const decode = verifyToken(req.cookies.token);
    if (!decode) return response(res, 401, "UNAUTHORIZED");
    const accountId = decode.id;

    try {
      const input = req.body;
      const account = await Account.findById(accountId);
      const chapterId = account.managerOf;
      if (
        !input.docId ||
        !input.name ||
        !input.issuer ||
        !input.issuedAt ||
        !input.description ||
        !req.file?.path
      )
        return response(res, 400, "MISSING_DOCUMENT_DATA");

      // if (req.file.mimetype !== "application/pdf")
      //   return response(res, 400, "INVALID_FILE_FORMAT");

      // Kiểm tra trùng docId trong chapter
      const existingDoc = await Document.findOne({ chapterId, docId: input.docId });
      if (existingDoc)
        return response(res, 409, "DOCUMENT_ID_ALREADY_EXISTS");

      // Tạo document mới
      const newDocument = new Document({
        chapterId,
        docId: input.docId,
        name: input.name,
        type: input.type || "Khác",
        scope: input.scope || "chapter",
        issuer: input.issuer,
        issuedAt: new Date(input.issuedAt),
        description: input.description,
        file: req.file.path,
      });

      const savedDocument = await newDocument.save();
      console.log(`${logPrefix} Document created`, savedDocument._id);
      return response(res, 201, "DOCUMENT_CREATED", savedDocument);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Lấy danh sách tài liệu có phân trang và lọc
  const getDocumentsInPage = async (req, res) => {
    const logPrefix = "[getDocumentsInPage]";
    const decode = verifyToken(req.cookies.token);
    if (!decode) return response(res, 401, "UNAUTHORIZED");
    const accountId = decode.id;

    try {
      const account = await Account.findById(accountId);
      const userChapterId = account.role === "manager" ? account.managerOf : account.infoMember?.chapterId;
      const allowedScope = account.role === "member" ? ["chapter"] : ["chapter", "private"];

      const {
        page = 1,
        limit = 10,
        search,
        type = "all",
        scope = "all",
        sortBy = "createdAt",
        sortOrder = "asc",
      } = req.query;

      const filter = {
        $or: [{ scope: { $in: allowedScope } }, { chapterId: userChapterId }],
        status: "active",
      };

      if (search) {
        filter.$and = [{
          $or: [
            { name: { $regex: search, $options: "i" } },
            { docId: { $regex: search, $options: "i" } },
            { issuer: { $regex: search, $options: "i" } },
          ],
        }];
      }

      if (type !== "all") filter.type = type;
      if (scope !== "all") filter.scope = scope;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
      };

      const result = await Document.paginate(filter, options);

      return response(res, 200, "DOCUMENTS_FETCHED", {
        documents: result.docs,
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

  // Lấy tài liệu theo ID
  const getDocumentById = async (req, res) => {
    const logPrefix = "[getDocumentById]";
    try {
      const document = await Document.findById(req.params.documentId).populate("chapterId");
      if (!document) return response(res, 404, "DOCUMENT_NOT_FOUND");
      return response(res, 200, "DOCUMENT_FETCHED", document);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Cập nhật tài liệu theo ID
  const updateDocumentById = async (req, res) => {
    const logPrefix = "[updateDocumentById]";
    const decode = verifyToken(req.cookies.token);
    if (!decode) return response(res, 401, "UNAUTHORIZED");
    const accountId = decode.id;

    try {
      const input = req.body;
      const account = await Account.findById(accountId);
      const chapterId = account.managerOf;
      const document = await Document.findById(req.params.documentId);

      // Cập nhật các trường được phép
      const allowedFields = ["docId", "name", "type", "scope", "issuer", "issuedAt", "description"];
      for (const field of allowedFields) {
        if (input[field] != null && input[field] !== "") {
          if (field === "docId") {
            // Kiểm tra docId mới có bị trùng không
            const existingDoc = await Document.findOne({ chapterId, docId: input.docId });
            if (existingDoc && existingDoc._id.toString() !== req.params.documentId)
              return response(res, 409, "DOCUMENT_ID_ALREADY_EXISTS");
          }
          document[field] = input[field];
        }
      }

      // Nếu upload file mới thì cập nhật đường dẫn file
      if (req.file) {
        document.file = req.file.path;
      }

      const savedDocument = await document.save();
      return response(res, 200, "DOCUMENT_UPDATED", savedDocument);
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  // Thay đổi trạng thái tài liệu (active/deleted)
  const changeDocumentStatus = async (req, res) => {
    const logPrefix = "[changeDocumentStatus]";
    try {
      const { documentId } = req.params;
      const { status } = req.body;
      const validStatuses = ["active", "deleted"];
      if (!validStatuses.includes(status)) return response(res, 400, "INVALID_STATUS");

      const document = await Document.findById(documentId);
      if (!document) return response(res, 404, "DOCUMENT_NOT_FOUND");

      const previousStatus = document.status;
      document.status = status;
      await document.save();

      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status,
        updatedAt: document.updatedAt,
      });
    } catch (error) {
      console.error(`${logPrefix} Error:`, error);
      return response(res, 500, "SERVER_ERROR");
    }
  };

  return {
    createDocument,
    getDocumentsInPage,
    getDocumentById,
    updateDocumentById,
    changeDocumentStatus,
  };
};

export default DocumentController();
