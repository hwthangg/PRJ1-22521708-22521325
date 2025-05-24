import express from "express";
import { DocumentController } from "../controllers/index.js";
import uploadFile from "../middlewares/uploadFile.js";

const DocumentRoutes = express.Router();

DocumentRoutes.post("/",uploadFile.single('file'), DocumentController.createDocument);
DocumentRoutes.get("/", DocumentController.getDocumentsInPage);
DocumentRoutes.get("/:documentId", DocumentController.getDocumentById);
DocumentRoutes.put("/:documentId",uploadFile.single('file'), DocumentController.updateDocumentById);
DocumentRoutes.patch("/:documentId", DocumentController.changeDocumentStatus);

export default DocumentRoutes;
