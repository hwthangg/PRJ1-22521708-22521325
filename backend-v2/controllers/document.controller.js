import { Document, Chapter, Account } from "../models/index.js";
import { response, verifyToken } from "../utils/index.js";

const DocumentController = () => {
  /**
   * Create new document
   * POST /documents
   * Request body: { chapterId, docId, name, type, scope, issuer, issuedDate, description, file }
   */
  const createDocument = async (req, res) => {
    const logPrefix = "[DocumentController][createDocument]";
    console.log(`${logPrefix} Start with data:`, req.body);

    try {
      const input = req.body.document;
      
      const decode = verifyToken(req.cookies.token)
      const accountId = decode.id
      const account = await Account.findById(accountId)
      const chapterId = account.managerOf

      // Validate chapter exists
      const chapter = await Chapter.findById(chapterId);
      if (!chapter) {
        return response(res, 404, "CHAPTER_NOT_FOUND");
      }

      // Check for duplicate docId within the same chapter
      const existingDoc = await Document.findOne({ 
        chapterId: chapterId,
        docId: input.docId 
      });
      if (existingDoc) {
        console.warn(`${logPrefix} Document ID ${input.docId} already exists in this chapter`);
        return response(res, 409, "DOCUMENT_ID_EXISTS");
      }

      // Create new document
      const newDocument = new Document({
        chapterId: chapterId,
        docId: input.docId,
        name: input.name,
        type: input.type || 'Khác',
        scope: input.scope || 'chapter',
        issuer: input.issuer,
        issuedDate: input.issuedDate,
        description: input.description,
        file: input.file
      });

      const savedDocument = await newDocument.save();
      console.log(`${logPrefix} Document created successfully`, savedDocument._id);
      
      return response(res, 201, "DOCUMENT_CREATED", savedDocument);

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
   * Get paginated documents with chapter info
   * GET /documents?page=1&limit=10&chapterId=...&search=...&type=...&scope=...&status=...&sortBy=...&sortOrder=...
   */
 const getDocumentsInPage = async (req, res) => {
  const logPrefix = "[DocumentController][getDocumentsInPage]";
  console.log(`${logPrefix} Start with query:`, req.query);

  try {
    // Get user's chapter info from token
    const decode = verifyToken(req.cookies.token);
    const accountId = decode.id;
    const account = await Account.findById(accountId).populate('infoMember');
    const userChapterId = account.role === 'member' ? account.infoMember?.chapterId : account.managerOf;

    const {
      page = 1,
      limit = 10,
      search = "",
      type,
      sortBy = "issuedDate",
      sortOrder = "desc",
    } = req.query;

    // Build filter to get:
    // 1. All public documents (scope = 'public') OR
    // 2. Documents from user's chapter (chapterId = userChapterId)
    const filter = {
      $or: [
        { scope: 'public' },
        { chapterId: userChapterId }
      ]
    };

    // Additional filters
    if (search) {
      filter.$and = [{
        $or: [
          { name: { $regex: search, $options: "i" } },
          { docId: { $regex: search, $options: "i" } },
          { issuer: { $regex: search, $options: "i" } },
        ]
      }];
    }

    if (type) filter.type = type;
   filter.status = 'active';

    // Pagination options
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 },
      populate: { path: 'chapterId', select: 'name' },
      lean: true
    };

    // Execute query
    const result = await Document.paginate(filter, options);
    console.log(`${logPrefix} Found ${result.docs.length} documents`);

    return response(res, 200, "DOCUMENTS_FETCHED", {
      documents: result.docs,
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
   * Get document by ID with chapter info
   * GET /documents/:documentId
   */
  const getDocumentById = async (req, res) => {
    const logPrefix = "[DocumentController][getDocumentById]";
    console.log(`${logPrefix} Request for document:`, req.params.documentId);

    try {
      const document = await Document.findById(req.params.documentId)
        .populate('chapterId', 'name affiliated');

      if (!document) {
        console.warn(`${logPrefix} Document not found`);
        return response(res, 404, "DOCUMENT_NOT_FOUND");
      }

      console.log(`${logPrefix} Document found`);
      return response(res, 200, "DOCUMENT_FETCHED", document);

    } catch (error) {
      console.error(`${logPrefix} Error:`, error);

      if (error.name === 'CastError') {
        return response(res, 400, "INVALID_ID");
      }

      return response(res, 500, "SERVER_ERROR");
    }
  };

  /**
   * Update document
   * PUT /documents/:documentId
   */
  const updateDocumentById = async (req, res) => {
    const logPrefix = "[DocumentController][updateDocumentById]";
    console.log(`${logPrefix} Start update for:`, req.params.documentId);

    try {
      const { documentId } = req.params;
      const input = req.body.document;

      // Find and update document
      const document = await Document.findById(documentId);
      if (!document) {
        console.warn(`${logPrefix} Document not found`);
        return response(res, 404, "DOCUMENT_NOT_FOUND");
      }

      // Check for duplicate docId if changing docId
      if (input.docId && input.docId !== document.docId) {
        const existing = await Document.findOne({
          chapterId: document.chapterId,
          docId: input.docId
        });
        if (existing) {
          return response(res, 409, "DOCUMENT_ID_EXISTS");
        }
      }

      // Apply updates
      const updateFields = ["docId", "name", "type", "scope", "issuer", "issuedDate", "description", "file"];
      updateFields.forEach(field => {
        if (input[field] !== undefined) {
          document[field] = input[field];
        }
      });

      await document.save();
      console.log(`${logPrefix} Document updated successfully`);

      return response(res, 200, "DOCUMENT_UPDATED", document);

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
   * Change document status
   * PATCH /documents/:documentId/status
   */
  const changeDocumentStatus = async (req, res) => {
    const logPrefix = "[DocumentController][changeDocumentStatus]";
    console.log(`${logPrefix} Request:`, req.params, req.body);

    try {
      const { documentId } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ['active', 'deleted'];
      if (!validStatuses.includes(status)) {
        console.warn(`${logPrefix} Invalid status: ${status}`);
        return response(res, 400, "INVALID_STATUS", { validStatuses });
      }

      // Find document
      const document = await Document.findById(documentId);
      if (!document) {
        console.warn(`${logPrefix} Document not found`);
        return response(res, 404, "DOCUMENT_NOT_FOUND");
      }

      // Update status
      const previousStatus = document.status;
      document.status = status;
      await document.save();

      console.log(`${logPrefix} Status changed from ${previousStatus} to ${status}`);
      return response(res, 200, "STATUS_UPDATED", {
        previousStatus,
        newStatus: status,
        updatedAt: document.updatedAt
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
    createDocument,
    getDocumentsInPage,
    getDocumentById,
    updateDocumentById,
    changeDocumentStatus
  };
};

export default DocumentController();