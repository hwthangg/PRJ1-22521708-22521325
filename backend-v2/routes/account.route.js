import express from "express";
import { AccountController } from "../controllers/index.js";
import uploadImage from "../middlewares/uploadImage.js";

const AccountRoutes = express.Router();

AccountRoutes.post("/", uploadImage.single('avatar'),AccountController.createAccount);
AccountRoutes.get("/", AccountController.getAccountsInPage);
AccountRoutes.get("/:accountId", AccountController.getAccountById);
AccountRoutes.put("/:accountId", uploadImage.single('avatar'),  AccountController.updateAccountById);
AccountRoutes.patch("/:accountId", AccountController.changeAccountStatus);

export default AccountRoutes;
