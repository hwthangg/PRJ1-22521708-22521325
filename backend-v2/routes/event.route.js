import express from "express";
import { EventController } from "../controllers/index.js";
import uploadImage from "../middlewares/uploadImage.js";

const EventRoutes = express.Router();

EventRoutes.post("/", uploadImage.array('images',10), EventController.createEvent);
EventRoutes.get("/", EventController.getEventsInPage);
EventRoutes.patch("/checkin/:registrationId", EventController.checkin);
EventRoutes.patch("/comments/:commentId", EventController.changeCommentStatus);
EventRoutes.get("/:eventId", EventController.getEventById);
EventRoutes.put("/:eventId",uploadImage.array('images',10), EventController.updateEventById);
EventRoutes.patch("/:eventId", EventController.changeEventStatus);
EventRoutes.patch("/:eventId/like", EventController.likeEvent);
EventRoutes.post("/:eventId/register", EventController.registerEvent);
EventRoutes.get("/:eventId/register", EventController.getRegistrationsInPage);
EventRoutes.post("/:eventId/comments", EventController.postComment);
EventRoutes.get("/:eventId/comments", EventController.getComments);


export default EventRoutes;
