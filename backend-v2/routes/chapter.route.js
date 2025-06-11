import express from "express";
import { ChapterController } from "../controllers/index.js";

const ChapterRoutes = express.Router();

ChapterRoutes.post("/", ChapterController.createChapter);
ChapterRoutes.get("/", ChapterController.getChaptersInPage);
ChapterRoutes.get("/all", ChapterController.getAllChapterForComboBox);
ChapterRoutes.get("/:id", ChapterController.getChapterById);
ChapterRoutes.put("/:id", ChapterController.updateChapterById);
ChapterRoutes.patch("/:chapterId", ChapterController.changeChapterStatus);

export default ChapterRoutes;