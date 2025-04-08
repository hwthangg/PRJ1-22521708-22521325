import UserController from "../controllers/user.controller.js";
import express from "express";

const UserRoutes = express.Router();

// Tạo người dùng
UserRoutes.post("/", UserController.createUser);

// Lấy danh sách người dùng (có filter)
UserRoutes.get("/", UserController.getAllUsersWithFilter);

// Lấy người dùng theo ID
UserRoutes.get("/:userId", UserController.getUserById);

// Cập nhật người dùng theo ID
UserRoutes.put("/:userId", UserController.updateUserById);

// Xoá mềm người dùng theo ID
UserRoutes.delete("/:userId", UserController.deletedUserById);

export default UserRoutes;
