import ChapterController from "../controllers/chapter.controller.js";
import express from "express";

const ChapterRoutes = express.Router();

// Tạo chi đoàn mới
ChapterRoutes.post("/", ChapterController.createChapter);

// Lấy danh sách chi đoàn theo filter
ChapterRoutes.get("/", ChapterController.getAllChaptersWithFilter);

// Lấy thông tin chi đoàn theo ID
ChapterRoutes.get("/:chapterId", ChapterController.getChapterById);

// Cập nhật chi đoàn theo ID
ChapterRoutes.put("/:chapterId", ChapterController.updateChapterById);

// Xoá mềm chi đoàn theo ID
ChapterRoutes.delete("/:chapterId", ChapterController.deleteChapterById);

export default ChapterRoutes;
