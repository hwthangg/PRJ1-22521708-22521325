import express from "express";
import { DocumentController } from "../controllers/index.js";

const DocumentRoutes = express.Router();

DocumentRoutes.post("/", DocumentController.createDocument);
DocumentRoutes.get("/", DocumentController.getDocumentsInPage);
DocumentRoutes.get("/:documentId", DocumentController.getDocumentById);
DocumentRoutes.put("/:documentId", DocumentController.updateDocumentById);
DocumentRoutes.patch("/:documentId", DocumentController.changeDocumentStatus);

export default DocumentRoutes;
