import express from "express";
import { AccountController } from "../controllers/index.js";

const AccountRoutes = express.Router();

AccountRoutes.post("/", AccountController.createAccount);
AccountRoutes.get("/", AccountController.getAccountsInPage);
AccountRoutes.get("/:accountId", AccountController.getAccountById);
AccountRoutes.put("/:accountId", AccountController.updateAccountById);
AccountRoutes.patch("/:accountId", AccountController.changeAccountStatus);

export default AccountRoutes;
