import UserController from "../controllers/user.controller.js"
import express from "express";

const UserRoutes = express.Router();

UserRoutes.post("/", UserController.createUser)
UserRoutes.get("/", UserController.getAllUsersWithFilter)
UserRoutes.get("/:userId", UserController.getUserById)
UserRoutes.put("/:userId", UserController.updateUserById)
UserRoutes.delete("/:userId", UserController.deletedUserById)
export default UserRoutes