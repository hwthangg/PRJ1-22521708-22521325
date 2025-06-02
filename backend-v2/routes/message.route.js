
import express from "express";
import {MessageController } from "../controllers/index.js";


const MessageRoutes = express.Router();

MessageRoutes.get("/", MessageController.getHistoryMessage);


export default MessageRoutes;