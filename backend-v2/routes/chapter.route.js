import express from "express";
import ChapterController from "../controllers/chapter.controller.js";


const ChapterRoutes = express.Router()

ChapterRoutes.get('/me', ChapterController.login)



export default ChapterRoutes