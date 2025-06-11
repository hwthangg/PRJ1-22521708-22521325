import express from "express";
import { AccountController } from "../controllers/index.js";
import uploadImage from "../middlewares/uploadImage.js";

const AccountRoutes = express.Router();

AccountRoutes.post("/", uploadImage.single('avatar'),AccountController.createAccount);
AccountRoutes.get("/", AccountController.getAccountsInPage);
AccountRoutes.get("/:id", AccountController.getAccountById);
AccountRoutes.put("/:id", uploadImage.single('avatar'),  AccountController.updateAccountById);


export default AccountRoutes;
